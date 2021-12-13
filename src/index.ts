import "dotenv/config";

import { InteractionCommandClient } from "detritus-client";
import ts from "typescript";

const interactionClient = new InteractionCommandClient(process.env.TOKEN);

interactionClient.addMultipleIn("./commands");

(async () => {
	const client = await interactionClient.run();

	console.log(`Bot started 🚀
	Bot:
	: Shard Count : ${client.shardCount}
	Env:
	: TypeScript  : v${ts.version}
	: NodeJS      : ${process.version}	
`);
})();
