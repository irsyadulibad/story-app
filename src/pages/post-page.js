import '../css/post.css';

import '../components/takephoto';
import '../components/pick-location';
import postModel from '../models/post-model';
import PostPresenter from '../presenters/post-presenter';

export default class PostPage {
  #photo;
  #presenter;
  #takePhoto;
  #description;
  #lat;
  #lon;

  get photo() {
    return this.#photo;
  }

  set photo(value) {
    this.#photo = value;
    this.#validateForm();
  }

  get description() {
    return this.#description;
  }

  set description(value) {
    this.#description = value;
    this.#validateForm();
  }

  get lat() {
    return this.#lat;
  }

  set lat(value) {
    this.#lat = value;
    this.#validateForm();
  }

  get lon() {
    return this.#lon;
  }

  set lon(value) {
    this.#lon = value;
    this.#validateForm();
  }

  async render() {
    return `
      <section class="width-center" id="post-section">
        <form class="card" id="post-form">
          <h1 class="title">Buat Story</h1>

          <div class="form-group">
            <p class="label">Photo</p>

            <div class="upload-container">
              <button type="button" class="btn-upload" aria-label="Ambil Foto" id="take-photo-btn">
                <i class="ti ti-camera"></i>
                <span>Ambil Foto</span>
              </button>

              <button type="button" class="btn-upload" aria-label="Unggah Gambar" id="upload-btn">
                <i class="ti ti-upload"></i>
                <span>Unggah Gambar</span>
              </button>

              <take-photo></take-photo>
              <div class="photo-preview hidden">
                <img src="" alt="Photo Preview" class="photo-preview-img">
                <button type="button" class="btn danger small photo-preview-close">
                  <i class="ti ti-x"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="description">Deskripsi</label>
            <textarea class="form-control" rows="4" id="description"></textarea>
          </div>

          <div class="form-group">
            <label for="location-btn">Lokasi</label>
            <button type="button" id="location-btn">
              <i class="ti ti-map-pin"></i>
              <span id="location-btn-text">Pilih Lokasi</span>
            </button>
          </div>

          <div class="form-group">
            <button type="submit" class="btn primary" disabled>Post Story</button>
          </div>

          <input type="file" id="photo-input" class="hidden" accept="image/*">
          <input type="hidden" id="lat" name="lat">
          <input type="hidden" id="lon" name="lon">
        </form>

        <pick-location></pick-location>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new PostPresenter({
      view: this,
      model: postModel,
    });

    this.#takePhoto = document.querySelector('take-photo');
    this.#addEvent();
  }

  showLoading() {
    const btn = document.querySelector('button[type="submit"]');
    btn.classList.add('loading');
  }

  hideLoading() {
    const btn = document.querySelector('button[type="submit"]');
    btn.classList.remove('loading');
  }

  #addEvent() {
    const takePhotoBtn = document.querySelector('#take-photo-btn');
    const uploadBtn = document.querySelector('#upload-btn');
    const closeBtn = document.querySelector('.photo-preview-close');
    const photoInput = document.querySelector('#photo-input');
    const descriptionInput = document.querySelector('#description');
    const locationBtn = document.querySelector('#location-btn');
    const pickLocation = document.querySelector('pick-location');
    const locationBtnText = document.querySelector('#location-btn-text');
    const postForm = document.querySelector('#post-form');

    takePhotoBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      const isCameraReady = await this.#takePhoto.previewCamera();
      this.#toggleUploadBtns(!isCameraReady);
    });

    uploadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      photoInput.click();
    });

    closeBtn.addEventListener('click', () => {
      this.photo = null;
    });

    locationBtn.addEventListener('click', (e) => {
      pickLocation.classList.remove('hidden');
      pickLocation.render([this.lat, this.lon]);
    });

    this.#takePhoto.addEventListener('closeCamera', () => {
      this.#toggleUploadBtns(true);
    });

    this.#takePhoto.addEventListener('takePhoto', (e) => {
      this.photo = e.detail.file;
    });

    photoInput.addEventListener('change', (e) => {
      this.photo = e.target.files[0];
    });

    descriptionInput.addEventListener('input', (e) => {
      this.description = e.target.value.trim();
    });

    pickLocation.addEventListener('pick-location', (e) => {
      this.lat = e.detail.lat;
      this.lon = e.detail.lon;

      locationBtnText.textContent = `${this.lat}, ${this.lon}`;

      pickLocation.classList.add('hidden');
    });

    postForm.addEventListener('submit', (e) => {
      e.preventDefault();

      this.#presenter.createPost({
        description: this.description,
        photo: this.photo,
        lat: this.lat,
        lon: this.lon,
      });
    });
  }

  #validateForm() {
    const photoPreviewContainer = document.querySelector('.photo-preview');
    const photoPreview = document.querySelector('.photo-preview-img');
    const submitBtn = document.querySelector(
      '#post-form button[type="submit"]'
    );

    if (this.#photo) {
      this.#takePhoto.closeCamera(false);
      photoPreview.src = URL.createObjectURL(this.#photo);
      photoPreviewContainer.classList.remove('hidden');
      this.#toggleUploadBtns(false);
    } else {
      photoPreview.src = '';
      this.#toggleUploadBtns(true);
      photoPreviewContainer.classList.add('hidden');
    }

    submitBtn.disabled = !(
      this.#photo &&
      this.#description &&
      this.#lat &&
      this.#lon
    );
  }

  #toggleUploadBtns(isVisible) {
    const uploadBtns = document.querySelectorAll('.btn-upload');
    uploadBtns.forEach((btn) => btn.classList.toggle('hidden', !isVisible));
  }
}
