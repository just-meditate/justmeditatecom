# Just Meditate

## Install

The site is built using [Hugo](https://gohugo.io). Which can be installed via
`brew`, `choco`, or `apt-get`. But for a more comprehensive installation guide,
visit the [Install Hugo](https://gohugo.io/getting-started/installing/) doc.

To install all othe dependencies, run `npm install` at the root of the repo.

## Run

There are several build commands you can run to get started.

- `npm run start` - will transpile all JS via the Babel cli utility and then run
  the local server.
- `npm run build` - will run babel and build the production version of the site.
  The output will be located in the `/public` directory.
- `npm run build:development` - will do the same as the regular `build` command
  but with the `development` env variable. This will disable a few things on the
  output like robots and analytics.
- `npm run js` - will run the Babel cli utility which transpiles all the JS
  files found inside the `/assets/js/` directory, into a single file in
  `/assets/js/scripts.js`.

## Dev Env

- Sass is used for styling and alyout.
- PostCSS handles cross-browser support.
- Hugo takes care of Sass and PostCSS with the help of [Pipes](https://gohugo.io/hugo-pipes/scss-sass/).
- JS is written using modern ES6.
- Babel CLI transpiles all JS on build time.
- Browserlist has a list of the covered browsers in the `package.json`.

Enviroment varibales are also used in the build commands to conditionally
rendered certain code. Stuff like `robots.txt` and analytics in the Head. You
can do this by wrapping code inside this:

```html
{{ if hugo.Environment | eq "production" }} {{ end }}
```

Where the `"production"` string can be whatever enviroment flag you want to use.
For Just Meditate, **production** and **development** are used.
