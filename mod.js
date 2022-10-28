import {jevkoToPrettyString} from 'https://cdn.jsdelivr.net/gh/jevko/jevkoutils.js@v0.1.6/mod.js'

// params: max depth, min depth, allow/disallow nonempty suffixes, max length subs, max length text

const genJevko = (rng = makeRng()) => {
  const length = rng()*3|0

  const subjevkos = []
  for (let i = 0; i < length; ++i) {
    subjevkos.push(genSubjevko(rng))
  }

  const suffix = genText(rng)
  
  return {subjevkos, suffix}

}

const genSubjevko = (rng) => {
  const prefix = genText(rng)
  const jevko = genJevko(rng)

  return {prefix, jevko}
}

const openerCode = '['.codePointAt(0)
const closerCode = ']'.codePointAt(0)
const escaperCode = '`'.codePointAt(0)
const genText = (rng) => {  
  const length = rng()*10|0

  const codes = []
  for (let i = 0; i < length; ++i) {
    const code = (65 + rng()*60)|0
    if (code === openerCode || code === closerCode || code === escaperCode) codes.push(escaperCode)
    codes.push(code)
  }

  return String.fromCodePoint(...codes)
}

// Mulberry32 from https://stackoverflow.com/a/47593316/7379821
const makeRng = (seed = Date.now()) => () => {
  var t = seed += 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

const rng = makeRng()
for (let i = 0; i < 1; ++i) {
  console.log(jevkoToPrettyString(genJevko(rng)))
}