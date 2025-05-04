import { showToast } from '../utils';

export default class RegisterPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async register(name, email, password) {
    const registered = await this.#model.register(name, email, password);

    if (!registered.status) {
      showToast(registered.message, 'danger');
      return;
    }

    showToast('Berhasil mendaftar, silahkan login!', 'success');
    window.location.href = '#/login';
  }
}
