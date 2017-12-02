// @flow
import SlackBot from './bots/slack_bot'
import TextGear from './judgmentals/text_gear'
import JapaneseLint from './judgmentals/japanese_lint'
import YahooProofread from './judgmentals/yahoo_proofread'
import GoogleTranslate from './judgmentals/google_translate'
import TextCheck from './bots/skills/text_check'

class Botlint {

  bot: Object;

  constructor() {
    this.bot = new SlackBot()
    const textGear = new TextGear()
    const japaneseLint = new JapaneseLint()
    const yahooProofread = new YahooProofread()
    const googleTranslate = new GoogleTranslate()
    new TextCheck(this.bot, [textGear, japaneseLint, yahooProofread, googleTranslate]).apply()
  }
}

new Botlint()
