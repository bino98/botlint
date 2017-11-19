export const initialMessage = {
  text: undefined,
  line: undefined,
}

export default class Message {
  static message(message = initialMessage) {
    return message.text
  }
}
