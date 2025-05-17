import { showToast } from '../utils';

export default class RegisterPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;

    this.#checkLoggedIn();
  }

  async register(name, email, password) {
    this.#view.showLoading();

    const registered = await this.#model.register(name, email, password);

    this.#view.hideLoading();

    if (!registered.status) {
      showToast(registered.message, 'danger');
      return;
    }

    showToast('Berhasil mendaftar, silahkan login!', 'success');
    window.location.href = '#/login';
  }

  #checkLoggedIn() {
    if (this.#model.isLoggedIn()) {
      window.location.href = '#/feed';
    }
  }
}
