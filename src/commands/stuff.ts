import { ICommand } from "../config";
import { Client, Message } from "discord.js";

export default class stuff implements ICommand {
    public name = "do";
    public aliases = [];
    public async execute(message: Message, args: string[]) {
    }
}