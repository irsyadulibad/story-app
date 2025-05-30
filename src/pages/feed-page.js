import '../css/feed.css';
import { capitalizeFirstLetter, checkLoggedIn, showToast } from '../utils';
import BookmarkModel from '../models/bookmark-model';
import FeedModel from '../models/feed-model';
import FeedPresenter from '../presenters/feed-presenter';
import moment from 'moment';

export default class FeedPage {
  #presenter;

  async render() {
    checkLoggedIn();
    return `
      <section class="width-center" id="feed-section">
        <div class="feed-loading">
          <div class="loading-spinner">
            <div class="spinner"></div>
          </div>
          <p>Memuat cerita...</p>
        </div>
        <a class="btn primary" href="#/post" id="btn-add-section">
          <i class="ti ti-plus"></i>
        </a>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new FeedPresenter({
      view: this,
      model: FeedModel,
      bookmarkModel: BookmarkModel,
    });

    await this.#presenter.getFeed();
  }

  renderFeed(story) {
    const feedSection = document.getElementById('feed-section');
    const fromNow = moment(story.createdAt).fromNow();

    const loadingState = feedSection.querySelector('.feed-loading');
    if (loadingState) {
      loadingState.remove();
    }

    feedSection.insertAdjacentHTML(
      'beforeend',
      `
        <div class="card">
          <div class="post-metadata">
            <div class="post-metadata-left">
              <div class="avatar">
                <span>${story.name.charAt(0).toUpperCase()}</span>
              </div>

              <div>
                <h2 class="author">${story.name}</h2>
                <p class="datetime">${fromNow}</p>
              </div>
            </div>

            <span class="bookmark-span-${story.id}">
            </span>
          </div>

          <a href="#/feed/${story.id}" class="post-link">
            <img class="post-image" src="${story.photoUrl}" alt="${story.name} story" />
            <p class="post-text">${capitalizeFirstLetter(story.description)}</p>
          </a>
        </div>
      `
    );

    const bookmarkButton = document.createElement('button');
    const bookmarkSpan = document.querySelector(`.bookmark-span-${story.id}`);

    bookmarkButton.classList.add('btn-bookmark');
    bookmarkButton.innerHTML = '<i class="ti ti-bookmark"></i>';

    bookmarkSpan.appendChild(bookmarkButton);
    bookmarkButton.addEventListener('click', () => {
      this.#presenter.toggleBookmark(story);
    });
  }

  markAsBookmarked(storyId, type) {
    const bookmarkButton = document.querySelector(
      `.bookmark-span-${storyId} > .btn-bookmark`
    );

    bookmarkButton.innerHTML = `<i class="ti ti-bookmark${type === 'add' ? '-filled' : ''}"></i>`;
  }

  showEmptyState() {
    const feedSection = document.getElementById('feed-section');
    const loadingState = feedSection.querySelector('.feed-loading');
    if (loadingState) {
      loadingState.remove();
    }

    feedSection.insertAdjacentHTML(
      'beforeend',
      `
        <div class="empty-state">
          <i class="ti ti-news-off"></i>
          <p>Belum ada cerita</p>
          <a href="#/post" class="btn primary">Buat Cerita</a>
        </div>
      `
    );
  }

  showErrorMessage() {
    const feedSection = document.getElementById('feed-section');
    const loadingState = document.querySelector('.feed-loading');
    const errorState = document.querySelector('.error-state');

    if (loadingState) {
      loadingState.remove();
    }

    if (errorState) {
      errorState.remove();
    }

    feedSection.insertAdjacentHTML(
      'beforeend',
      `
        <div class="error-state">
          <i class="ti ti-alert-circle"></i>
          <p>Gagal menampilkan feed</p>
          <button class="btn outline" id="btn-refresh-feed">
            <i class="ti ti-refresh"></i>
            Coba Lagi
          </button>
        </div>
      `
    );

    const btnRefreshFeed = document.getElementById('btn-refresh-feed');
    btnRefreshFeed.addEventListener('click', () => {
      this.#presenter.getFeed();
    });
  }

  showErrorToast(message) {
    showToast(message, 'danger');
  }
}
