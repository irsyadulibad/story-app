import 'leaflet/dist/leaflet.css';
import '../css/comps/pick-location.css';

import L from 'leaflet';
import { mtApikey, showToast } from '../utils';
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import GeocodePresenter from '../presenters/geocode-presenter';
import mapModel from '../models/map-model';

class PickLocation extends HTMLElement {
  #map;
  #marker;
  #coords = [-6.208982, 106.845172];
  #layers = {};
  #presenter;

  constructor() {
    super();

    this.classList.add('pick-location', 'hidden');
    this.#presenter = new GeocodePresenter({
      view: this,
      model: mapModel,
    });
  }

  render(coords) {
    this.innerHTML = `
      <div class="pick-location-header">
        <h2 class="title">Pilih Lokasi</h2>
        <button id="close-location-btn">
          <i class="ti ti-x"></i>
        </button>
      </div>
      <div class="pick-location-body">
        <form method="post" class="form-group search-box" id="geocoding-form">
          <input type="text" name="address" placeholder="Cari lokasi" class="form-control">
          <button type="submit" class="btn primary small" id="search-btn">
            <i class="ti ti-search"></i>
            <div class="loading-spinner hidden">
              <div class="spinner"></div>
            </div>
          </button>
        </form>

        <div class="map-view" id="map">
          <button class="btn icon primary btn-my-location" id="my-location-btn" title="My Location">
            <i class="ti ti-current-location"></i>
          </button>
        </div>

        <div class="result-container hidden">
          <h3 class="result-title">Hasil Pencarian</h3>
          <div class="geocode-result" id="geocode-result"></div>
        </div>
      </div>

      <div class="pick-location-footer">
        <button class="btn outline" id="cancel-location-btn">
          Batal
        </button>

        <button class="btn primary" id="pick-location-btn">
          Pilih Lokasi
        </button>
      </div>
    `;

    this.initMapLayer();

    this.#map = L.map('map', {
      layers: [this.#layers['Default']],
      center: this.#coords,
      zoom: 15,
    });

    L.control.layers(this.#layers).addTo(this.#map);

    this.#marker = L.marker(this.#coords).addTo(this.#map);
    this.setCurrentLocation(coords);
    this.#addEvent();
  }

  initMapLayer() {
    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    const mtLandscape = new MaptilerLayer({
      apiKey: mtApikey,
      style: 'landscape',
    });

    const mtSatellite = new MaptilerLayer({
      apiKey: mtApikey,
      style: '0196c7d2-afc8-7818-96b0-65b29c17df0d',
    });

    this.#layers = {
      Default: osm,
      Satellite: mtSatellite,
      Landscape: mtLandscape,
    };
  }

  setCurrentLocation(coords) {
    if (!navigator.geolocation) {
      showToast(
        'Maaf browser anda tidak mendukung penggunaan lokasi',
        'danger'
      );
      return;
    }

    if (coords[0] && coords[1]) {
      this.#coords = coords;
      this.#map.setView(this.#coords, 15);
      this.#marker.setLatLng(this.#coords);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        this.#coords = [position.coords.latitude, position.coords.longitude];
        this.#map.setView(this.#coords, 15);
        this.#marker.setLatLng(this.#coords);
      });
    }
  }

  renderGeocode(data) {
    const resultContainer = this.querySelector('.result-container');
    const geocodeResult = this.querySelector('#geocode-result');

    if (data.length == 1) {
      this.#map.setView([data[0].lat, data[0].lon], 15);
      this.#marker.setLatLng([data[0].lat, data[0].lon]);
    }

    geocodeResult.innerHTML = '';
    resultContainer.classList.remove('hidden');

    if (data.length === 0) {
      geocodeResult.innerHTML = `
        <div class="empty-state">
          <i class="ti ti-map-pin-off"></i>
          <p>Lokasi tidak ditemukan</p>
        </div>
      `;
      return;
    }

    data.forEach((item) => {
      geocodeResult.insertAdjacentHTML(
        'beforeend',
        `<button class="geocode-item" data-lat="${item.lat}" data-lon="${item.lon}">
          <i class="ti ti-map-pin"></i>
          <span class="geocode-item-name">${item.display_name}</span>
        </button>`
      );
    });

    this.scrollTo({
      top: 133,
      behavior: 'smooth',
    });

    this.#addGeocodeEvent();
  }

  showLoadingGeocode() {
    const resultContainer = this.querySelector('.result-container');
    const geocodeResult = this.querySelector('#geocode-result');

    resultContainer.classList.remove('hidden');
    geocodeResult.innerHTML = `
      <div class="loading-state">
        <div class="loading-spinner">
          <div class="spinner"></div>
        </div>
        <p>Mencari lokasi...</p>
      </div>
    `;
  }

  #addEvent() {
    const geocodingForm = this.querySelector('#geocoding-form');
    const closeLocationBtn = this.querySelector('#close-location-btn');
    const cancelLocationBtn = this.querySelector('#cancel-location-btn');
    const pickLocationBtn = this.querySelector('#pick-location-btn');
    const myLocationBtn = this.querySelector('#my-location-btn');
    const searchBtn = this.querySelector('#search-btn');
    const searchInput = this.querySelector('input[name="address"]');

    geocodingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const address = e.target.address.value;

      searchBtn.disabled = true;
      searchInput.disabled = true;
      searchBtn.querySelector('.ti-search').classList.add('hidden');
      searchBtn.querySelector('.loading-spinner').classList.remove('hidden');

      this.showLoadingGeocode();

      try {
        await this.#presenter.searchLocation(address);
      } finally {
        searchBtn.disabled = false;
        searchInput.disabled = false;
        searchBtn.querySelector('.ti-search').classList.remove('hidden');
        searchBtn.querySelector('.loading-spinner').classList.add('hidden');
      }
    });

    this.#map.on('click', (e) => {
      this.#map.setView(e.latlng, 15);
      this.#marker.setLatLng(e.latlng);
    });

    closeLocationBtn.addEventListener('click', () => {
      this.classList.add('hidden');
    });

    cancelLocationBtn.addEventListener('click', () => {
      this.classList.add('hidden');
    });

    pickLocationBtn.addEventListener('click', () => {
      const pickEvent = new CustomEvent('pick-location', {
        detail: {
          lat: this.#marker.getLatLng().lat,
          lon: this.#marker.getLatLng().lng,
        },
      });

      this.dispatchEvent(pickEvent);
    });

    myLocationBtn.addEventListener('click', () => {
      this.setCurrentLocation([]);
    });
  }

  #addGeocodeEvent() {
    const geocodeItems = this.querySelectorAll('.geocode-item');

    geocodeItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        const button = e.target.closest('.geocode-item');
        const lat = button.dataset.lat;
        const lon = button.dataset.lon;

        this.#map.setView([lat, lon], 15);
        this.#marker.setLatLng([lat, lon]);
      });
    });
  }
}

customElements.define('pick-location', PickLocation);
export default PickLocation;
