import { showToast } from '../utils';

export default class LoginPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;

    this.#checkLoggedIn();
  }

  async login(email, password) {
    const loggedIn = await this.#model.login(email, password);

    this.#view.hideLoading();

    if (!loggedIn.status) {
      showToast(loggedIn.message, 'danger');
      return;
    }

    showToast('Berhasil masuk!', 'success');
    window.location.href = '#/feed';
  }

  #checkLoggedIn() {
    if (this.#model.isLoggedIn()) {
      window.location.href = '#/feed';
    }
  }
}
