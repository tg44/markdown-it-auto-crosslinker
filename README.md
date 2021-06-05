# Markdown-it auto-crosslinker

[![npm](https://img.shields.io/npm/v/markdown-it-auto-crosslinker)](https://www.npmjs.com/package/markdown-it-auto-crosslinker)

## Installation
```
npm --save i markdown-it-auto-crosslinker
```

## Usage

```js
const crosslinker = require('markdown-it-auto-crosslinker')
const md = require('markdown-it')()

const dictionary = {'/apple.md': ['apple', 'apples']}
  
md
  .use(crosslinker, {dictionary})
  .render('Test apples and apple in a string.')
//the same as 
md
  .render('Test [apples](/apple.md) and apple in a string.')
```

## What it does?
Wiki like pages, usually cross-links to each other. 
A good (wiki) page only links to another page at the first occurrence.
So if you have a wiki about fruits, when you mention apple in a page at first time, 
you want to link it to the corresponding page, but any more mentions should not appear as a link.

We can create a dictionary about where we want to link, and for what appearances we want to change links.

The plugin will get the links one-by-one, and change the first keyword in a document to a link. For every document.

No more missing links, everything is automatically cross-linked to each other!

## Options
### `dictionary`
**Default:** `{}`

An object where the key is the link, and the value is a key-word list.
```js
const dictionary = {
  '/apple.md': ['apple', 'apples'],
  '/pear.md': ['pear', 'pears'],
  '/fruit.md': ['fruit', 'fruits'],
}
```

### `wholeWords`
**Default:** `true`

Match to whole words.
```js
const dictionary = {'/berry.md': ['berry']}

md
  .use(crosslinker, {dictionary, wholeWords: true})
  .render('Test raspberry is a berry?')
//the same as 
md
  .render('Test raspberry is a [berry](/berry.md)?')

md
  .use(crosslinker, {dictionary, wholeWords: false})
  .render('Test raspberry is a berry?')
//the same as 
md
  .render('Test rasp[berry](/berry.md) is a berry?')
```
