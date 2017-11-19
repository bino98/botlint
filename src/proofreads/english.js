// @flow

import { initialResolve } from './base'
import axios from 'axios'
import type { Message } from './base'

const URL_ENDPOINT = 'https://api.textgears.com/check.php'

export default class English {
  check(text: string) {
    var options = {
      url: this.url(text),
      method: 'GET',
    }
    return new Promise(resolve => {
      axios(options).then((response) => {
        if (response.status !== 200 || response.data.errors.length == 0) { return resolve(initialResolve) }
        const messages: Array<Message> = response.data.errors.map((error): Message => {
          return {
            detail: `${error.bad} => ${error.better.join(', ')}`,
            length: error.length,
            offset: error.offset,
          }
        })
        resolve({ ...initialResolve, error: true, messages })
      })
    }) 
  }

  url(text: string) {
    const token = process.env.TEXT_GEAR_TOKEN || ''
    return `${URL_ENDPOINT}?text=${encodeURIComponent(text)}&key=${token}`
  }
}
