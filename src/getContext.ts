/* eslint-env browser */
export type Context = {
	element: HTMLElement;
	data?: any;
};

/**
 * Reads JSON-encoded data from a named HTMLElement attribute.
 * @param  elementId  Unique ID of the HTMLElement
 * @param  propertyId  Property of element to read from
 */
export function getContext(elementId: string, propertyId: string = "data-context"): Context | undefined {
	let context;
	const element = document.getElementById(elementId);
	if (element) {
		let data;
		try {
			const raw = element.getAttribute(propertyId);
			if (raw !== null) {
				data = JSON.parse(raw);
			}
		} catch (e) {
			data = null;
		}
		context = data === null ? {element} : {element, data};
	}
	return context;
}
