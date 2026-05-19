import { env, loadEnvFile } from 'node:process';

try {
	loadEnvFile();
} catch (error) {
	if (error.code !== 'ENOENT') throw error;
}

const { DB_URL, HOSTNAME = 'localhost', NODE_ENV, PORT = 3000 } = env;

export { DB_URL, HOSTNAME, NODE_ENV, PORT };
