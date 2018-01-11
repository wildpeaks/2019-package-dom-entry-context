/* eslint-env node, browser, jasmine */
import {getContext} from '../src/getContext';

// @ts-ignore
import {JSDOM} from 'jsdom';


describe('getContext', () => {
	beforeEach(() => {
		const dom = new JSDOM(`<!DOCTYPE html>`);
		// @ts-ignore
		global.window = dom.window;
		// @ts-ignore
		global.document = dom.window.document;
	});
	afterEach(() => {
		// @ts-ignore
		delete global.window;
		// @ts-ignore
		delete global.document;
	});

	it(`Invalid ID ("fake")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="123"></div>`;
		const context = getContext('fake');
		expect(typeof context).toBe('undefined');
	});
	it(`Invalid ID ("")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="123"></div>`;
		const context = getContext('');
		expect(typeof context).toBe('undefined');
	});

	it(`Valid ID`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="123"></div>`;
		const context = getContext('mycontainer');
		expect(typeof context).toBe('object');
		if (context){
			expect(typeof context.element).toBe('object');
			expect(typeof context.data).toBe('number');
			expect(context.data).toBe(123);
		}
	});

	it(`Missing Data`, () => {
		document.body.innerHTML = `<div id="mycontainer"></div>`;
		const context = getContext('mycontainer');
		expect(typeof context).toBe('object');
		if (context){
			expect(typeof context.element).toBe('object');
			expect(typeof context.data).toBe('undefined');
		}
	});
	it(`Invalid Data ("")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context=""></div>`;
		const context = getContext('mycontainer');
		expect(typeof context).toBe('object');
		if (context){
			expect(typeof context.element).toBe('object');
			expect(typeof context.data).toBe('undefined');
		}
	});
	it(`Invalid Data ("null")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="null"></div>`;
		const context = getContext('mycontainer');
		expect(typeof context).toBe('object');
		if (context){
			expect(typeof context.element).toBe('object');
			expect(typeof context.data).toBe('undefined');
		}
	});
	it(`Invalid Data ("undefined")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="undefined"></div>`;
		const context = getContext('mycontainer');
		expect(typeof context).toBe('object');
		if (context){
			expect(typeof context.element).toBe('object');
			expect(typeof context.data).toBe('undefined');
		}
	});
	it(`Invalid Data (not JSON)`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="NOT JSON"></div>`;
		const context = getContext('mycontainer');
		expect(typeof context).toBe('object');
		if (context){
			expect(typeof context.element).toBe('object');
			expect(typeof context.data).toBe('undefined');
		}
	});

	it(`Valid Data (JSON Boolean)`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="true"></div>`;
		const context = getContext('mycontainer');
		expect(typeof context).toBe('object');
		if (context){
			expect(typeof context.element).toBe('object');
			expect(context.data).toBe(true);
		}
	});
	it(`Valid Data (JSON String)`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context='"123"'></div>`;
		const context = getContext('mycontainer');
		expect(typeof context).toBe('object');
		if (context){
			expect(typeof context.element).toBe('object');
			expect(context.data).toBe('123');
		}
	});
	it(`Valid Data (JSON Object)`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context='{"hello": 123}'></div>`;
		const context = getContext('mycontainer');
		expect(typeof context).toBe('object');
		if (context){
			expect(typeof context.element).toBe('object');
			expect(context.data).toEqual({hello: 123});
		}
	});

	it(`Invalid Property ("")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="111" data-myprop="222"></div>`;
		const context = getContext('mycontainer', '');
		expect(typeof context).toBe('object');
		if (context){
			expect(typeof context.element).toBe('object');
			expect(typeof context.data).toBe('undefined');
		}
	});
	it(`Invalid Property ("fake")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="111" data-myprop="222"></div>`;
		const context = getContext('mycontainer', 'fake');
		expect(typeof context).toBe('object');
		if (context){
			expect(typeof context.element).toBe('object');
			expect(typeof context.data).toBe('undefined');
		}
	});
	it(`Valid Property ("data-myprop")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="111" data-myprop="222"></div>`;
		const context = getContext('mycontainer', 'data-myprop');
		expect(typeof context).toBe('object');
		if (context){
			expect(typeof context.element).toBe('object');
			expect(context.data).toBe(222);
		}
	});
	it(`Valid Property ("myprop")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="111" myprop="222"></div>`;
		const context = getContext('mycontainer', 'myprop');
		expect(typeof context).toBe('object');
		if (context){
			expect(typeof context.element).toBe('object');
			expect(context.data).toBe(222);
		}
	});
});
