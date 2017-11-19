// @flow
export type Result = {
  error: boolean,
  messages: Array<Message>,
}

export type Message = {
  title?: ?string,
  detail?: string,
  line?: number,
  offset?: number,
  length?: number,
}

export const initialResolve: Result = { error: false, messages: [] }

export default class Proofread {
  /*
    If you add proof classes, please inherit check method.
    @return Promise
   */
  check(){
    return new Promise(resolve => resolve({ ...initialResolve }))
  }
}
