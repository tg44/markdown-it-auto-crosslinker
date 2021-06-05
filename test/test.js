const crosslinker = require('../index')
const md = require('markdown-it')

/*
  This is not a test test, only for demonstration purposes!
*/

const dictionary = {
  '/apple.md': ['apple', 'apples'],
  '/pear.md': ['pear', 'pears'],
  '/fruit.md': ['fruit', 'fruits'],
  '/orange.md': ['orange'],
  '/berry.md': ['berry']
}

const ex1 = md()
  .use(crosslinker, {dictionary})
  .render('Test apples and apple in a string.')
//the same as
const ex1ref = md()
  .render('Test [apples](/apple.md) and apple in a string.')

//console.log(ex1)
console.log(ex1 === ex1ref)

const ex2 = md()
  .use(crosslinker, {dictionary})
  .render('apple, apples, oranges, orange, orange, fruit, pear, pears, berry')
//the same as
const ex2ref = md()
  .render('[apple](/apple.md), apples, oranges, [orange](/orange.md), orange, [fruit](/fruit.md), [pear](/pear.md), pears, [berry](/berry.md)')

//console.log(ex2)
console.log(ex2 === ex2ref)

const ex3 =md()
  .use(crosslinker, {dictionary, wholeWords: true})
  .render('Test raspberry is a berry?')
//the same as
const ex3ref = md()
  .render('Test raspberry is a [berry](/berry.md)?')

//console.log(ex3)
console.log(ex3 === ex3ref)

const ex4 =md()
  .use(crosslinker, {dictionary, wholeWords: false})
  .render('Test raspberry is a berry?')
//the same as
const ex4ref = md()
  .render('Test rasp[berry](/berry.md) is a berry?')

//console.log(ex4)
console.log(ex4 === ex4ref)
