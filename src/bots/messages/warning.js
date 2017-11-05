import Message from './base'

export default class Warning extends Message {
  static text(message, line) {
    return {
      "attachments": [
          {
              "fields": [
                {
                  title: 'Detail',
                  value: message,
                },
                {
                  title: 'Line',
                  value: line,
                },
              ],
              "color": "#F35A00"
          }
      ]
  }
  }
}
