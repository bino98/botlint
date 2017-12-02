// @flow
import SlackBot from './bots/slack_bot'
import TextCheck from './bots/skills/text_check'
import { classFactory } from './judgmentals/factory'
import JudgmentalsConfig from '../config/judgmentals.json'

const judgmentals = () => {
  return JudgmentalsConfig.enables.map(className => {
    const dynamicClass = classFactory(className)
    return new dynamicClass()
  })
}

class Botlint {
  bot: Object;
  constructor() {
    this.bot = new SlackBot()
    new TextCheck(this.bot, judgmentals()).apply()
  }
}

new Botlint()
