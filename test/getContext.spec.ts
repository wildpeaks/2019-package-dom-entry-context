/* eslint-env node, browser */
import {getContext} from "../src/getContext";
import {strictEqual, deepStrictEqual} from "assert";
import {beforeEach, afterEach, describe, it} from "mocha";
const {JSDOM} = require("jsdom");

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

describe("getContext", () => {
	it(`Invalid ID ("fake")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="123"></div>`;
		const context = getContext("fake");
		strictEqual(typeof context, "undefined");
	});
	it(`Invalid ID ("")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="123"></div>`;
		const context = getContext("");
		strictEqual(typeof context, "undefined");
	});
	it(`Valid ID`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="123"></div>`;
		const context = getContext("mycontainer");
		strictEqual(typeof context, "object");
		if (context) {
			strictEqual(typeof context.element, "object");
			strictEqual(typeof context.data, "number");
			strictEqual(context.data, 123);
		}
	});
	it(`Missing Data`, () => {
		document.body.innerHTML = `<div id="mycontainer"></div>`;
		const context = getContext("mycontainer");
		strictEqual(typeof context, "object");
		if (context) {
			strictEqual(typeof context.element, "object");
			strictEqual(typeof context.data, "undefined");
		}
	});
	it(`Invalid Data ("")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context=""></div>`;
		const context = getContext("mycontainer");
		strictEqual(typeof context, "object");
		if (context) {
			strictEqual(typeof context.element, "object");
			strictEqual(typeof context.data, "undefined");
		}
	});
	it(`Invalid Data ("null")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="null"></div>`;
		const context = getContext("mycontainer");
		strictEqual(typeof context, "object");
		if (context) {
			strictEqual(typeof context.element, "object");
			strictEqual(typeof context.data, "undefined");
		}
	});
	it(`Invalid Data ("undefined")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="undefined"></div>`;
		const context = getContext("mycontainer");
		strictEqual(typeof context, "object");
		if (context) {
			strictEqual(typeof context.element, "object");
			strictEqual(typeof context.data, "undefined");
		}
	});
	it(`Invalid Data (not JSON)`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="NOT JSON"></div>`;
		const context = getContext("mycontainer");
		strictEqual(typeof context, "object");
		if (context) {
			strictEqual(typeof context.element, "object");
			strictEqual(typeof context.data, "undefined");
		}
	});
	it(`Valid Data (JSON Boolean)`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="true"></div>`;
		const context = getContext("mycontainer");
		strictEqual(typeof context, "object");
		if (context) {
			strictEqual(typeof context.element, "object");
			strictEqual(context.data, true);
		}
	});
	it(`Valid Data (JSON String)`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context='"123"'></div>`;
		const context = getContext("mycontainer");
		strictEqual(typeof context, "object");
		if (context) {
			strictEqual(typeof context.element, "object");
			strictEqual(context.data, "123");
		}
	});
	it(`Valid Data (JSON Object)`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context='{"hello": 123}'></div>`;
		const context = getContext("mycontainer");
		strictEqual(typeof context, "object");
		if (context) {
			strictEqual(typeof context.element, "object");
			deepStrictEqual(context.data, {hello: 123});
		}
	});
	it(`Invalid Property ("")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="111" data-myprop="222"></div>`;
		const context = getContext("mycontainer", "");
		strictEqual(typeof context, "object");
		if (context) {
			strictEqual(typeof context.element, "object");
			strictEqual(typeof context.data, "undefined");
		}
	});
	it(`Invalid Property ("fake")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="111" data-myprop="222"></div>`;
		const context = getContext("mycontainer", "fake");
		strictEqual(typeof context, "object");
		if (context) {
			strictEqual(typeof context.element, "object");
			strictEqual(typeof context.data, "undefined");
		}
	});
	it(`Valid Property ("data-myprop")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="111" data-myprop="222"></div>`;
		const context = getContext("mycontainer", "data-myprop");
		strictEqual(typeof context, "object");
		if (context) {
			strictEqual(typeof context.element, "object");
			strictEqual(context.data, 222);
		}
	});
	it(`Valid Property ("myprop")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="111" myprop="222"></div>`;
		const context = getContext("mycontainer", "myprop");
		strictEqual(typeof context, "object");
		if (context) {
			strictEqual(typeof context.element, "object");
			strictEqual(context.data, 222);
		}
	});
});
