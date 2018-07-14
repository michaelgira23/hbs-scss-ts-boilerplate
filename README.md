# EJS Scss TypeScript Boilerplate

Boilerplate for creating a simple static website using EJS, Sass, and Typescript.

[![Dependency Status](https://img.shields.io/david/michaelgira23/ejs-scss-ts-boilerplate.svg)](https://david-dm.org/michaelgira23/ejs-scss-ts-boilerplate)
[![Dev Dependency Status](https://img.shields.io/david/dev/michaelgira23/ejs-scss-ts-boilerplate.svg)](https://david-dm.org/michaelgira23/ejs-scss-ts-boilerplate?type=dev)

# Installation

Clone this repository and run:

```
$ npm install
```

# Usage

## Creating a Page

This is a basic structure of a page located in `/src/pages`:

```
/pages
+-- /page1
    +-- page1.ejs
    +-- page1.scss
    +-- page1.ts
+-- /page2
    +-- page2.ejs
    +-- page2.scss
    +-- page2.ts
+-- ...
```

**The EJS page must be the same name as the page directory name.** For example, `page1.ejs` must always be within the `/pages/page1` directory.

Here's an example EJS page (also located in [`/src/template.ejs`](https://github.com/michaelgira23/ejs-scss-ts-boilerplate/blob/master/src/template.ejs)):

```html
<%- include('../../partials/header', { title: 'Browser Title', styles: ['./your', './styles.scss'] }) -%>

<!-- Your content goes here -->

<script src="./your-cool-script.ts"></script>
<%- include('../../partials/footer') -%>
```

Including the `header` and `footer` partials are a convenient way reuse code such as browser `<head>` tags.

While including the header partial, you can optionally pass in a few parameters:
- `title` - A string to set the browser's `<title>`
- `styles` - An array of strings of paths pointing to your Sass stylings (relative to the current EJS file).

# Configuration

The web server does not automatically serve every generated page. Instead, you must add parameters to the config.

[`/config.ts`](https://github.com/michaelgira23/ejs-scss-ts-boilerplate/blob/master/config.ts)
```typescript
export const config: Config = {
	// Port number to run the web server on
	port: 2468,
	// Routes URLs passed to Express and the corresponding page name
	routes: {
		'/': 'home',
		'/page-1': 'page1'
	},
	// Optional 404 page name
	404: '404'
};

export interface Config {
	port: number;
	routes: { [url: string]: string };
	404?: string;
}
```

# Running

`npm start` - Watches for file changes and spins up web server
_(Note: Many times Parcel cannot detect included EJS partial changes, requiring you to re-`npm start` when changing header or footer.)_

`npm run build` - Builds files for production in the `/dist` directory.

`npm run server` - Start Express server for production

`npm run clean` - Deletes all build files

`npm run lint` - Lint TypeScript files

# Contributing

Found a bug? Think there's additional functionality that should be added? [Open up an issue!](https://github.com/michaelgira23/ejs-scss-ts-boilerplate/issues/new)
