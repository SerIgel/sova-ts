import { ICommand } from "../config";
import { Message } from "discord.js";

export default class Game implements ICommand {
    public name = "game";
    public aliases = [""];
    public guildOnly = true;
    public sudo = true;
    public usage = "<start/stop>"
    public async execute(message: Message, args: string[]) {
        let role = message.guild!.roles.cache.find(r => r.name === "game");
        if (!role) {
            role = await message.guild!.roles.create({ data: { name: `game` } })
        }
        let me = message.guild!.members.cache.find(u => u.id === message.client.user!.id)
        switch (args[0]) {
            case "start":
                me!.roles.add(role)
                break;
            case "stop": 
                me!.roles.remove(role)
            default:
                break;
        }
    }
}