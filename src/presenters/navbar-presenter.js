import AuthModel from '../models/auth-model';
import {
  getNotificationPermission,
  isPushSubscribed,
  subscribeToPush,
  unsubscribeFromPush,
} from '../utils';

export default class NavbarPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async toggleNotification() {
    if (!('serviceWorker' in navigator && 'PushManager' in window)) {
      this.#view.showErrorMessage('Browser tidak mendukung notifikasi');
      return;
    }

    const permission = await getNotificationPermission();

    if (permission != 'granted') {
      this.#view.showErrorMessage('Notifikasi tidak diizinkan');
      return;
    }

    const isSubscribed = await isPushSubscribed();

    if (!isSubscribed) {
      (await subscribeToPush())
        ? this.#view.showSuccessMessage('Notifikasi diaktifkan')
        : this.#view.showErrorMessage('Gagal mengaktifkan notifikasi');

      return;
    }

    (await unsubscribeFromPush())
      ? this.#view.showSuccessMessage('Notifikasi dinonaktifkan')
      : this.#view.showErrorMessage('Gagal menonaktifkan notifikasi');
  }

  logout() {
    AuthModel.logout();
    this.#view.onLogoutSuccess();
  }
}
