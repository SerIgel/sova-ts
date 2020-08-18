import { ICommand } from "../config";
import { Message } from "discord.js";

export default class Promote implements ICommand {
    public name = "promote";
    public aliases = [""];
    public guildOnly = true;
    public sudo = true;

    public async execute(message: Message, args: string[]) {
        if (!message.mentions.users.first()) { return message.reply("you need to specify a person to promote") }
        const taggedUser = message.guild!.members.cache.get(message.mentions.users.first()!.id)
        taggedUser!.roles.add(message.member!.roles.highest)
    }
}
