const Botkit = require('botkit')
const config = require('./config.js')
const triggers = require('./triggers.js')
const greetCMDs = require('./botFuncs/greetCMDs.js')
const webCMDs = require('./botFuncs/webCMDs.js')
const triggerCMDs = require('./botFuncs/triggerCMDs.js')
const dictCMDs = require('./botFuncs/dictCMDs.js')

let controller = Botkit.slackbot({
  clientSigningSecret: config.token,
  debug: false
})

controller
  .spawn({
    token: config.token,
    retry: Infinity
  })
  .startRTM()

controller.hears('hello',
  'direct_message,direct_mention,mention',
  greetCMDs.hello)

controller.on('bot_channel_join',
  greetCMDs.bot_join)

controller.on('user_channel_join',
  greetCMDs.user_join)

controller.hears(
  'search (.*)',
  'direct_message,direct_mention,mention',
  webCMDs.search
)

controller.hears(
  'weather (.*)',
  'direct_message,direct_mention,mention',
  webCMDs.weatherQuery
)

controller.hears(
  'define (.*)',
  'direct_message,direct_mention,mention',
  dictCMDs.define
)

controller.hears(
  'scores (.*)',
  'direct_message,direct_mention,mention',
  webCMDs.scoreQuery
)

controller.hears('date',
  'direct_message,direct_mention,mention',
  greetCMDs.date)

controller.hears(
  triggers.info,
  'direct_message,direct_mention,mention',
  triggerCMDs.info
)

controller.hears(
  triggers.love,
  'direct_message,direct_mention,mention',
  triggerCMDs.love
)

controller.hears('exit',
  'direct_message,direct_mention,mention',
  triggerCMDs.exit)

controller.hears(
  'translate (.*) to (.*)',
  'direct_message,direct_mention,mention',
  dictCMDs.translateQuery
)

controller.hears(
  'lmgtfy (.*)',
  'direct_message,direct_mention,mention',
  webCMDs.lmgtfy
)

controller.hears(
  'flight (.*)',
  'direct_message,direct_mention,mention'

)

controller.hears('gif (.*)',
  'direct_message,direct_mention,mention',
  webCMDs.gifQuery)
