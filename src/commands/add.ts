import { ICommand } from "../config";
import { Message } from "discord.js";

export default class Add implements ICommand {
    public name = "add";
    public guildOnly = true;
    public sudo = true;
    public async execute(message: Message, args: string[]) {
        let role;
        let cat;
        switch (args[0]) {
            case "group":
                if (!args[1]) { return message.reply("укажите имя группы") }
                args.shift();
                if (!args[0].match(/^\d/)) { return message.reply("имя группы должно начинаться с цифры") }
                role = await message.guild!.roles.create({
                    data: {
                        name: `${args.join(' ')}`
                    },
                })
                role.setPosition(1, { relative: true })

                cat = await message.guild!.channels.create(`${args.join(' ')}`, {
                    type: "category"
                })
                await cat.updateOverwrite(cat.guild.roles.everyone, { VIEW_CHANNEL: false });
                await cat.updateOverwrite(role, { VIEW_CHANNEL: true })
                message.guild!.channels.create("чат", {
                    type: "text",
                    parent: cat.id,
                }).then(async m => await m.lockPermissions())
                message.guild!.channels.create("очередь", {
                    type: "text",
                    parent: cat.id,
                }).then(async m => await m.lockPermissions())
                message.guild!.channels.create("общий", {
                    type: "voice",
                    parent: cat.id,
                    bitrate: 64000,
                }).then(async m => await m.lockPermissions())
                message.guild!.channels.create("очередь", {
                    type: "voice",
                    parent: cat.id,
                    bitrate: 64000,
                }).then(async m => await m.lockPermissions())
                for (let i = 1; i <= 5; i++) {
                    message.guild!.channels.create(i.toString(), {
                        type: "voice",
                        parent: cat.id,
                        bitrate: 64000,
                        userLimit: 2,
                    }).then(async m => await m.lockPermissions())
                }
                break;
                
            case "team":
                if (!args[1]) { return message.reply("укажите номер команды") }
                role = await message.guild!.roles.create({
                    data: {
                        name: `Команда ${args[1]}`
                    },
                })
                role.setPosition(1, { relative: true })
                cat = await message.guild!.channels.create(`Команда ${args[1]}`, {
                    type: "category"
                })
                await cat.updateOverwrite(cat.guild.roles.everyone, { VIEW_CHANNEL: false });
                await cat.updateOverwrite(role, { VIEW_CHANNEL: true })
                message.guild!.channels.create("чат", {
                    type: "text",
                    parent: cat.id,
                }).then(async m => await m.lockPermissions())
                message.guild!.channels.create("общий", {
                    type: "voice",
                    parent: cat.id,
                    bitrate: 64000,
                }).then(async m => await m.lockPermissions())
        }
    }
}