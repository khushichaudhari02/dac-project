import moment from 'moment'
import { config } from './config'

// path = user/login
// url = http://localhost:8080/
// http://localhost:4000/user/login
export function createUrl(path) {
  return `${config.serverUrl}/${path}`
}

export function formatDate(timestamp) {
  return moment(timestamp).fromNow()
}
