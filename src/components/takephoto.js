import '../css/comps/takephoto.css';

import { showToast } from '../utils';

class TakePhoto extends HTMLElement {
  #cameraStream;
  #closeEvent;

  constructor() {
    super();
    this.classList.add('take-photo-container', 'hidden');
    this.#closeEvent = new Event('closeCamera');
  }

  async previewCamera() {
    await this.#initCamera();

    if (!this.#cameraStream) {
      showToast('Tidak dapat mengakses kamera', 'danger');
      return false;
    }

    this.innerHTML = `
      <video class="video-preview" autoplay>
      </video>

      <button type="button" class="btn danger small video-preview-close" id="close-camera-btn">
        <i class="ti ti-x"></i>
      </button>

      <button type="button" class="btn video-preview-take-photo" id="take-photo-btn"></button>

      <canvas class="hidden" id="photo-result"></canvas>
    `;

    const videoPreview = this.querySelector('.video-preview');
    videoPreview.srcObject = this.#cameraStream;

    const closeCameraBtn = this.querySelector('#close-camera-btn');
    closeCameraBtn.addEventListener('click', () => this.closeCamera());

    const takePhotoBtn = this.querySelector('#take-photo-btn');
    takePhotoBtn.addEventListener('click', () => this.#takePhoto());

    this.classList.remove('hidden');
    return true;
  }

  closeCamera(dispatchEvent = true) {
    this.classList.add('hidden');

    if (this.#cameraStream)
      this.#cameraStream.getTracks().forEach((track) => track.stop());

    if (dispatchEvent) this.dispatchEvent(this.#closeEvent);
  }

  async #initCamera() {
    try {
      this.#cameraStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
    } catch {
      this.#cameraStream = null;
    }
  }

  #takePhoto() {
    const photoResult = this.querySelector('#photo-result');
    const videoPreview = this.querySelector('.video-preview');

    photoResult.width = videoPreview.videoWidth;
    photoResult.height = videoPreview.videoHeight;

    photoResult
      .getContext('2d')
      .drawImage(videoPreview, 0, 0, photoResult.width, photoResult.height);

    photoResult.toBlob((blob) => {
      const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
      const event = new CustomEvent('takePhoto', { detail: { file } });

      this.dispatchEvent(event);
    });
  }
}

customElements.define('take-photo', TakePhoto);
export default TakePhoto;
