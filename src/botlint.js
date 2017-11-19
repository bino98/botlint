import SlackBot from './bots/slack_bot'
import English from './proofreads/english'
import Japanese from './proofreads/japanese'
import TextCheck from './bots/skills/text_check'

class Botlint {
  constructor() {
    const slackBot = new SlackBot()
    const english = new English()
    const japanese = new Japanese()
    new TextCheck(slackBot, [english, japanese]).apply()
  }
}

new Botlint()
