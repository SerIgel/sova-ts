import { ICommand } from "../config";
import { Message } from "discord.js";

export default class ResetTeams implements ICommand {
    public name = "reset";
    public aliases = [""];
    public sudo = true;
    public guildOnly = true;

    public async execute(message: Message, args: string[]) {
        message.guild!.members.cache.forEach(async member => {
            let role = member.roles.cache.find(r => r.name.includes("Команда"))
            if (!role) { return; }
            await member.roles.remove(role)
        })
    }
}