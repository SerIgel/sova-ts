import { ICommand } from "../config";
import { Message } from "discord.js";

export default class Group implements ICommand {
    public name = "group";
    public args = true;
    public guildOnly = true;
    public groupOnly = true;
    public usage = "<add/rm> <group name>"


    public async execute(message: Message, args: string[]) {
        if (args.length !== 2) { return message.delete(); }
        if (!args[1].match(/^\d/)) { return message.delete(); }
        
        let action = args.shift();

        let role = message.guild!.roles.cache.find(r => r.name === args.join(' '));
        if (!role) {
            return message.reply(`такой группы не существует`)
        }
        if (message.member!.roles.cache.find(r => !(r.name.match(/^\d/) == null))) {
            return message.reply("у вас не может быть более одной роли группы")
        }
        if (action === "add")
            message.member!.roles.add(role)
        else if (action === "rm")
            message.member!.roles.remove(role)

        role = message.guild!.roles.cache.find(r => r.name === "Ученик")
        if (!role) {
            role = await message.guild!.roles.create({
                data: {
                    name: `Ученик`,
                    color: `#22db6f`
                },
            })
        }
        message.member!.roles.add(role)
    }
}
