
#Google Assistant for Slack

![](http://i.imgur.com/vskvm93.png)

A Slack Bot that should be a Google assistant but isn't one yet.



###Requirments:

 - Node.JS presumably v6.0.0
 - Botkit!
 - Request
 - Google Search Scraper

###Installation:
	

 - Install Botkit using `npm install --save botkit`
 - Install Request & Google searh Scraper using npm too:  `npm install request` & `npm install google-search-scraper`
 
###Known Issues:
 
 - Google Search Scraper gives 10 results instead of the results specified(Fixed by modyfing directly the module)
 - Botkit crashes when it gets exit(I have no idea why)
