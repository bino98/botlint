// @flow

export default class Skill {
  bot: Object;
  proofreads: Array<Object>;

  constructor(bot: Object, proofreads: Array<Object>) {
    this.bot = bot
    this.proofreads = proofreads
  }

  apply() {
    return
  }
}
