// @flow

import { initialResolve } from './base'
import { TextLintEngine } from 'textlint'
import type { Message } from './base'
import path from 'path'

const TEXTLINT_FILE_NAME = '.japanease_textlintrc'

export default class Japanease {
  lintEngine: Object;

  constructor() {
    this.lintEngine = new TextLintEngine({
      configFile: path.join(__dirname, `../../config/textlint/${TEXTLINT_FILE_NAME}`),
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
          }
        ))
        resolve({ ...initialResolve, error: true, messages })
      })
    })
  }
}
