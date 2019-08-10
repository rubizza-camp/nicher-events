import Axios from 'axios';

export default function set_authorized_headers () {
  if (sessionStorage.user) {
    Axios.defaults.headers.common['access-token'] = sessionStorage.user['access-token']
    Axios.defaults.headers.common['client'] = sessionStorage.user['client']
    Axios.defaults.headers.common['uid'] = sessionStorage.user['uid']
  }
}
