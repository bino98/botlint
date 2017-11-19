import Message, { initialMessage } from './base'

export default class Warning extends Message {
  static message(message = initialMessage) {
    let attachment = { fields: [] }
    if (message.message) { attachment.fields.push({ title: 'Detail', value: message.message }) }
    if (message.line) { attachment.fields.push({ title: 'Line', value: message.line }) }
    return { "attachments": [ { ...attachment, "color": "#F35A00" }]}
  }
}
