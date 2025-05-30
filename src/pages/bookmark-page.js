import '../css/bookmark.css';

import BookmarkPresenter from '../presenters/bookmark-presenter';
import BookmarkModel from '../models/bookmark-model';
import moment from 'moment';
import { capitalizeFirstLetter, showToast } from '../utils';

export default class BookmarkPage {
  #presenter;

  async render() {
    return `
      <section class="width-center" id="bookmark-section">
        <div class="bookmark-header">
            <h2 class="page-title">Bookmark</h2>
        </div>

        <div class="bookmark-posts">
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new BookmarkPresenter({
      view: this,
      model: BookmarkModel,
    });

    this.#presenter.getBookmarks();
  }

  renderBookmarks(bookmarks) {
    const bookmarkPosts = document.querySelector('.bookmark-posts');
    const bookmarkHeader = document.querySelector('.bookmark-header');
    bookmarkPosts.innerHTML = '';

    if (bookmarks.length === 0) {
      bookmarkHeader.classList.add('hidden');
      bookmarkPosts.innerHTML = `
        <div class="empty-state">
          <i class="ti ti-bookmark-off"></i>
          <p>Tidak terdapat bookmark yang tersimpan</p>
        </div>
      `;
      return;
    }

    bookmarks.forEach((story) => {
      const fromNow = moment(story.createdAt).fromNow();

      bookmarkPosts.insertAdjacentHTML(
        'beforeend',
        `<div class="card">
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

            <span class="delete-span-${story.id}">
            </span>
          </div>

          <a href="#/feed/${story.id}" class="post-link">
            <img class="post-image" src="${story.photoUrl}" alt="${story.name} story" />
            <p class="post-text">${capitalizeFirstLetter(story.description)}</p>
          </a>
        </div>`
      );

      this.#createDeleteButton(story.id);
    });
  }

  showSuccessMessage(message) {
    showToast(message, 'success');
  }

  #createDeleteButton(storyId) {
    const deleteButton = document.createElement('button');
    const deleteSpan = document.querySelector(`.delete-span-${storyId}`);

    deleteButton.classList.add('btn-delete');
    deleteButton.setAttribute('title', 'Hapus dari bookmark');
    deleteButton.innerHTML = '<i class="ti ti-trash"></i>';

    deleteSpan.appendChild(deleteButton);
    deleteButton.addEventListener('click', () => {
      this.#presenter.deleteBookmark(storyId);
    });
  }
}
