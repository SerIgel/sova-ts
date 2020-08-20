import { ICommand } from "../config";
import { Message, CategoryChannel } from "discord.js";

export default class DeleteChannels implements ICommand {
    public name = "delete";
    public aliases = [""];
    public args = true;
    public sudo = true;
    public guildOnly = true;

    public async execute(message: Message, args: string[]) {
        args.forEach(id => {
            let cat = message.guild!.channels.resolve(id) as CategoryChannel;
            if (cat.type !== "category") { return message.reply("this is not category"); }
            cat.children.forEach(ch => ch.delete());
            cat.delete();
        })
        message.channel.send("You need to remove roles by yourself if there are ones")
    }
}