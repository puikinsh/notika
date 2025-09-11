"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escape_regex = exports.getPattern = exports.substringsToPattern = exports.mapSequence = exports.generateMap = exports.generateSets = exports._asciifold = exports.asciifold = exports.normalize = exports.initialize = exports.unicode_map = exports.code_points = void 0;
exports.generator = generator;
const regex_ts_1 = require("./regex.js");
Object.defineProperty(exports, "escape_regex", { enumerable: true, get: function () { return regex_ts_1.escape_regex; } });
const strings_ts_1 = require("./strings.js");
exports.code_points = [[0, 65535]];
const accent_pat = '[\u0300-\u036F\u{b7}\u{2be}\u{2bc}]';
let multi_char_reg;
const max_char_length = 3;
const latin_convert = {};
const latin_condensed = {
    '/': '⁄∕',
    '0': '߀',
    "a": "ⱥɐɑ",
    "aa": "ꜳ",
    "ae": "æǽǣ",
    "ao": "ꜵ",
    "au": "ꜷ",
    "av": "ꜹꜻ",
    "ay": "ꜽ",
    "b": "ƀɓƃ",
    "c": "ꜿƈȼↄ",
    "d": "đɗɖᴅƌꮷԁɦ",
    "e": "ɛǝᴇɇ",
    "f": "ꝼƒ",
    "g": "ǥɠꞡᵹꝿɢ",
    "h": "ħⱨⱶɥ",
    "i": "ɨı",
    "j": "ɉȷ",
    "k": "ƙⱪꝁꝃꝅꞣ",
    "l": "łƚɫⱡꝉꝇꞁɭ",
    "m": "ɱɯϻ",
    "n": "ꞥƞɲꞑᴎлԉ",
    "o": "øǿɔɵꝋꝍᴑ",
    "oe": "œ",
    "oi": "ƣ",
    "oo": "ꝏ",
    "ou": "ȣ",
    "p": "ƥᵽꝑꝓꝕρ",
    "q": "ꝗꝙɋ",
    "r": "ɍɽꝛꞧꞃ",
    "s": "ßȿꞩꞅʂ",
    "t": "ŧƭʈⱦꞇ",
    "th": "þ",
    "tz": "ꜩ",
    "u": "ʉ",
    "v": "ʋꝟʌ",
    "vy": "ꝡ",
    "w": "ⱳ",
    "y": "ƴɏỿ",
    "z": "ƶȥɀⱬꝣ",
    "hv": "ƕ"
};
for (let latin in latin_condensed) {
    let unicode = latin_condensed[latin] || '';
    for (let i = 0; i < unicode.length; i++) {
        let char = unicode.substring(i, i + 1);
        latin_convert[char] = latin;
    }
}
const convert_pat = new RegExp(Object.keys(latin_convert).join('|') + '|' + accent_pat, 'gu');
/**
 * Initialize the unicode_map from the give code point ranges
 */
const initialize = (_code_points) => {
    if (exports.unicode_map !== undefined)
        return;
    exports.unicode_map = (0, exports.generateMap)(_code_points || exports.code_points);
};
exports.initialize = initialize;
/**
 * Helper method for normalize a string
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
 */
const normalize = (str, form = 'NFKD') => str.normalize(form);
exports.normalize = normalize;
/**
 * Remove accents without reordering string
 * calling str.normalize('NFKD') on \u{594}\u{595}\u{596} becomes \u{596}\u{594}\u{595}
 * via https://github.com/krisk/Fuse/issues/133#issuecomment-318692703
 */
const asciifold = (str) => {
    return Array.from(str).reduce(
    /**
     * @param {string} result
     * @param {string} char
     */
    (result, char) => {
        return result + (0, exports._asciifold)(char);
    }, '');
};
exports.asciifold = asciifold;
const _asciifold = (str) => {
    str = (0, exports.normalize)(str)
        .toLowerCase()
        .replace(convert_pat, (/** @type {string} */ char) => {
        return latin_convert[char] || '';
    });
    //return str;
    return (0, exports.normalize)(str, 'NFC');
};
exports._asciifold = _asciifold;
/**
 * Generate a list of unicode variants from the list of code points
 */
