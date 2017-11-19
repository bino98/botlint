import Proofread, { initialResolve } from './base'
import { TextLintEngine } from 'textlint'
import path from 'path'

const TEXTLINT_FILE_NAME = '.japanease_textlintrc'

export default class Japanease extends Proofread {
  constructor() {
    super()
    this.textlintEngile = new TextLintEngine({
      configFile: path.join(__dirname, `../../config/textlint/${TEXTLINT_FILE_NAME}`),
    })
  }

  check(text) {
    return new Promise((resolve) => {
      this.textlintEngile.executeOnText(text).then(lintResults => {
        if (!this.textlintEngile.isErrorResults(lintResults)) {
          resolve(initialResolve)
          return
        }
        resolve({ ...initialResolve, error: true, messages: lintResults[0].messages })
      })
    })
  }
}
