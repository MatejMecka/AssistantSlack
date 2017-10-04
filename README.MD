
# Google Assistant for Slack [![Codacy Badge](https://api.codacy.com/project/badge/Grade/4476f9276d914b6fb3c27afc3d284aeb)](https://www.codacy.com/app/matej.plavevski-github/GoogleAssistantSlack?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=MatejMecka/GoogleAssistantSlack&amp;utm_campaign=Badge_Grade)

![](http://i.imgur.com/vskvm93.png)

A Slack Bot that is a Google Assistant. No not that assistant on Google Home devices and phones but this assistant's purpose is to help you with most Google Products. Get you searches, Get you the date and many more that I haven't sit to make them cause I'm lazy. If you have anything you wish to be added make an Issue. Thanks.



### Requirments:

 - Node.JS presumably v6.0.0
 - Botkit!
 - Request
 - Google Search Scraper
 - Oxford Dictionary API

### Installation:


 - Install Botkit using `npm install --save botkit`
 - Install Request & Google searh Scraper using npm too:  `npm install request` & `npm install google-search-scraper`
 - Install the node-google-translate using `npm install google-translate --save`

### Getting Started:
#### Running Locally as a Custom Integration
 - Create a new custom integration in your Slack workspace
   https://api.slack.com/apps?new_app=1
 - Under the Add Features and Functionality section add a new bot
 - Give the bot a Display name and Default User name and complete by adding the new bot user
 - Under the Settings section, select Install App and install your new add to your workspace
 - After installation, the OAuth Tokens for Your Team is displayed.  Copy the bot user auth token (xoxb -)

 - Update the config.js file providing the bot user auth token
 - Start the Bot running locally via node
   ' node bot.js '
 - Console output for running bot
  ```
  Initializing Botkit v0.6.3
  info: ** No persistent storage method specified! Data may be lost when process shuts down.
  info: ** API CALL: https://slack.com/api/rtm.connect
  notice: ** BOT ID: botname ...attempting to connect to RTM!
  notice: RTM websocket opened
 ```
 - Once running got to your Slack workspace, and click on your Bot under the Apps section
 - Say 'Hello' to the Bot and if configured correctly you should get the response 'Hey there! How can I help you?'

#### Other Services and APIs
  - You should register for an API KEY or access to the apis running the other services in order to make use of those commands
  - Update the config.js with your keys and information as necessary

### Known Issues:

 - Google Search Scraper gives 10 results instead of the results specified(Fixed by modyfing directly the module)
 - Captcha(Make a VPN to the bot, connect via VPN, fill out captcha for latest search, try again.)
 - Translation returns BAD_NETWORK or something like that(Fixed by modyfying directly the module)

### FAQ:

Q: Is the project dead?

A: No. I'm just busy

Q: Why are there like 6 commands

A: Cause I a) didn't add them b) didn't thought of them c) too lazy to make it d) all of the above
