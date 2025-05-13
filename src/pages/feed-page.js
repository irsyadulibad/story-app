import '../css/feed.css';
import { capitalizeFirstLetter, checkLoggedIn } from '../utils';
import FeedModel from '../models/feed-model';
import FeedPresenter from '../presenters/feed-presenter';
import moment from 'moment';

export default class FeedPage {
  #presenter;

  async render() {
    checkLoggedIn();

    return `
      <section class="width-center" id="feed-section">
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
    });

    await this.#presenter.getFeed();
  }

  renderFeed(story) {
    const feedSection = document.getElementById('feed-section');
    const fromNow = moment(story.createdAt).fromNow();

    feedSection.insertAdjacentHTML(
      'beforeend',
      `
        <div class="card">
          <div class="post-metadata">
            <div class="avatar">
              <span>${story.name.charAt(0).toUpperCase()}</span>
            </div>

            <div>
              <h2 class="author">${story.name}</h2>
              <p class="datetime">${fromNow}</p>
            </div>

          </div>

          <img class="post-image" src="${story.photoUrl}" alt="${story.name} story" />
          <p class="post-text">${capitalizeFirstLetter(story.description)}</p>
        </div>
      `
    );
  }
}
