import AuthModel from './models/auth-model';

export const baseUrl = '/';

export const baseApiUrl = 'https://story-api.dicoding.dev';
export const apiUrl = `${baseApiUrl}/v1`;
export const mtApikey = 'KkyMgLJnVkWVvvcTUgxO';
export const vapidPublicKey =
  'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk';

export const reqHeaders = {
  'Content-Type': 'application/json',
};

export function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

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

// Notifications Management

export async function getNotificationPermission() {
  return await Notification.requestPermission();
}

export async function isPushSubscribed() {
  return !!(await getPushSubscription());
}

export async function getPushSubscription() {
  const registration = await navigator.serviceWorker.getRegistration();
  return await registration.pushManager.getSubscription();
}

export async function subscribeToPush() {
  const registration = await navigator.serviceWorker.getRegistration();
  const pushSubscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
  });

  const { endpoint, keys } = pushSubscription.toJSON();

  const response = await fetch(`${apiUrl}/notifications/subscribe`, {
    method: 'POST',
    body: JSON.stringify({ endpoint, keys }),
    headers: {
      ...reqHeaders,
      Authorization: `Bearer ${AuthModel.getUser().token}`,
    },
  });

  if (!response.ok) return false;
  return true;
}

export async function unsubscribeFromPush() {
  const pushSubscription = await getPushSubscription();

  const response = await fetch(`${apiUrl}/notifications/subscribe`, {
    method: 'DELETE',
    body: JSON.stringify({ endpoint: pushSubscription.endpoint }),
    headers: {
      ...reqHeaders,
      Authorization: `Bearer ${AuthModel.getUser().token}`,
    },
  });

  if (!response.ok) return false;

  await pushSubscription.unsubscribe();
  return true;
}
