// @flow
import SlackBot from './bots/slack_bot'
import TextGear from './judgmentals/text_gear'
import JapaneseLint from './judgmentals/japanese_lint'
import YahooProofread from './judgmentals/yahoo_proofread'
import GoogleTranslate from './judgmentals/google_translate'
import TextCheck from './bots/skills/text_check'
import TextTranslate from './bots/skills/text_translate'

class Botlint {

  bot: Object;

  constructor() {
    this.bot = new SlackBot()
    this.applyChecker()
    this.applyTranslate()
  }

  applyChecker(): void {
    const textGear = new TextGear()
    const japaneseLint = new JapaneseLint()
    const yahooProofread = new YahooProofread()
    new TextCheck(this.bot, [textGear, japaneseLint, yahooProofread]).apply()
  }

  applyTranslate(): void {
    const googleTranslate = new GoogleTranslate()
    new TextTranslate(this.bot, [googleTranslate]).apply()
  }
}

new Botlint()
