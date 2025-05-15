import { showToast } from '../utils';

class PostPresenter {
  constructor({ view, model }) {
    this.view = view;
    this.model = model;
  }

  async createPost({ description, photo, lat, lon }) {
    const res = await this.model.createPost({ description, photo, lat, lon });

    if (res.status) {
      showToast('Post berhasil dibagikan', 'success');
      window.location.href = '#/feed';
    } else {
      showToast('Gagal membagikan post', 'danger');
    }
  }
}

export default PostPresenter;
