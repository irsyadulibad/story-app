import '../css/post.css';
import TakePhoto from '../components/takephoto';

export default class PostPage {
  #photo;
  #presenter;
  #takePhoto;
  #description;

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

  async render() {
    return `
      <section class="width-center" id="post-section">
        <form class="card" id="post-form">
          <h1 class="title">Buat Story</h1>

          <div class="form-group">
            <p class="label">Photo</p>

            <div class="upload-container">
              <button class="btn-upload" aria-label="Ambil Foto" id="take-photo-btn">
                <i class="ti ti-camera"></i>
                <span>Ambil Foto</span>
              </button>

              <button class="btn-upload" aria-label="Unggah Gambar" id="upload-btn">
                <i class="ti ti-upload"></i>
                <span>Unggah Gambar</span>
              </button>

              <take-photo></take-photo>
              <div class="photo-preview hidden">
                <img src="" alt="Photo Preview" class="photo-preview-img">
                <button class="btn danger small photo-preview-close">
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
            <label for="description">Lokasi</label>
            <button id="location-btn">
              <i class="ti ti-map-pin"></i>
              <span>Pilih Lokasi</span>
            </button>
          </div>

          <div class="form-group">
            <button type="submit" class="btn primary" disabled>Post Story</button>
          </div>

          <input type="file" id="photo-input" class="hidden" accept="image/*">
        </form>

        <div class="select-location hidden">
          <div class="select-location-header">
            <h2 class="title">Pilih Lokasi</h2>
            <button id="close-location-btn">
              <i class="ti ti-x"></i>
            </button>
          </div>
          <div class="select-location-body">
            <div class="form-group search-box">
              <input type="text" placeholder="Cari lokasi" class="form-control">
              <button class="btn primary small">
                <i class="ti ti-search"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#takePhoto = document.querySelector('take-photo');
    this.#addEvent();
  }

  #addEvent() {
    const takePhotoBtn = document.querySelector('#take-photo-btn');
    const uploadBtn = document.querySelector('#upload-btn');
    const closeBtn = document.querySelector('.photo-preview-close');
    const photoInput = document.querySelector('#photo-input');
    const descriptionInput = document.querySelector('#description');

    takePhotoBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      const isCameraReady = await this.#takePhoto.previewCamera();
      this.#toggleUploadBtns(!isCameraReady);
    });

    uploadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      photoInput.click();
    });

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.photo = null;
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

    submitBtn.disabled = !(this.#photo && this.#description);
  }

  #toggleUploadBtns(isVisible) {
    const uploadBtns = document.querySelectorAll('.btn-upload');
    uploadBtns.forEach((btn) => btn.classList.toggle('hidden', !isVisible));
  }
}
