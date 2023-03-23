# HiBot
silly discord bot that manages a #hi channel

At this stage, there is no persistance storage so if the bot goes offline, it loses track of when the last hi was.
It also doesn't work on more than one server. If you want it to work on several servers, you would need to deploy
several discord apps.

Future plans are to persist the hi's in a db and maybe collect some stats related to times the rules have been violated.
After that, making the app scalable across servers should be easy peasy.
