const express = require("express");
const { Client, GatewayIntentBits,Collection, ChannelType } = require("discord.js");
const VoiceCollection = new Collection(); 
const app = express();

const client = new Client({
  intents: [GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
        	  GatewayIntentBits.MessageContent,
        	  GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const newChannelID= []
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Start an interval to periodically check and delete empty channels
  setInterval(() => {
    
    const guild = client.guilds.cache.get('1132655697729949736');
    for(let index = 0 ; index < newChannelID.length;index++ )
    {
      let channel = guild.channels.cache.find(channel => channel.id === newChannelID[index]);
      if(channel){
        const userCount = channel.members.size;
        if (userCount === 0) {
          channel.delete();
          newChannelID.splice(index, 1); // Remove the element at the specified index
          index--;
        }
      }
      
    } 
    
   // console.log(newChannelID)
    
  }, 5000); 
});




client.on("voiceStateUpdate", async (oldState, newState) => {
  console.log("hit")
  const user = await client.users.fetch(newState.id);
  const member = await newState.guild.members.fetch(newState.id);

  if (!oldState.channel && newState.channel && newState.channel.id === "1140660651342172180"){
    console.log('hit 2')
    // Get the name of the voice channel the user just joined
    const channelName = "Sloop "
    
    const channel = await newState.guild.channels.create({
      name:channelName,
      type:ChannelType.GuildVoice,
      userLimit:2,
      parent: newState.channel.parent
    })

    
    newChannelID.push(channel.id);
    member.voice.setChannel(channel);
    VoiceCollection.set(user.id,channel.id);

 
  
    
  }


 
  
  
});




const roleCommands = {
    "!role wof": "1132658869865291897",
    "!role gos": "1132658144905015297",
    // ... add more commands and role IDs as needed
};

const assignableRoles = Object.values(roleCommands);

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const command = message.content.toLowerCase();
    if (roleCommands[command]) {
        try {
            const role = message.guild.roles.cache.get(roleCommands[command]);
            if (!role) {
                const errorMsg = await message.reply(`Role not found for command: ${command}`);
                setTimeout(() => {
                    message.delete();
                    errorMsg.delete();
                }, 5000);
                return;
            }

            const member = message.guild.members.cache.get(message.author.id);

            // Remove any previous roles assigned through commands
            const rolesToRemove = member.roles.cache.filter(r => assignableRoles.includes(r.id));
            if (rolesToRemove.size > 0) {
                await member.roles.remove(rolesToRemove);
            }

            // Add the new role
            await member.roles.add(role);
            const successMsg = await message.reply(`You have been given the ${role.name} role!`);
            setTimeout(() => {
                message.delete(); // Delete the user's message
                successMsg.delete(); // Delete the bot's success response
            }, 5000);
        } catch (error) {
            console.error(error);
            const errorMsg = await message.reply('There was an error trying to give you the role.');
            setTimeout(() => {
                message.delete(); // Delete the user's message
                errorMsg.delete(); // Delete the bot's error response
            }, 5000);
        }
    }
});

client.login(
  "BOT TOKEN"
);

app.listen(1122, () => console.log("Running Port 1122"));