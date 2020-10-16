import { ICommand } from "../config";
import { Message, Role } from "discord.js";

export default class Team implements ICommand {
    public name = "team";
    public aliases = [""];
    public guildOnly = true;

    public async execute(message: Message, args: string[]) {
        let action = args.shift();
        if (action == null) { return message.reply("Incorrect usage"); }

        let me = message.guild!.members.cache.find(u => u.id === message.client.user!.id)
        if (me!.roles.cache.find(r => r.name.includes("game"))) {
            return message.reply("Game has already started! If you want to change your team, contact server administrator.")
        }
        let role: Role | undefined;
        switch (action) {
            case "get":
                role = message.guild!.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLowerCase());
                if (!role) {
                    return message.reply(`такой команды не существует`)
                }
                if (role.permissions.has("ADMINISTRATOR")) { return message.reply("don't."); }
                message.member!.roles.add(role)
                break;
            case "rm":
            case "reset":
                role = message.member!.roles.cache.find(r => !r.name.includes("Ученик"));
                if (!role) {
                    return message.reply(`у вас ещё нет команды`)
                }
                message.member!.roles.remove(role)
                break;
            default:
                message.reply("incorrect usage");
        }

    }
}