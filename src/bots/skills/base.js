// @flow

export default class Skill {
  bot: Object;
  judgementals: Array<Object>;

  constructor(bot: Object, judgementals: Array<Object>) {
    this.bot = bot
    this.judgementals = judgementals
  }

  apply() {
    return
  }
}
