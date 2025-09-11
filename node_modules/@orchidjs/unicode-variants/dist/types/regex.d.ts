/**
 * Convert array of strings to a regular expression
 *	ex ['ab','a'] => (?:ab|a)
 * 	ex ['a','b'] => [ab]
 */
export declare const arrayToPattern: (chars: string[]) => string;
export declare const sequencePattern: (array: string[]) => string;
/**
 * Convert array of strings to a regular expression
 *	ex ['ab','a'] => (?:ab|a)
 * 	ex ['a','b'] => [ab]
 */
export declare const setToPattern: (chars: Set<string>) => string;
/**
 * https://stackoverflow.com/questions/7376598/in-javascript-how-do-i-check-if-an-array-has-duplicate-values
 */
export declare const hasDuplicates: (array: any[]) => boolean;
/**
 * https://stackoverflow.com/questions/63006601/why-does-u-throw-an-invalid-escape-error
 */
export declare const escape_regex: (str: string) => string;
/**
 * Return the max length of array values
 */
export declare const maxValueLength: (array: string[]) => number;
export declare const unicodeLength: (str: string) => number;
