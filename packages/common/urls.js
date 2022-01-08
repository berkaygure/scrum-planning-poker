const BASE = '/api/';
const URL_AUTH = BASE + 'auth';
const URL_REGISTER = `${URL_AUTH}/register`;
const URL_LOGIN = `${URL_AUTH}/login`;
const URL_LOGOUT = `${URL_AUTH}/logout`;
const URL_ME = `${URL_AUTH}/me`;
const URL_REFRESH_TOKEN = `${URL_AUTH}/refreshToken`;
const URL_ROOMS = `${BASE}rooms`;
const URL_JIRA = `${BASE}jira`;

module.exports = {
  BASE,
  URL_AUTH,
  URL_REGISTER,
  URL_LOGIN,
  URL_ME,
  URL_LOGOUT,
  URL_REFRESH_TOKEN,
  URL_ROOMS,
  URL_JIRA,
};
