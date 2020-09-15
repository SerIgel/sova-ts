import * as Discord from 'discord.js'
const client = new Discord.Client();
import { IConfig, ICommand } from './config'


const cfg = require('../config.json') as IConfig

let commands = new Discord.Collection<string, ICommand>()

function readCommands(Commands: Discord.Collection<string, ICommand>) {
    const { commands } = require('../src/commands.json');
    if (!commands || !Array.isArray(commands) || commands.length === 0) {
        throw new Error('Invalid / empty commands list');
    }

    for (const name of commands) {
        const cmdClass = require(`./commands/${name}`).default;
        const cmd = new cmdClass() as ICommand;

        Commands.set(cmd.name, cmd)
        console.log(`Command ${cmd.name} is ready!`)
    }

}



client.login(cfg.token)
    .catch(error => { console.log(`Can't because of ${error}`) })

client.on("ready", async () => {
    console.log(`Logged in as ${client.user!.tag}`)
    readCommands(commands)
})

client.on("message", async message => {
    if (!message.content.startsWith(cfg.prefix) || message.author.bot) return;
    
    const args = message.content.slice(cfg.prefix.length).split(/ +/);
    if (args == null) { return }
    const commandName = args.shift()!.toLowerCase();

    const command = commands.get(commandName)
    || commands.find(cmd => cmd.aliases ? cmd.aliases?.includes(commandName) : false);
    if (!command) return;
    // Check for running guild-only commands inside DM
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    // Channel check
    if (command.groupOnly && cfg.groupChannel.includes(message.channel.id)) { return message.delete(); }

    // Args check
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${cfg.prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }
    // Admin check
    if (command.sudo) {
        if (!cfg.admin.includes(message.author.id) && !message.member?.hasPermission("ADMINISTRATOR")) {
            return message.reply("you need to be a superuser to use this command");
        }
    }


    try {
		command.execute(message, args);
	} catch (error) {
        if (error.message === "Incorrect usage") {
            message.reply(`the proper usage would be: \`${cfg.prefix}${command.name} ${command.usage}\``)
        }
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

})