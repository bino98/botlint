import Proofread from './base'
import { TextLintEngine } from 'textlint'
import path from 'path'

const TEXTLINT_FILE_NAME = '.japanease_textlintrc'

export default class JapaneaseTextlint extends Proofread {
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
          resolve({ error: false, results: [] })
          return
        }
        resolve({ error: true, results: lintResults[0].messages })
      })
    })
  }
}
