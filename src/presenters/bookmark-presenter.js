export default class BookmarkPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getBookmarks() {
    const bookmarks = await this.#model.getBookmarks();
    this.#view.renderBookmarks(bookmarks);
  }

  async deleteBookmark(storyId) {
    await this.#model.deleteBookmark(storyId);
    this.#view.showSuccessMessage('Berhasil menghapus dari bookmark');
    this.getBookmarks();
  }

  async getBookmarkDetail(storyId) {
    const bookmark = await this.#model.getBookmark(storyId);
    this.#view.renderBookmarkDetail(bookmark);
  }
}
