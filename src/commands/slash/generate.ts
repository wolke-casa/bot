import axios, { AxiosResponse } from "axios";
import { Collections, Interaction } from "detritus-client";
import { MessageFlags } from "detritus-client/lib/constants";

import { BaseSlashCommand } from "../basecommand";

export default class GenerateCommand extends BaseSlashCommand {
	description = "Generate an API key for Wolke";
	name = "generate";
	guildIds = new Collections.BaseSet<string>(["919702722020798504"]);

	async run(context: Interaction.InteractionContext) {
		let errored = false;
		let response: AxiosResponse<any>;

		try {
			response = await axios({
				method: "POST",
				url: "http://localhost:8080/users/new",
				headers: { Authorization: process.env.TOKEN },
				data: {
					user: context.userId,
				},
			});
		} catch {
			errored = true;
		}

		if (errored) {
			return context.editOrRespond({
				content: "You already have an API key",
				flags: MessageFlags.EPHEMERAL,
			});
		}

		const data = response!.data;

		context.user.createMessage(
			`Don't share your token with anyone!\n\n${data["message"]}`
		);
		return context.editOrRespond({
			content: "DMed you your API key",
			flags: MessageFlags.EPHEMERAL,
		});
	}
}
