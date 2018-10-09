const config = require('../config.js')
const request = require('request')

const dictCMDs = {
  define: function (bot, message) {
    let word = message.match[1]
    let api =
            'https://od-api.oxforddictionaries.com:443/api/v1/entries/' +
            config.language +
            '/' +
            word.toLowerCase()
    var options = {
      url: api,
      headers: {
        app_id: config.app_id,
        app_key: config.app_key
      }
    }
    function callback (error, response, body) {
      if (!error && response.statusCode === 200) {
        var info = JSON.parse(body)
        var lex = info['results'][0]['lexicalEntries'][0]['lexicalCategory']
        bot.reply(message, 'Here is what I got: ')
        bot.reply(message, {
          attachments: [
            {
              fallback: 'Word Summary.',
              color: '#00BCD4',
              author_name: 'Oxford Dictionary',
              author_icon:
                                'https://pbs.twimg.com/profile_images/772723194742595584/kMShKCMj.jpg',
              author_link: 'https://www.oxforddictionaries.com/',
              title: word,
              text: lex,
              fields: [
                {
                  title: 'Definition:',
                  value:
                                    '1. ' +
                                    info['results'][0]['lexicalEntries'][0]['entries'][0][
                                      'senses'
                                    ][0]['definitions'],
                  short: false
                }
              ],
              footer: 'data from Oxford Dictionaries'
            }
          ]
        })
      }
    }
    request(options, callback)
  },

  translateQuery: function (bot, message) {
    let totranslate = message.match[1]
    let targetlang = message.match[2]
    if (targetlang === ' ') {
      targetlang = 'en'
    }
    translate(totranslate, { to: targetlang })
      .then(res => {
        bot.reply(
          message,
          'Translated from: ' +
                    res.from.language.iso +
                    '. It means: ' +
                    res.text
        )
      })
      .catch(err => {
        console.error(err)
        bot.reply(message, err)
      })
  }
}

module.exports = dictCMDs