function* generator(code_points) {
    for (const [code_point_min, code_point_max] of code_points) {
        for (let i = code_point_min; i <= code_point_max; i++) {
            let composed = String.fromCharCode(i);
            let folded = (0, exports.asciifold)(composed);
            if (folded == composed.toLowerCase()) {
                continue;
            }
            // skip when folded is a string longer than 3 characters long
            // bc the resulting regex patterns will be long
            // eg:
            // folded صلى الله عليه وسلم length 18 code point 65018
            // folded جل جلاله length 8 code point 65019
            if (folded.length > max_char_length) {
                continue;
            }
            if (folded.length == 0) {
                continue;
            }
            yield { folded: folded, composed: composed, code_point: i };
        }
    }
}
/**
 * Generate a unicode map from the list of code points
 */
const generateSets = (code_points) => {
    const unicode_sets = {};
    const addMatching = (folded, to_add) => {
        /** @type {Set<string>} */
        const folded_set = unicode_sets[folded] || new Set();
        const patt = new RegExp('^' + (0, regex_ts_1.setToPattern)(folded_set) + '$', 'iu');
        if (to_add.match(patt)) {
            return;
        }
        folded_set.add((0, regex_ts_1.escape_regex)(to_add));
        unicode_sets[folded] = folded_set;
    };
    for (let value of generator(code_points)) {
        addMatching(value.folded, value.folded);
        addMatching(value.folded, value.composed);
    }
    return unicode_sets;
};
exports.generateSets = generateSets;
/**
 * Generate a unicode map from the list of code points
 * ae => (?:(?:ae|Æ|Ǽ|Ǣ)|(?:A|Ⓐ|Ａ...)(?:E|ɛ|Ⓔ...))
 */
const generateMap = (code_points) => {
    const unicode_sets = (0, exports.generateSets)(code_points);
    const unicode_map = {};
    let multi_char = [];
    for (let folded in unicode_sets) {
        let set = unicode_sets[folded];
        if (set) {
            unicode_map[folded] = (0, regex_ts_1.setToPattern)(set);
        }
        if (folded.length > 1) {
            multi_char.push((0, regex_ts_1.escape_regex)(folded));
        }
    }
    multi_char.sort((a, b) => b.length - a.length);
    const multi_char_patt = (0, regex_ts_1.arrayToPattern)(multi_char);
    multi_char_reg = new RegExp('^' + multi_char_patt, 'u');
    return unicode_map;
};
exports.generateMap = generateMap;
/**
 * Map each element of an array from its folded value to all possible unicode matches
 */
const mapSequence = (strings, min_replacement = 1) => {
    let chars_replaced = 0;
    strings = strings.map((str) => {
        if (exports.unicode_map[str]) {
            chars_replaced += str.length;
        }
        return exports.unicode_map[str] || str;
    });
    if (chars_replaced >= min_replacement) {
        return (0, regex_ts_1.sequencePattern)(strings);
    }
    return '';
};
exports.mapSequence = mapSequence;
/**
 * Convert a short string and split it into all possible patterns
 * Keep a pattern only if min_replacement is met
 *
 * 'abc'
 * 		=> [['abc'],['ab','c'],['a','bc'],['a','b','c']]
 *		=> ['abc-pattern','ab-c-pattern'...]
 */
const substringsToPattern = (str, min_replacement = 1) => {
    min_replacement = Math.max(min_replacement, str.length - 1);
    return (0, regex_ts_1.arrayToPattern)((0, strings_ts_1.allSubstrings)(str).map((sub_pat) => {
        return (0, exports.mapSequence)(sub_pat, min_replacement);
    }));
};
exports.substringsToPattern = substringsToPattern;
/**
 * Convert an array of sequences into a pattern
 * [{start:0,end:3,length:3,substr:'iii'}...] => (?:iii...)
 */
const sequencesToPattern = (sequences, all = true) => {
    let min_replacement = sequences.length > 1 ? 1 : 0;
    return (0, regex_ts_1.arrayToPattern)(sequences.map((sequence) => {
        let seq = [];
        const len = all ? sequence.length() : sequence.length() - 1;
        for (let j = 0; j < len; j++) {
            seq.push((0, exports.substringsToPattern)(sequence.substrs[j] || '', min_replacement));
        }
        return (0, regex_ts_1.sequencePattern)(seq);
    }));
};
/**
 * Return true if the sequence is already in the sequences
 */
