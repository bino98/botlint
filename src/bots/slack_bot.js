import Botkit from 'botkit'

export default class SlackBot {
  constructor() {
    this.controller = Botkit.slackbot({ debug: true })
    this.controller.spawn({ token: process.env.SLACK_BOT_TOKEN }).startRTM()
  }
}
