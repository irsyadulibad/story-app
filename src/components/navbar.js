import NavbarPresenter from '../presenters/navbar-presenter';
import { getActiveRoute } from '../url-parser';
import { showToast } from '../utils';

class Navbar extends HTMLElement {
  #presenter;
  _hide = ['/', '/login', '/register'];

  constructor() {
    super();

    this.#presenter = new NavbarPresenter({
      view: this,
      model: null,
    });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = '';

    if (this._hide.includes(getActiveRoute())) return;

    this.innerHTML = `
      <nav class="navbar">
        <div class="container">
          <a href="#" class="navbar-brand">StoryShare</a>
          <ul class="navbar-menu">
            <li class="nav-item">
              <a href="#/feed" class="active" aria-label="Feed">
                <i class="ti ti-home"></i>
              </a>
            </li>
            <li class="nav-item">
              <a href="#/logout" aria-label="Profile" id="logout-button">
                <i class="ti ti-logout"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    `;

    this.#initListener();
  }

  #initListener() {
    const logoutBtn = document.getElementById('logout-button');

    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.#presenter.logout();
    });
  }

  onLogoutSuccess() {
    showToast('Berhasil keluar', 'success');
    window.location.hash = '/login';
  }
}

customElements.define('app-navbar', Navbar);
export default Navbar;
