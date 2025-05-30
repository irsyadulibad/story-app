import '../css/feed.css';

import { capitalizeFirstLetter, checkLoggedIn } from '../utils';
import FeedDetailModel from '../models/feed-detail-model';
import FeedDetailPresenter from '../presenters/feed-detail-presenter';
import moment from 'moment';
import { parseActivePathname } from '../url-parser';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import { mtApikey } from '../utils';

export default class FeedDetailPage {
  #presenter;
  #map;
  #marker;
  #layers = {};

  async render() {
    checkLoggedIn();

    return `
      <section class="width-center" id="feed-detail-section">
        <div class="feed-loading">
          <div class="loading-spinner">
            <div class="spinner"></div>
          </div>
          <p>Memuat cerita...</p>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const { id } = parseActivePathname();

    this.#presenter = new FeedDetailPresenter({
      view: this,
      model: FeedDetailModel,
    });

    await this.#presenter.getStoryDetail(id);
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

  renderStory(story) {
    const feedDetailSection = document.getElementById('feed-detail-section');
    const fromNow = moment(story.createdAt).fromNow();

    const loadingState = feedDetailSection.querySelector('.feed-loading');
    if (loadingState) {
      loadingState.remove();
    }

    feedDetailSection.innerHTML = `
      <div class="card">
        <div class="post-metadata">
          <div class="post-metadata-left">
            <div class="avatar">
              <span>${story.name.charAt(0).toUpperCase()}</span>
            </div>

            <div>
              <h2 class="author">${story.name} dsadas</h2>
              <p class="datetime">${fromNow}</p>
            </div>
          </div>
        </div>

        <div class="post-content">
          <img class="post-image" src="${story.photoUrl}" alt="${story.name} story" />
          <p class="post-text">${capitalizeFirstLetter(story.description)}</p>

          <div class="location-container">
            <div class="coord-row">
              <i class="ti ti-map-pin"></i>
              <span>${story.lat}, ${story.lon}</span>
            </div>
            <div class="map-container" id="story-map"></div>
          </div>
        </div>
      </div>
    `;

    this.initMapLayer();
    this.#map = L.map('story-map', {
      layers: [this.#layers['Default']],
      center: [story.lat, story.lon],
      zoom: 15,
    });

    L.control.layers(this.#layers).addTo(this.#map);
    this.#marker = L.marker([story.lat, story.lon])
      .bindPopup(`Latitude: ${story.lat}<br>Longitude: ${story.lon}`)
      .addTo(this.#map);
  }

  showError(message) {
    const feedDetailSection = document.getElementById('feed-detail-section');
    const loadingState = feedDetailSection.querySelector('.feed-loading');
    if (loadingState) {
      loadingState.remove();
    }

    feedDetailSection.innerHTML = `
      <div class="error-state">
        <i class="ti ti-alert-circle"></i>
        <p>${message}</p>
      </div>
    `;
  }
}
