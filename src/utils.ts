import { IDictionary } from './interfaces';

/**
 * Iterate over the input list and check whether or not all members
 * of an object are or can be parsed into moment.js objects. If any
 * value cannot be parsed return false, otherwise true.
 *
 * @param {IDictionary[]} list - list of objects to analyze
 * @param {string} parameter - the field of a map object for which each map is checked
 * @returns {boolean}
 *
 */
export function isMomentParameter(list: Array<IDictionary<any>>, parameter: string) {
  const isMoment: boolean = !list.some((listItem) => !moment(listItem[parameter]).isValid());
  return isMoment;
}

/**
 * Iterate over the input list and check whether or not all members
 * of an object are or can be converted to numbers. If any value cannot
 * be converted return false, otherwise true.
 *
 * @param {Array<IDictionary<any>>} list - list of dictionaries
 * @param {string} parameter - the field of a map object for which each map is checked
 * @returns {boolean}
 *
 */
export function isNumberParameter(list: Array<IDictionary<any>>, parameter: string) {
  return !list.some((listItem) => isNaN(Number(listItem[parameter])));
}

export function debounce(func: any, wait: any, immediate=false): any {
	let timeout: any;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};