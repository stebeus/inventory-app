import { join } from 'node:path';

import express from 'express';

import { handleError, handleNotFoundError } from './controllers/error.js';
import { form } from './routers/form.js';
import { index } from './routers/index.js';
import { item } from './routers/item.js';
import { manageCategories } from './routers/manage-categories.js';
import { search } from './routers/search.js';

const app = express();

const { dirname } = import.meta;
const viewsPath = join(dirname, 'views');

app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(index);
app.use(form);
app.use(item);
app.use(manageCategories);
app.use(search);

app.use(handleNotFoundError);
app.use(handleError);

export { app };
