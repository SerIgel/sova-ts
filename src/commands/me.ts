import { ICommand } from "../config";
import { Message } from "discord.js";

export default class Me implements ICommand {
    public name = "me";
    public aliases = [""];
    public guildOnly = true;
    
    public async execute(message: Message, args: string[]) {
        message.channel.send(`${message.author} ${args.join(" ")}`);
        message.delete();
    }
}