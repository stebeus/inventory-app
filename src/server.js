import { app } from './app.js';
import { PORT } from './config.js';
import { logger } from './lib/pino-http.js';

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
