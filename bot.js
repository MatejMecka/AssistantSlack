var Botkit = require("botkit")
var config = require("./config.js")
var request = require("request")
var info = ["help", "info", "commands", "instructions"]


var response = "Hello there :)"
var controller = Botkit.slackbot({
	debug: false
})


var bot = controller.spawn({

	token: config.token,
	retry: Infinity

}).startRTM();

controller.hears('hello','direct_message,direct_mention,mention',function(bot,message) { 
	bot.reply(message, "Hey there! How can I help you?")
})


controller.hears('weather (.*)','direct_message,direct_mention,mention',function(bot,message) { 
	 var  fullmessage = message  
	 var city = message.match[1];
	 var api = "http://api.openweathermap.org/data/2.5/weather?q=" + city +  "&units=metric&appid=" + config.token"
	 request(api, function(error, response, body) {
        if (!error && response.statusCode == 200) {
        // Try to parse the json. If it errors it gets caught.
        var weatherjson = JSON.parse(body);
        var weather = weatherjson['weather'][0]['main'];
        var temperaturejson =  weatherjson['main']['temp']
        var temperature = Math.round(temperaturejson)
        bot.reply(message, "The weather for " + city + " is: " + weather + " with a temperature of " + temperature + "°C");
            } 
        else {
              console.error(error);
              console.log(response);
            }
	 });
})



controller.hears('date','direct_message,direct_mention,mention',function(bot,message) { 
	var datetime = new Date();	  
        bot.reply(message, "Today is: " + datetime)
})

controller.hears(info,'direct_message,direct_mention,mention',function(bot,message) { 
        bot.reply(message, "Hello there! I'm the @google bot and i'm here to help you with your searches on this slack chat! I'm currently in development and blame @matejmecka for everything. Sadly I don't have the search function yet. But i have the date command :)")
})


controller.hears('exit','direct_message,direct_mention,mention',function(bot,message) { 
        if(message.user == config.admin){
	bot.reply(message, "Ok. Shutting down")
	console.log("Shutted down 'by admin...")	
	process.exit(1);
	}
	else{
	bot.reply(message, ":warning: I'm sorry I'm afraid I can't let you do that")
	console.log("User: " + message.user + " Tried to shut me down :c")
}
})


