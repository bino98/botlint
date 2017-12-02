// @flow
import type { Message } from '../judgmentals/base'

const initialMessage: Message = {
  title: undefined,
  detail: undefined,
  line: undefined,
  offset: undefined,
  length: undefined,
  footer: 'by Botlint',
}

export const warningMessage = (message: Message = initialMessage) => {
  let attachment: { fields: Array<any> } = { fields: [] }
  if (message.title) { attachment.fields.push({ title: 'Title', value: message.title }) }
  if (message.detail) { attachment.fields.push({ title: 'Detail', value: message.detail }) }
  if (message.line) { attachment.fields.push({ title: 'Line', value: message.line, short: true }) }
  if (message.offset) { attachment.fields.push({ title: 'Offset', value: message.offset, short: true }) }
  if (message.length) { attachment.fields.push({ title: 'Length', value: message.length, short: true }) }
  return {
    attachments: [ { ...attachment, color: "#F35A00", footer: message.footer }]
  }
}

export const noticeMessage = (message: Message = initialMessage) => {
  let attachment: { fields: Array<any> } = { fields: [] }
  if (message.title) { attachment.fields.push({ title: 'Title', value: message.title }) }
  if (message.detail) { attachment.fields.push({ title: 'Detail', value: message.detail }) }
  if (message.line) { attachment.fields.push({ title: 'Line', value: message.line, short: true }) }
  if (message.offset) { attachment.fields.push({ title: 'Offset', value: message.offset, short: true }) }
  if (message.length) { attachment.fields.push({ title: 'Length', value: message.length, short: true }) }
  return {
    attachments: [ { ...attachment, color: "#F35A00", footer: message.footer }]
  }
}

export default {
  warningMessage,
}