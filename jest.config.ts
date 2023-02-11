import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
	return {
		verbose: true,
		transform: {
			"^.+\\.(t|j)s$": "ts-jest",
		},
		testRegex: "\\.spec\\.[tj]s?$",
		testEnvironment: "node",
		rootDir: ".",
		moduleFileExtensions: ["ts", "js"],
	};
};
