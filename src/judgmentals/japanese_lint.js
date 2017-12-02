// @flow

import { initialResolve } from './base'
import { TextLintEngine } from 'textlint'
import type { Message } from './base'
import path from 'path'

const CONFIG_FILE_PATH = '../../config/japanese_lint.json'

export default class JapaneseLint {
  lintEngine: Object;

  constructor() {
    this.lintEngine = new TextLintEngine({
      configFile: path.join(__dirname, CONFIG_FILE_PATH),
    })
  }

  check(text: string) {
    return new Promise((resolve) => {
      this.lintEngine.executeOnText(text).then((lintResults: Array<any>) => {
        if (!this.lintEngine.isErrorResults(lintResults)) {
          resolve(initialResolve)
          return
        }
        const messages = lintResults[0].messages.map((message): Message => (
          {
            detail: message.message,
            line: message.line,
            footer: 'by Textlint - Japanese'
          }
        ))
        resolve({ ...initialResolve, error: true, messages })
      })
    })
  }
}
