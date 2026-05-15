import { env, loadEnvFile } from 'node:process';

try {
	loadEnvFile();
} catch (error) {
	if (error.code !== 'ENOENT') throw error;
}

const { PORT, DB_URL } = env;

export { DB_URL, PORT };
