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
  footer: string,
}

export const initialResolve: Result = { error: false, messages: [], footer: 'by Botlint' }
