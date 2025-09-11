import { escape_regex } from './regex.ts';
export type TUnicodeMap = {
    [key: string]: string;
};
export type TUnicodeSets = {
    [key: string]: Set<string>;
};
export type TCodePoints = [[number, number]];
export type TCodePointObj = {
    folded: string;
    composed: string;
    code_point: number;
};
export type TSequencePart = {
    start: number;
    end: number;
    length: number;
    substr: string;
};
export declare const code_points: TCodePoints;
export declare let unicode_map: TUnicodeMap;
/**
 * Initialize the unicode_map from the give code point ranges
 */
export declare const initialize: (_code_points?: TCodePoints) => void;
/**
 * Helper method for normalize a string
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
 */
export declare const normalize: (str: string, form?: string) => string;
/**
 * Remove accents without reordering string
 * calling str.normalize('NFKD') on \u{594}\u{595}\u{596} becomes \u{596}\u{594}\u{595}
 * via https://github.com/krisk/Fuse/issues/133#issuecomment-318692703
 */
export declare const asciifold: (str: string) => string;
export declare const _asciifold: (str: string) => string;
/**
 * Generate a list of unicode variants from the list of code points
 */
export declare function generator(code_points: TCodePoints): Generator<TCodePointObj>;
/**
 * Generate a unicode map from the list of code points
 */
export declare const generateSets: (code_points: TCodePoints) => TUnicodeSets;
/**
 * Generate a unicode map from the list of code points
 * ae => (?:(?:ae|Æ|Ǽ|Ǣ)|(?:A|Ⓐ|Ａ...)(?:E|ɛ|Ⓔ...))
 */
export declare const generateMap: (code_points: TCodePoints) => TUnicodeMap;
/**
 * Map each element of an array from its folded value to all possible unicode matches
 */
export declare const mapSequence: (strings: string[], min_replacement?: number) => string;
/**
 * Convert a short string and split it into all possible patterns
 * Keep a pattern only if min_replacement is met
 *
 * 'abc'
 * 		=> [['abc'],['ab','c'],['a','bc'],['a','b','c']]
 *		=> ['abc-pattern','ab-c-pattern'...]
 */
export declare const substringsToPattern: (str: string, min_replacement?: number) => string;
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
export declare const getPattern: (str: string) => string | undefined;
export { escape_regex };
