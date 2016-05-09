/* eslint no-constant-condition:0, no-param-reassign:0 */
'use strict';

var cache = [
  '',
  ' ',
  '  ',
  '   ',
  '    ',
  '     ',
  '      ',
  '       ',
  '        ',
  '         '
];

function rightPad(options) {
  var ch = options.characterToPadWith;
  var len = options.lengthToPad;
  var str = options.stringToPad;

  var pad;

  // convert `str` to `string`
  str = str + '';

  // doesn't need to pad
  len = len - str.length;
  if (len <= 0) return str;

  // convert `ch` to `string`
  if (!ch && ch !== 0) ch = ' ';
  ch = ch + '';
  if (ch === ' ' && len < 10) return str + cache[len];
  pad = '';
  while (true) {
    if (len & 1) pad += ch;
    len >>= 1;
    if (len) ch += ch;
    else break;
  }
  return str + pad;
}

module.exports = rightPad;
