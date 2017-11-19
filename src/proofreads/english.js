// @flow

import Proofread, { initialResolve } from './base'
import request from 'request'
import type { Message } from './base'

const URL_ENDPOINT = 'https://api.textgears.com/check.php'

export default class English extends Proofread {
  check(text: string) {
    var options = {
      url: this.url(text),
      method: 'GET',
      json: true,
    }    
    return new Promise(resolve => {
      request(options, (error, response, body) => {
        if (response.statusCode !== 200 || body.errors.length == 0) { return resolve(initialResolve) }
        const messages: Array<Message> = body.errors.map((error): Message => {
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
    return `${URL_ENDPOINT}?text=${text}&key=${token}`
  }
}
