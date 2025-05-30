import NavbarPresenter from '../presenters/navbar-presenter';
import { getActiveRoute } from '../url-parser';
import { isPushSubscribed, showToast } from '../utils';

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
              <a href="#/bookmarks" aria-label="Postingan Tersimpan">
                <i class="ti ti-bookmark"></i>
              </a>
            </li>
            <li class="nav-item">
              <button aria-label="Subscribe Notifikasi" title="Subscribe Notifikasi" id="notification-button">
                <i class="ti ti-bell"></i>
              </button>
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
    this.#updateNotificationButton();
  }

  #initListener() {
    const logoutBtn = document.getElementById('logout-button');
    const notificationButton = document.getElementById('notification-button');

    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.#presenter.logout();
    });

    notificationButton.addEventListener('click', async (e) => {
      notificationButton.innerHTML = '<i class="ti ti-loader-2 loading"></i>';
      await this.#presenter.toggleNotification();
      await this.#updateNotificationButton();
    });
  }

  async #updateNotificationButton() {
    const notificationButton = document.getElementById('notification-button');
    const isSubscribed = await isPushSubscribed();

    notificationButton.innerHTML = isSubscribed
      ? '<i class="ti ti-bell-ringing-filled"></i>'
      : '<i class="ti ti-bell"></i>';
  }

  showErrorMessage(message) {
    showToast(message, 'danger');
  }

  showSuccessMessage(message) {
    showToast(message, 'success');
  }

  onLogoutSuccess() {
    showToast('Berhasil keluar', 'success');
    window.location.hash = '/login';
  }
}

customElements.define('app-navbar', Navbar);
export default Navbar;
