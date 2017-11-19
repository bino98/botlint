import Skill from './base'
import Warning from '../messages/warning'

export default class TextCheck extends Skill {
  apply() {
    this.bot.controller.hears([/.+/g], ['ambient'], (bot, botMessage) => {
      this.proofreads.forEach(proofread => {
        proofread.check(botMessage.text).then(checkResults => {
          if(!checkResults.error) { return }
          checkResults.messages.forEach(message => { bot.whisper(botMessage, Warning.message(message)) })
        })
      })
    })
  }
}
