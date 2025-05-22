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
      this.#view.showErrorMessage(loggedIn.message);
      return;
    }

    this.#view.onLoginSuccess();
  }

  #checkLoggedIn() {
    if (this.#model.isLoggedIn()) {
      this.#view.onLoginSuccess(false);
    }
  }
}
