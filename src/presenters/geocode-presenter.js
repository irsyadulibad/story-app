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
      this.#view.showGeocodeError('Gagal mengambil data geocode');
      return;
    }

    this.#view.renderGeocode(data);
  }
}