const inSequences = (needle_seq, sequences) => {
    for (const seq of sequences) {
        if (seq.start != needle_seq.start || seq.end != needle_seq.end) {
            continue;
        }
        if (seq.substrs.join('') !== needle_seq.substrs.join('')) {
            continue;
        }
        let needle_parts = needle_seq.parts;
        const filter = (part) => {
            for (const needle_part of needle_parts) {
                if (needle_part.start === part.start && needle_part.substr === part.substr) {
                    return false;
                }
                if (part.length == 1 || needle_part.length == 1) {
                    continue;
                }
                // check for overlapping parts
                // a = ['::=','==']
                // b = ['::','===']
                // a = ['r','sm']
                // b = ['rs','m']
                if (part.start < needle_part.start && part.end > needle_part.start) {
                    return true;
                }
                if (needle_part.start < part.start && needle_part.end > part.start) {
                    return true;
                }
            }
            return false;
        };
        let filtered = seq.parts.filter(filter);
        if (filtered.length > 0) {
            continue;
        }
        return true;
    }
    return false;
};
class Sequence {
    parts;
    substrs;
    start;
    end;
    constructor() {
        this.parts = [];
        this.substrs = [];
        this.start = 0;
        this.end = 0;
    }
    add(part) {
        if (part) {
            this.parts.push(part);
            this.substrs.push(part.substr);
            this.start = Math.min(part.start, this.start);
            this.end = Math.max(part.end, this.end);
        }
    }
    last() {
        return this.parts[this.parts.length - 1];
    }
    length() {
        return this.parts.length;
    }
    clone(position, last_piece) {
        let clone = new Sequence();
        let parts = JSON.parse(JSON.stringify(this.parts));
        let last_part = parts.pop();
        for (const part of parts) {
            clone.add(part);
        }
        let last_substr = last_piece.substr.substring(0, position - last_part.start);
        let clone_last_len = last_substr.length;
        clone.add({ start: last_part.start, end: last_part.start + clone_last_len, length: clone_last_len, substr: last_substr });
        return clone;
    }
}
/**
 * Expand a regular expression pattern to include unicode variants
 * 	eg /a/ becomes /aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐɑAⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ/
 *
 * Issue:
 *  ﺊﺋ [ 'ﺊ = \\u{fe8a}', 'ﺋ = \\u{fe8b}' ]
 *	becomes:	ئئ [ 'ي = \\u{64a}', 'ٔ = \\u{654}', 'ي = \\u{64a}', 'ٔ = \\u{654}' ]
 *
 *	İĲ = IIJ = ⅡJ
 *
 * 	1/2/4
 */
const getPattern = (str) => {
    (0, exports.initialize)();
    str = (0, exports.asciifold)(str);
    let pattern = '';
    let sequences = [new Sequence()];
    for (let i = 0; i < str.length; i++) {
        let substr = str.substring(i);
        let match = substr.match(multi_char_reg);
        const char = str.substring(i, i + 1);
        const match_str = match ? match[0] : null;
        // loop through sequences
        // add either the char or multi_match
        let overlapping = [];
        let added_types = new Set();
        for (const sequence of sequences) {
            const last_piece = sequence.last();
            if (!last_piece || last_piece.length == 1 || last_piece.end <= i) {
                // if we have a multi match
                if (match_str) {
                    const len = match_str.length;
                    sequence.add({ start: i, end: i + len, length: len, substr: match_str });
                    added_types.add('1');
                }
                else {
                    sequence.add({ start: i, end: i + 1, length: 1, substr: char });
                    added_types.add('2');
                }
            }
            else if (match_str) {
                let clone = sequence.clone(i, last_piece);
                const len = match_str.length;
                clone.add({ start: i, end: i + len, length: len, substr: match_str });
                overlapping.push(clone);
            }
            else {
                // don't add char
                // adding would create invalid patterns: 234 => [2,34,4]
                added_types.add('3');
            }
        }
        // if we have overlapping
        if (overlapping.length > 0) {
            // ['ii','iii'] before ['i','i','iii']
            overlapping = overlapping.sort((a, b) => {
                return a.length() - b.length();
            });
            for (let clone of overlapping) {
                // don't add if we already have an equivalent sequence
                if (inSequences(clone, sequences)) {
                    continue;
                }
                sequences.push(clone);
            }
            continue;
        }
        // if we haven't done anything unique
        // clean up the patterns
        // helps keep patterns smaller
        // if str = 'r₨㎧aarss', pattern will be 446 instead of 655
        if (i > 0 && added_types.size == 1 && !added_types.has('3')) {
            pattern += sequencesToPattern(sequences, false);
            let new_seq = new Sequence();
            const old_seq = sequences[0];
            if (old_seq) {
                new_seq.add(old_seq.last());
            }
            sequences = [new_seq];
        }
    }
    pattern += sequencesToPattern(sequences, true);
    return pattern;
};
exports.getPattern = getPattern;
//# sourceMappingURL=index.js.map