import createHttpError from 'http-errors';

const handleNotFoundError = (req, res, next) => next(createHttpError(404));

const handleError = (error, req, res, next) => {
	if (res.headersSent) return next(error);

	const { status = 500, message = 'Internal Server Error' } = error;
	const nodeEnv = req.app.get('env');

	console.error(error);

	res
		.status(status)
		.render('error', { title: `${status} - ${message}`, error, nodeEnv });
};

export { handleError, handleNotFoundError };
