class FeedDetailPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getStoryDetail(id) {
    try {
      const story = await this.#model.getStoryDetail(id);
      this.#view.renderStory(story);
    } catch (error) {
      this.#view.showError(error.message);
    }
  }
}

export default FeedDetailPresenter;
