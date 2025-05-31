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
    if (!navigator.onLine) {
      this.#view.showOfflineState();
      return;
    }

    try {
      const stories = await this.#model.fetchData();

      stories.data.forEach(async (story) => {
        const isBookmarked = await this.#bookmarkModel.getBookmark(story.id);
        story.isBookmarked = isBookmarked ? true : false;
        this.#view.renderFeed(story);
      });

      if (!stories.status) {
        this.#view.showErrorMessage();
        return;
      }
    } catch {
      this.#view.showErrorMessage();
    }
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
