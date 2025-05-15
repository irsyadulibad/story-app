const apiUrl = 'https://nominatim.openstreetmap.org/search';

class MapModel {
  async getGeocode(address) {
    try {
      const response = await fetch(
        `${apiUrl}?q=${encodeURIComponent(address)}&format=json`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching geocode:', error);
      return null;
    }
  }
}

export default new MapModel();
