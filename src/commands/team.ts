import { ICommand } from "../config";
import { Message } from "discord.js";

export default class Team implements ICommand {
    public name = "team";
    public aliases = [""];
    public groupOnly = true;
    public guildOnly = true;

    public async execute(message: Message, args: string[]) {
        let me = message.guild!.members.cache.find(u => u.id === message.client.user!.id)
        let action = args.shift();
        if (me!.roles.cache.find(r => r.name.includes("game"))) {
            return message.reply("Game has already started! If you want to change your team, contact server administrator.")
        }
        let role = message.guild!.roles.cache.find(r => r.name === "Команда " + args.join(' '));
        if (!role) {
            return message.reply(`такой команды не существует`)
        }
        if (message.member!.roles.cache.find(r => r.name.includes("Команда"))) {
            return message.reply("у вас не может быть более одной роли команды")
        }
        switch (action) {
            case "add":
                if (role.members.size >= 5) { message.reply("в этой команде уже есть пять человек"); return;}
                message.member!.roles.add(role)
                break;
            case "rm":
                message.member!.roles.remove(role)
            default:
                throw new Error("Incorrect usage");
        }
 
    }
}