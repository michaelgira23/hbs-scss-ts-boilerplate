import * as fs from 'fs';
import * as path from 'path';

export const pagesPath = path.join(__dirname, 'src', 'pages');

export function getPages () {
	return fs.readdirSync(pagesPath);
}
