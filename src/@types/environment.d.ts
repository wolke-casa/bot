declare namespace NodeJS {
	export interface ProcessEnv {
		TOKEN: string;
		DATABASE_URL: string;
		API_URL: string;
		SECRET: string;
	}
}
