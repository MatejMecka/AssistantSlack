const config = require('../config.js')
const scraper = require('google-search-scraper')
const tracker = require('googleflightscraper')
const request = require('request')

const webCMDs = {
  search: function (bot, message) {
    let term = message.match[1]
    const api =
            'https://www.googleapis.com/customsearch/v1?key=' +
            config.cseapi +
            '&cx=' +
            config.cse +
            '&q=' +
            term
    bot.reply(message, 'Searching using Google Custom Search Engine... ')
    request(api, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let searchesjson = JSON.parse(body)
        bot.reply(message, 'Here are some results I got:')
        for (var i = 0; i < 3; i++) {
          bot.reply(message, searchesjson['items'][i]['link'])
        }
      } else {
        // If The Google Custom Engine Fails in any way it'll be redirect to the Google Scraper module.
        bot.reply(
          message,
          'There was an error with Google Custom Search Engine! Trying with scraping Google...'
        )
        let options = {
          query: term,
          host: 'www.google.com',
          lang: 'en',
          limit: '3',
          params: {}
        }
        scraper.search(options, function (err, url) {
          if (err) {
            bot.reply(
              message,
              'There was an error with scraping Google too. Sorry for the inconvenience please try again later.'
            )
          } else {
            bot.reply(message, url)
          }
        })
      }
    })
  },

  weatherQuery: function (bot, message) {
    let city = message.match[1]
    let api =
            'http://api.openweathermap.org/data/2.5/weather?q=' +
            city +
            '&units=metric&appid=' +
            config.weathertoken
    request(api, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // Try to parse the json. If it errors it gets caught.
        let weatherjson = JSON.parse(body)
        let weather = weatherjson['weather'][0]['main']
        let temperaturejson = weatherjson['main']['temp']
        let temperature = Math.round(temperaturejson)
        bot.reply(
          message,
          'The weather for ' +
                    city +
                    ' is: ' +
                    weather +
                    ' with a temperature of ' +
                    temperature +
                    '°C'
        )
      } else {
        console.error(error)
        console.log(response)
      }
    })
  },

  scoreQuery: function (bot, message) {
    let input = message.match[1]
    let parms = input.split(' ')

    let auth = 'Basic ' + new Buffer(config.mysportsfeeds).toString('base64')

    let api =
            'https://api.mysportsfeeds.com/v1.1/pull/' +
            parms[0] +
            '/2016-regular/scoreboard.json?fordate=' +
            parms[1]

    var options = {
      url: api,
      headers: {
        Authorization: auth
      }
    }

    request.get(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // Try to parse the json. If it errors it gets caught.
        let scoreboardjson = JSON.parse(body)

        if (typeof scoreboardjson['scoreboard']['gameScore'] === 'undefined') {
          bot.reply(message, "Sorry!  I couldn't find any scores for that day")
        } else {
          bot.reply(message, 'Here are the scores for that day:')

          for (
            var i = 0;
            i < scoreboardjson['scoreboard']['gameScore'].length;
            i++
          ) {
            let awayTeam =
                            scoreboardjson['scoreboard']['gameScore'][i]['game']['awayTeam'][
                              'Abbreviation'
                            ]
            let homeTeam =
                            scoreboardjson['scoreboard']['gameScore'][i]['game']['homeTeam'][
                              'Abbreviation'
                            ]
            let awayScore =
                            scoreboardjson['scoreboard']['gameScore'][i]['awayScore']
            let homeScore =
                            scoreboardjson['scoreboard']['gameScore'][i]['homeScore']
            bot.reply(
              message,
              '>' +
                            awayTeam +
                            ' ' +
                            awayScore +
                            ' |VS| ' +
                            homeTeam +
                            ' ' +
                            homeScore
            )
          }
        }
      } else {
        console.error(error)
        console.log(response)
      }
    })
  },

  lmgtfy: function (bot, message) {
    let term = message.match[1]
    term = term.replace(' ', '+')
    let url = 'http://lmgtfy.com/?q=' + term
    bot.reply(message, 'Here: ' + url)
  },

  flightQuery: function (bot, message) {
    var tosend = message.match[1]
    tracker(tosend, function (flightinfo) {
      var dep = flightinfo['DepartureCountry']
      var arr = flightinfo['ArrivalCountry']
      var deptime = flightinfo['DepartureTime']
      var arrtime = flightinfo['ArrivalTime']
      var depterminal = flightinfo['DepartureTerminal']
      var arrterminal = flightinfo['ArrivalTerminal']
      var status = flightinfo['Status']
      var info = flightinfo['Information']
      var flight = flightinfo['Flight']
      bot.reply(message, {
        attachments: [
          {
            fallback: 'Flight Summary.',
            color: '#2780f8',
            author_name: 'Google',
            author_icon:
                            'https://www.seeklogo.net/wp-content/uploads/2015/09/google-favicon-vector-200x200.png',
            author_link: 'https://www.google.com/',
            title: ':airplane: ' + flight,
            text: 'Status: ' + status,
            fields: [
              {
                title: 'From: ',
                value:
                                ':airplane_departure:' +
                                dep +
                                '\n:clock1:' +
                                deptime +
                                '\n:office:' +
                                depterminal,
                short: true
              },
              {
                title: 'Arrival: ',
                value:
                                ':airplane_arriving:' +
                                arr +
                                '\n:clock1:' +
                                arrtime +
                                '\n:office:' +
                                arrterminal,
                short: true
              },
              {
                title: 'Information: ',
                value: info,
                short: true
              }
            ],
            footer: 'data from Google'
          }
        ]
      })
    })
  },

  gifQuery: function (
    bot,
    message
  ) {
    let gif = message.match[1]
    let api = 'https://api.tenor.com/v1/search?q=' + gif + '&key=' + config.gifapi
    request(api, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let tenorjson = JSON.parse(body)
        let giftosend = tenorjson['results'][0]['url']
        bot.reply(message, giftosend)
      } else {
        console.error(error)
        console.log(response)
      }
    })
  }
}

module.exports = webCMDs
