import { ICommand } from "../config";
import { Message } from "discord.js";

export default class Send implements ICommand {
    public name = "message";
    public aliases = ["send"];
    public sudo = true;
    public args = true;
    public usage = `<роль группы/вообще любая роль> <сообщение>`;
    public guildOnly = true;

    public async execute(message: Message, args: string[]) {
        args.shift()
        message.guild!!.members.cache.forEach(member => {
            if (member.roles.cache.find(r =>
                r === message.mentions.roles.first())) {
                member.send(args.join(" "))
                message.channel.send(member.user.tag)
            }
        })
    }
}