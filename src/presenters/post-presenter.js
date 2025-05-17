import { showToast } from '../utils';

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
      showToast('Post berhasil dibagikan', 'success');
      window.location.href = '#/feed';
    } else {
      showToast('Gagal membagikan post', 'danger');
    }

    this.#view.hideLoading();
  }
}

export default PostPresenter;
