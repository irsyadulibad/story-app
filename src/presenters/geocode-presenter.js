import { showToast } from '../utils';

export default class GeocodePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async searchLocation(address) {
    const data = await this.#model.getGeocode(address);

    if (!data) {
      showToast('Gagal mengambil data geocode', 'danger');
      return;
    }

    this.#view.renderGeocode(data);
  }
}
