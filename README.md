
# Discord Voice Channel Management Bot

This bot manages voice channels in a Discord server by creating new voice channels when a user enters a specific channel and deleting empty channels periodically.



## Setup

1.Clone the repository to your local machine:

```bash
  git clone https://github.com/your-username/discord-voice-bot.git
```

2.Install the required dependencies:

```bash
  npm install
```

3.Set up a new Discord Bot on the Discord Developer Portal.
4.Copy the bot token and replace "BOT TOKEN" in index.js with your bot's token.
5.Configure the Discord server ID ("1132655697729949736") and the target channel ID ("1140660651342172180") in index.js according to your Discord server settings.

6.Run the bot:
```bash
  node index.js
```
## Usage

When a user joins the specified channel, a new voice channel will be created with a specific name and user limit.
Empty voice channels will be deleted automatically after a certain period.

# Commands

!role wof: Assigns the user the role associated with the command.
!role gos: Assigns the user the role associated with the command.


## Contributing

Contributions are welcome!


## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License

