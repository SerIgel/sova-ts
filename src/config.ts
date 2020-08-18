import { Message } from "discord.js";

export interface IConfig {
    token: string
    prefix: string
    admin: string[]
    group: string[]
}

export interface ICommand {
    name: string
    aliases?: string[]
    sudo?: boolean
    guildOnly?: boolean
    args?: boolean
    usage?: string
    execute(message: Message, args: string[]): void
}