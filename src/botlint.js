import SlackBot from './bots/slack_bot'
import English from './proofreads/english'
import TextCheck from './bots/skills/text_check'

class Botlint {
  constructor() {
    const slackBot = new SlackBot()
    const english = new English()
    new TextCheck(slackBot, english).set()
  }
}

new Botlint()
