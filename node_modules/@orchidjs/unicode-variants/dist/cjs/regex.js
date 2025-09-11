"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unicodeLength = exports.maxValueLength = exports.escape_regex = exports.hasDuplicates = exports.setToPattern = exports.sequencePattern = exports.arrayToPattern = void 0;
/**
 * Convert array of strings to a regular expression
 *	ex ['ab','a'] => (?:ab|a)
 * 	ex ['a','b'] => [ab]
 */
const arrayToPattern = (chars) => {
    chars = chars.filter(Boolean);
    if (chars.length < 2) {
        return chars[0] || '';
    }
    return ((0, exports.maxValueLength)(chars) == 1) ? '[' + chars.join('') + ']' : '(?:' + chars.join('|') + ')';
};
exports.arrayToPattern = arrayToPattern;
const sequencePattern = (array) => {
    if (!(0, exports.hasDuplicates)(array)) {
        return array.join('');
    }
    let pattern = '';
    let prev_char_count = 0;
    const prev_pattern = () => {
        if (prev_char_count > 1) {
            pattern += '{' + prev_char_count + '}';
        }
    };
    array.forEach((char, i) => {
        if (char === array[i - 1]) {
            prev_char_count++;
            return;
        }
        prev_pattern();
        pattern += char;
        prev_char_count = 1;
    });
    prev_pattern();
    return pattern;
};
exports.sequencePattern = sequencePattern;
/**
 * Convert array of strings to a regular expression
 *	ex ['ab','a'] => (?:ab|a)
 * 	ex ['a','b'] => [ab]
 */
const setToPattern = (chars) => {
    let array = Array.from(chars);
    return (0, exports.arrayToPattern)(array);
};
exports.setToPattern = setToPattern;
/**
 * https://stackoverflow.com/questions/7376598/in-javascript-how-do-i-check-if-an-array-has-duplicate-values
 */
const hasDuplicates = (array) => {
    return (new Set(array)).size !== array.length;
};
exports.hasDuplicates = hasDuplicates;
/**
 * https://stackoverflow.com/questions/63006601/why-does-u-throw-an-invalid-escape-error
 */
const escape_regex = (str) => {
    return (str + '').replace(/([\$\(\)\*\+\.\?\[\]\^\{\|\}\\])/gu, '\\$1');
};
exports.escape_regex = escape_regex;
/**
 * Return the max length of array values
 */
const maxValueLength = (array) => {
    return array.reduce((longest, value) => Math.max(longest, (0, exports.unicodeLength)(value)), 0);
};
exports.maxValueLength = maxValueLength;
const unicodeLength = (str) => {
    return Array.from(str).length;
};
exports.unicodeLength = unicodeLength;
//# sourceMappingURL=regex.js.map