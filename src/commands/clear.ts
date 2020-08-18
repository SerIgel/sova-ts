import { ICommand } from "../config";
import { Message, TextChannel } from "discord.js";

export default class Clear implements ICommand {
    public name = "clear";
    public aliases = [""];
    public sudo = true;
    public guildOnly = true;
    public async execute(message: Message, args: string[]) {
        let amount = parseInt(args[0])  ;
        
        if (!amount) { return message.delete(); }
        await message.delete()
        const clear = (async () => {
            await message.channel.messages.fetch({limit: amount})
            .then(messages => { 
                (message.channel as TextChannel).bulkDelete(messages)})
            ;
        })()
	}
}