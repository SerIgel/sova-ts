import { ICommand } from "../config";
import { Message } from "discord.js";

export default class Ping implements ICommand {
    public name = "ping";
    public async execute(message: Message, args: string[]) {
        message.channel.send("Pong!");
    }
}