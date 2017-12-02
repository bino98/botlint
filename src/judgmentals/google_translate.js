// @flow

import { initialResolve } from './base'
import axios from 'axios'
import type { Message } from './base'
import dig from 'object-dig'

const DETECT_ENDPOINT = 'https://translation.googleapis.com/language/translate/v2/detect'
const TRANSLATE_ENDPOINT = 'https://translation.googleapis.com/language/translate/v2'
const TARGET = 'ja'
const SOURCE = 'en'

export default class GoogleTranslate {
  check(text: string) {
    var options = {
      url: this.translateUrl(),
      method: 'POST',
      responseType: 'json',
      data: {
        source: SOURCE,
        target: TARGET,
        format: 'text',
        q: text,
      }
    }
    return new Promise(resolve => {
      this.detect(text).then(() => {
        axios(options).then((response) => {
          const results: Array<any> = dig(response.data, 'data', 'translations', (res) => ((res || []).map((text) => text.translatedText)) )
          if (response.status !== 200 || results.length === 0) { return resolve(initialResolve) }
          const messages: Array<Message> = results.map((result): Message => {
            return {
              title: `${SOURCE} was detected. translate to ${TARGET}`,
              detail: result,
              footer: 'by Google Cloud Translate'
            }
          })
          resolve({ ...initialResolve, error: true, messages })
        })
      }).catch(() => (resolve(initialResolve)))
    }) 
  }

  detect(text: string) {
    var options = {
      url: this.detectUrl(),
      method: 'POST',
      responseType: 'json',
      data: {
        format: 'text',
        q: text,
      }
    }
    return new Promise((resolve, reject) => {
      axios(options).then((response) => {
        const results: Array<any> = dig(response.data, 'data', 'detections', (res) => (res[0] || [] ));
        const confidence: number = dig(results[0], 'confidence', (res) => (parseFloat(res || 0)));
        const language: string = dig(results[0], 'language', (res) => (res || ''));
        confidence > 0.9 && language === SOURCE ? resolve(language) : reject()
      })
    })
  }

  detectUrl(): string {
    const token = process.env.GOOGLE_TOKEN || ''
    return `${DETECT_ENDPOINT}?key=${token}`
  }

  translateUrl(): string {
    const token = process.env.GOOGLE_TOKEN || ''
    return `${TRANSLATE_ENDPOINT}?key=${token}`
  }
}
