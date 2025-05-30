import bookmarkModel from '../models/bookmark-model';

class FeedDetailPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getStoryDetail(id) {
    const bookmark = await bookmarkModel.getBookmark(id);

    if (!navigator.onLine && bookmark) {
      this.#view.renderStory(bookmark);
      return;
    }

    try {
      const story = await this.#model.getStoryDetail(id);
      this.#view.renderStory(story);
    } catch (error) {
      this.#view.showError(error.message);
    }
  }
}

export default FeedDetailPresenter;
