import routes from './routes';
import { getActiveRoute } from './url-parser';
import NotFoundPage from './pages/notfound-page';

export default class App {
  #content;

  constructor({ content }) {
    this.#content = content;
  }

  async renderPage() {
    const routeName = getActiveRoute();
    const route = routes[routeName];
    const page = route ? route() : new NotFoundPage();

    if (!document.startViewTransition) {
      this._render(page);
      return;
    }

    document.startViewTransition(async () => {
      document.documentElement.style.viewTransitionName = routeName;
      this._render(page);
    });
  }

  async _render(page) {
    this.#content.innerHTML = await page.render();
    await page.afterRender();
  }
}
