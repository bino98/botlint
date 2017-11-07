import SlackBot from './bots/slack_bot'
// import English from './proofreads/english'
import Japanese from './proofreads/japanese'
import TextCheck from './bots/skills/text_check'

class Botlint {
  constructor() {
    const slackBot = new SlackBot()
    const japanese = new Japanese()
    new TextCheck(slackBot, japanese).set()
  }
}

new Botlint()
