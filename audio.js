#!/usr/bin/env node

const { readdirSync } = require('fs');
const replace = require('replace-in-file');

// Read directory function
const readDir = dir =>
readdirSync(dir, (err, files) => {
  if (err) throw err;
  return files;
});
// Get audio tracks and return array of files
const tracks = readDir(`${__dirname}/assets/audio`);
// Get random file
const file = tracks[Math.floor(Math.random()*tracks.length)];

// Pass Replace option
const options = {
  files: [
    'layouts/partials/audio.html',
  ],
  from: /(src="{{ \$)([a-z]{4,6})/g,
  to: `$1${file.replace('.mp3', '')}`,
};

// Run replace function
replace(options, (error, changes) => {
  if (error) {
    return console.error('Error occurred:', error);
  }
  console.log('Modified file:', changes[0].file);
})
