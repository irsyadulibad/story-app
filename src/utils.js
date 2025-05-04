export const apiUrl = 'https://story-api.dicoding.dev/v1';

export const reqHeaders = {
  'Content-Type': 'application/json',
};

export function showToast(message, variant = 'regular') {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<toast-message message="${message}" variant="${variant}"></toast-message>`
  );
}
