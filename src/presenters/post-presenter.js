class PostPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async createPost({ description, photo, lat, lon }) {
    this.#view.showLoading();
    const res = await this.#model.createPost({ description, photo, lat, lon });

    if (res.status) {
      this.#view.onPostSuccess();
    } else {
      this.#view.onPostError();
    }

    this.#view.hideLoading();
  }
}

export default PostPresenter;
