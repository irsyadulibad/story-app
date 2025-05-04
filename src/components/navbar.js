import NavbarPresenter from '../presenters/navbar';
import { getActiveRoute } from '../url-parser';

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
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </div>
      </nav>
    `;
  }
}

customElements.define('app-navbar', Navbar);
export default Navbar;
