
# Google Assistant for Slack [![Codacy Badge](https://api.codacy.com/project/badge/Grade/4476f9276d914b6fb3c27afc3d284aeb)](https://www.codacy.com/app/matej.plavevski-github/GoogleAssistantSlack?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=MatejMecka/GoogleAssistantSlack&amp;utm_campaign=Badge_Grade)

![](http://i.imgur.com/vskvm93.png)

A Google Assistant, but on Slack.

### Requirements:

 - Node.JS (preferably v6.0.0+)
 - Botkit
 - Request
 - Google Search Scraper
 - Oxford Dictionary API

### Installation:
	
`npm install`
 
### Known Issues:
 
 - Google Search Scraper gives 10 results instead of the results specified (fixed by modifying directly the module)
 - Captcha (make a VPN for the bot, connect via VPN, fill out captcha for latest search, try again)
 - Translation returns BAD_NETWORK or something like that (fixed by modifying directly the module)