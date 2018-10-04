const config = require('../config.js')

const triggerCMDs = {
  info: function (bot, message) {
    bot.reply(
      message,
      "Hello there! I'm the @google bot and i'm here to help you with your searches on this slack chat! I'm made by @MatejMecka. You can learn more about me or contribute to my code on Github at https://github.com/MatejMecka/GoogleAssistantSlack/. I'm powered by Google, Dark Sky(For weather), Oxford's Dictionary API for the define command "
    )
  },

  love: function (bot, message) {
    bot.reply(message, 'No.')
  },

  exit: function (
    bot,
    message
  ) {
    if (message.user === config.admin) {
      bot.reply(message, 'Ok. Shutting down')
      process.exit(1)
    } else {
      bot.reply(message, ":warning: I'm sorry I'm afraid I can't let you do that")
      console.log('User: ' + message.user + ' Tried to shut me down :c')
    }
  }
}

module.exports = triggerCMDs
