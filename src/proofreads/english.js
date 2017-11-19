import Proofread, { initialResolve } from './base'
import request from 'request'

const URL_ENDPOINT = 'https://api.textgears.com/check.php'

export default class English extends Proofread {
  check(text) {
    var options = {
      url: this.url(text),
      method: 'GET',
      json: true,
    }    
    return new Promise(resolve => {
      request(options, (error, response, body) => {
        if (response.statusCode !== 200 || body.errors.length == 0) { return resolve(initialResolve) }
        const messages = body.errors.map(error => {
          return { message: `${error.bad} is but, better is ${error.better.join(', ')}` }
        })
        resolve({ ...initialResolve, error: true, messages })
      })
    })
    
  }

  url(text) {
    return `${URL_ENDPOINT}?text=${text}&key=${process.env.TEXT_GEAR_TOKEN}`
  }
}
