const port = 2468;

import * as express from 'express';
import * as path from 'path';
// import { getPages } from './pages';

const app = express();

// const pages = getPages();

app.use(express.static(path.join(__dirname, 'dist')));

app.get(`/`, (_, res) => {
	res.sendFile(path.join(__dirname, 'dist', `home.html`));
});

app.listen(port, () => console.log(`Server is listening on *:${port}`));
