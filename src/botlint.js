import SlackBot from './bots/slack_bot'
import JapaneseTextlint from './proofreads/japanese_textlint'

class Botlint {
  constructor() {
    this.bot = new SlackBot()
    this.proofeead = new JapaneseTextlint()

    this.bot.controller.hears([/./g], ['ambient'], (bot, message) => {
      this.proofeead.check(message.text).then(result => {
        result.error ? bot.whisper(message, result.message) : null
      })
    })
  }
}

new Botlint()
