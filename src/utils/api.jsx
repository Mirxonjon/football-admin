export const host = 'https://swagger.ccenter.uz/api/v1/'
export const img_link = 'https://storage.googleapis.com/telecom2003/'

export const apiGet = (url, token, method = 'GET') => {
  return fetch(host + url, {
    method: `${method}`,
    headers: {
      'autharization': token ,
      'Content-Type': 'application/json',
    },
  })
}
