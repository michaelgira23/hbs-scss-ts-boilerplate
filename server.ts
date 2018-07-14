const port = 2468;

import * as express from 'express';
import * as path from 'path';

const app = express();

function serve(res: express.Response, pageName: string, httpCode = 200) {
	res.status(httpCode).sendFile(path.join(__dirname, 'dist', pageName, `${pageName}.html`));
}

app.use(express.static(path.join(__dirname, 'dist')));

app.get(`/`, (_, res) => {
	serve(res, 'home');
});

app.use((_, res, __) => {
	serve(res, '404', 404);
});

app.listen(port, () => console.log(`Server is listening on *:${port}`));
