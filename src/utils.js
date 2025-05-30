import AuthModel from './models/auth-model';

export const baseApiUrl = 'https://story-api.dicoding.dev';
export const apiUrl = `${baseApiUrl}/v1`;
export const mtApikey = 'KkyMgLJnVkWVvvcTUgxO';

export const reqHeaders = {
  'Content-Type': 'application/json',
};

export function checkLoggedIn() {
  if (!AuthModel.isLoggedIn()) window.location.href = '#/login';
}

export function showToast(message, variant = 'regular') {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<toast-message message="${message}" variant="${variant}"></toast-message>`
  );
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
