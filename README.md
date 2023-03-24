# HiBot
silly discord bot that manages a #hi channel

Project has an issue tracker https://zigliki.atlassian.net/browse/HIB however, due to the free jira plan, it is in accessible to everyone. Please Submit issues at hibot.zigliki.com

At this stage, there is no persistance storage so if the bot goes offline, it loses track of when the last hi was.
It also doesn't work on more than one server. If you want it to work on several servers, you would need to deploy
several discord apps.

Future plans are to persist the hi's in a db and maybe collect some stats related to times the rules have been violated.
After that, making the app scalable across servers should be easy peasy.
