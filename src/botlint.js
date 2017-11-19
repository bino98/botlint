import SlackBot from './bots/slack_bot'
import English from './proofreads/english'
import Japanese from './proofreads/japanese'
import YahooProofread from './proofreads/yahoo_proofread'
import TextCheck from './bots/skills/text_check'

class Botlint {
  constructor() {
    const slackBot = new SlackBot()
    const english = new English()
    const japanese = new Japanese()
    const yahooProofread = new YahooProofread()
    new TextCheck(slackBot, [english, japanese, yahooProofread]).apply()
  }
}

new Botlint()
