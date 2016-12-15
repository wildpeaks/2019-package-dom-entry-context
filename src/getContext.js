'use strict';
/* eslint-env browser */

/**
 * @module  @wildpeaks/dom-entry-context
 * @param  {String} id  Unique ID of the HTMLElement
 * @return {Object}
 */
module.exports = id => {
	let context = false;
	if (typeof id === 'string'){
		const element = document.getElementById(id);
		if (element){
			let data;
			try {
				data = JSON.parse(element.getAttribute('data-context'));
			} catch (e){
				data = null;
			}
			if (data !== null){
				context = {element, data};
			}
		}
	}
	return context;
};
