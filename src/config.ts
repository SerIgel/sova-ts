import { Message } from "discord.js";

export interface IConfig {
    token: string
    prefix: string
    admin: string[]
    groupChannel: string[]
}

export interface ICommand {
    name: string
    aliases?: string[]
    sudo?: boolean
    guildOnly?: boolean
    groupOnly?: boolean
    args?: boolean
    usage?: string
    execute(message: Message, args: string[]): void
}