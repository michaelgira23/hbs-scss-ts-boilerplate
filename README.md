# Handlebars Sass TypeScript Boilerplate

Boilerplate for creating a simple static website using Handlebars, Sass, and Typescript.

[![Dependency Status](https://img.shields.io/david/michaelgira23/hbs-scss-ts-boilerplate.svg)](https://david-dm.org/michaelgira23/hbs-scss-ts-boilerplate)
[![Dev Dependency Status](https://img.shields.io/david/dev/michaelgira23/hbs-scss-ts-boilerplate.svg)](https://david-dm.org/michaelgira23/hbs-scss-ts-boilerplate?type=dev)

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
    +-- page1.hbs
    +-- page1.scss
    +-- page1.ts
+-- /page2
    +-- page2.hbs
    +-- page2.scss
    +-- page2.ts
+-- ...
```

**The Handlebars page must be the same name as the page directory name.** For example, `page1.hbs` must always be within the `/pages/page1` directory.

Here's an example Handlebars page (also located in [`/src/template.hbs`](https://github.com/michaelgira23/hbs-scss-ts-boilerplate/blob/master/src/template.hbs)):

```handlebars
---
title: Browser Title
meta:
  author: HTML meta author
  description: HTML meta description
  any other: meta you want
styles:
  - ./your
  - ./styles.scss
scripts:
  - ./your-cool-script.ts
---

{{#extend "base"}}
	{{#content "body"}}
		<!-- Your content goes here -->
	{{/content}}
{{/extend}}
```

At the top of the page, you can optionally have Yaml which is passed into the template. The base layout supports a `title`, `meta`, `styles`, and `scripts` variable, which will insert values into their respective part of the template. More information about templating can be found in the [`parcel-plugin-handlebars` README](https://github.com/robbiedigital/parcel-plugin-handlebars).

# Data in Template

You can stick JSON files in the `/src/data` directory and access these data within all the templates. For example:

In data:

```javascript
// src/data/example.json
{
	"todo": [
		"Design website",
		"Code it",
		"Deploy it"
	]
}
```

In template:

```html
<p>Things I need to do:</p>
<ol>
{{#each example.todo}}
	<li>{{this}}</li>
{{/each}}
</ol>
```

# Configuration

The web server does not automatically serve every generated page. Instead, you must add parameters to the config.

[`/config.ts`](https://github.com/michaelgira23/hbs-scss-ts-boilerplate/blob/master/config.ts)
```typescript
export const config: Config = {
	port: 2468,
	routes: {
		'/': 'home',
		'/page-1': 'page1'
	},
	// Either display dedicated 404 page
	404: '404page',
	// or redirect to URL
	redirect404: '/'
};

export interface Config {
	// Port number to run the web server on
	port: number;
	// Routes URLs passed to Express and the corresponding page name
	routes: { [url: string]: string };
	// Optional 404 page name
	404?: string;
	// Optional 404 redirect to URL
	redirect404?: string;
}
```

# Running

`npm start` - Watches for file changes and spins up web server
_(Note: Many times Parcel cannot detect included Handlebar partial changes, requiring you to re-`npm start` when changing the base layout.)_

`npm run build` - Builds files for production in the `/dist` directory.

`npm run server` - Start Express server for production

`npm run clean` - Deletes all build files

`npm run lint` - Lint TypeScript files

# Contributing

Found a bug? Think there's additional functionality that should be added? [Open up an issue!](https://github.com/michaelgira23/hbs-scss-ts-boilerplate/issues/new)
