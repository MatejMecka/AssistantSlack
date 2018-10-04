const greetCMDs = {
  hello: function (
    bot,
    message
  ) {
    bot.reply(message, 'Hey there! How can I help you?')
  },

  bot_join: function (bot, message) {
    bot.reply(
      message,
      "Hello! I am the @google bot and I'm here to be your personal assistant. I still suck though, blame @matejmecka on GitHub for that."
    )
  },

  user_join: function (bot, message) {
    bot.reply(
      "Hello there! Welcome to the [SLACK TEAM HERE] I'm your personal assistant. I still suck though, blame @matejmecka for that."
    )
  },

  date: function (
    bot,
    message
  ) {
    let datetime = new Date()
    bot.reply(message, 'Today is: ' + datetime)
  }
}

module.exports = greetCMDs
