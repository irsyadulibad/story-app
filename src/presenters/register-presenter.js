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
      this.#view.onRegisterError();
      return;
    }

    this.#view.onRegisterSuccess();
  }

  #checkLoggedIn() {
    if (this.#model.isLoggedIn()) {
      this.#view.onRegisterSuccess(false);
    }
  }
}
