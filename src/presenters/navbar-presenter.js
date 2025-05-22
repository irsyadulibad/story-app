import AuthModel from '../models/auth-model';

export default class NavbarPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  logout() {
    AuthModel.logout();
    this.#view.onLogoutSuccess();
  }
}
