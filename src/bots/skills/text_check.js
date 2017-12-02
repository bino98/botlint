// @flow
import Skill from './base'
import { warningMessage } from '../message'
import type { Result, Message } from '../../judgmentals/base'

export default class TextCheck extends Skill {
  apply() {
    this.bot.controller.hears([/.+/g], ['ambient'], (bot, botMessage) => {
      this.judgementals.forEach(proofread => {
        proofread.check(botMessage.text).then((result: Result) => {
          if(!result.error) { return }
          result.messages.forEach((message: Message) => { bot.whisper(botMessage, warningMessage(message)) })
        })
      })
    })
  }
}
