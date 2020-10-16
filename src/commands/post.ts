import { ICommand } from "../config";
import { Message } from "discord.js";
import * as league1 from "../../problem_codes1.json";
import * as league2 from "../../problem_codes2.json";

export default class PostProblem implements ICommand {
    public name = "post";
    public guildOnly = true;

    public async execute(message: Message, args: string[]) {
        let num  = args.shift();
        let secret  = args.shift();
        let problem = args.shift();
        let league: {
            teams: {
                teamcode: string;
                tasks: {
                    key: string;
                    value: string;
                }[];
            }[];
            problems: {
                key: string;
                value: string;
            }[];
        };
        if (secret == null || problem == null || num == null || !["1", "2"].includes(num!)) 
        { return message.reply("укажите лигу, код команды и код задачи, например: `!post 1 12345 112263`") }
        switch (num) {
            case "1":
                league = league1;
                break;
            case "2":
                league = league2;
                break;
        }
        await league!.teams.forEach((team) => {
            if (team.teamcode === secret) {
                team.tasks.forEach(task => {
                    if (task.key === problem) {
                        league.problems.forEach(kv => {
                            if (kv.key === task.value) {return message.reply(kv.value)}
                        })
                    }
                })
            }
        })
    };
}
