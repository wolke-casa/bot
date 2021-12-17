import axios, { AxiosResponse } from "axios";
import { Collections, Interaction } from "detritus-client";
import { MessageFlags } from "detritus-client/lib/constants";

import { BaseSlashCommand } from "../basecommand";
import { API_ENDPOINTS } from "../../constants";

export default class GenerateCommand extends BaseSlashCommand {
	description = "Generate an API key for Wolke";
	name = "generate";
	// guildIds = new Collections.BaseSet<string>(["919702722020798504"]);

	async run(context: Interaction.InteractionContext) {
		let errored = false;
		let response: AxiosResponse<any>;

		try {
			response = await axios({
				method: "POST",
				url: `${process.env.API_URL}${API_ENDPOINTS.NEW_USER}`,
				headers: { Authorization: process.env.TOKEN },
				data: {
					user: context.userId,
				},
			});
		} catch {
			errored = true;
		}

		// TODO: We should be explicit with the errors and tell the user if the API is down or if they already have a key
		if (errored) {
			return context.editOrRespond({
				content: "API error... maybe you already have an API key.",
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
