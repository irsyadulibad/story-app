export default class FeedPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getFeed() {
    const stories = await this.#model.fetchData();

    if (!stories.status) {
      this.#view.showErrorMessage();
      return;
    }

    stories.data.forEach((story) => {
      this.#view.renderFeed(story);
    });
  }
}
