// @flow

import { initialResolve } from './base'
import axios from 'axios'
import xml2json from 'xml2json'
import type { Message } from './base'
import dig from 'object-dig'

const URL_ENDPOINT = 'https://jlp.yahooapis.jp/KouseiService/V1/kousei'

export default class YahooProofread {
  check(text: string) {
    var options = {
      url: this.url(text),
      method: 'GET',
      responseType: 'text',
    }
    return new Promise(resolve => {
      axios(options).then((response) => {
        const data = JSON.parse(xml2json.toJson(response.data))
        const results: Array<any> = dig(data, 'ResultSet', 'Result', (res) => (res || []) )
        if (response.status !== 200 || results.length === 0) { return resolve(initialResolve) }
        const messages: Array<Message> = results.map((result): Message => {
          return {
            title: `${dig(result, 'ShitekiInfo')}`,
            detail: `${dig(result, 'Surface')} => ${dig(result, 'ShitekiWord')}`,
            length: dig(result, 'Length'),
            offset: dig(result, 'StartPos'),
            footer: 'by Yahoo Proofread'
          }
        })
        resolve({ ...initialResolve, error: true, messages })
      })
    }) 
  }

  url(text: string) {
    const token = process.env.YAHOO_TOKEN || ''
    return `${URL_ENDPOINT}?sentence=${encodeURIComponent(text)}&appid=${token}`
  }
}
