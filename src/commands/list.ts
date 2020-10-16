import { ICommand } from "../config";
import { Message } from "discord.js";

export default class ListRoles implements ICommand {
    public name = "list";
    public aliases = ["list", "ll"];
    public sudo = true;
    public guildOnly = true;
    public async execute(message: Message, args: string[]) {
        let roles = message.guild!.roles.cache.map((role) => ["Ученик", "Support", "Преподаватель", "Skynet", "@everyone"].includes(role.name)?null:`\n<@&${role.id}>`);
        let repr = roles.sort().toString()
        message.channel.send(repr.replace(",,,,,", ","))
    }
}