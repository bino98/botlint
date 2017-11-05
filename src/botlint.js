import SlackBot from './bots/slack_bot'
import JapaneseTextlint from './proofreads/japanese_textlint'
import TextCheck from './bots/skills/text_check'
import TextGear from './proofreads/text_gear'

class Botlint {
  constructor() {
    const slackBot = new SlackBot()
    const japaneseTextlint = new JapaneseTextlint()
    const textGear = new TextGear()
    // new TextCheck(slackBot, japaneseTextlint).set()
    new TextCheck(slackBot, textGear).set()
  }
}

new Botlint()
