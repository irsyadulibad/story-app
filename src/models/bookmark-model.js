import { openDB } from 'idb';

const DB_NAME = 'story-api';
const DB_VERSION = 1;
const DB_STORE = 'bookmarks';

class BookmarkModel {
  async #openDb() {
    return await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        db.createObjectStore(DB_STORE, { keyPath: 'id' });
      },
    });
  }

  async toggleBookmark(story) {
    const db = await this.#openDb();
    const tx = db.transaction(DB_STORE, 'readwrite');
    const store = tx.objectStore(DB_STORE);

    const bookmark = await store.get(story.id);

    if (bookmark) {
      await store.delete(story.id);

      return {
        status: true,
        type: 'delete',
      };
    }

    await store.add({
      id: story.id,
      name: story.name,
      photoUrl: story.photoUrl,
      description: story.description,
      lat: story.lat,
      lon: story.lon,
      createdAt: story.createdAt,
      savedAt: new Date().toISOString(),
    });

    return {
      status: true,
      type: 'add',
    };
  }
}

export default new BookmarkModel();
