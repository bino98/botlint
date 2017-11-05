import Skill from './base'
import Warning from '../messages/warning'

export default class TextCheck extends Skill {
  set() {
    this.bot.controller.hears([/./g], ['ambient'], (bot, message) => {
      this.proofread.check(message.text).then(checkResults => {
        if(!checkResults.error) { return }
        checkResults.results.forEach(m => {
          bot.whisper(message, Warning.text(m.message, m.line))
        })
      })
    })
  }
}
