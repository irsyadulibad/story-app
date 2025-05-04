import routes from './routes';
import { getActiveRoute } from './url-parser';

export default class App {
  #content;

  constructor({ content }) {
    this.#content = content;
  }

  async renderPage() {
    const routeName = getActiveRoute();
    const route = routes[routeName];
    const page = route();

    if (!document.startViewTransition) {
      this._render(page);
      return;
    }

    document.startViewTransition(async () => {
      this._render(page);
    });
  }

  async _render(page) {
    this.#content.innerHTML = await page.render();
    await page.afterRender();
  }
}
