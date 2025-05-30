export default class FeedPresenter {
  #view;
  #model;
  #bookmarkModel;

  constructor({ view, model, bookmarkModel }) {
    this.#view = view;
    this.#model = model;
    this.#bookmarkModel = bookmarkModel;
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

  async toggleBookmark(story) {
    const isBookmarked = await this.#bookmarkModel.toggleBookmark(story);

    if (!isBookmarked.status) {
      this.#view.showErrorToast('Gagal menyimpan');
      return;
    }

    this.#view.markAsBookmarked(story.id, isBookmarked.type);
  }
}
