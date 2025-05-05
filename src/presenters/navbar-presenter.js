import AuthModel from '../models/auth-model';
import { showToast } from '../utils';

export default class NavbarPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  logout() {
    AuthModel.logout();
    showToast('Berhasil keluar', 'success');
    window.location.hash = '/login';
  }
}
