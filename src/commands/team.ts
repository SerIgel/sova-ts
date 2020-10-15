import { ICommand } from "../config";
import { Message } from "discord.js";

export default class Team implements ICommand {
    public name = "team";
    public aliases = [""];
    public guildOnly = true;

    public async execute(message: Message, args: string[]) {
        let action = args.shift();
        if (action == null) { return message.reply("Incorrect usage"); }

        let me = message.guild!.members.cache.find(u => u.id === message.client.user!.id)
        if (me!.roles.cache.find(r => r.name.includes("game"))) {
            return message.reply("Game has already started! If you want to change your team, contact server administrator.")
        }
        let role = message.guild!.roles.cache.find(r => r.name === "Команда " + args.join(' '));
        
        if (!role) {
            return message.reply(`такой команды не существует`)
        }

        switch (action) {
            case "get":
                if (message.member!.roles.cache.find(r => r.name.includes("Команда"))) {
                    return message.reply("у вас не может быть более одной роли команды")
                }
                message.member!.roles.add(role)
                break;
            case "rm":
                message.member!.roles.remove(role)
                break;
            default:
                message.reply("incorrect usage");
        }
 
    }
}