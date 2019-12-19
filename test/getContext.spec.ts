/* eslint-env node, browser, mocha */
import {getContext} from "../src/getContext";
import {strictEqual, deepStrictEqual} from "assert";
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
		const ctx = getContext("fake");
		strictEqual(typeof ctx, "undefined");
	});
	it(`Invalid ID ("")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="123"></div>`;
		const ctx = getContext("");
		strictEqual(typeof ctx, "undefined");
	});
	it(`Valid ID`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="123"></div>`;
		const ctx = getContext("mycontainer");
		strictEqual(typeof ctx, "object");
		if (ctx) {
			strictEqual(typeof ctx.element, "object");
			strictEqual(typeof ctx.data, "number");
			strictEqual(ctx.data, 123);
		}
	});
	it(`Missing Data`, () => {
		document.body.innerHTML = `<div id="mycontainer"></div>`;
		const ctx = getContext("mycontainer");
		strictEqual(typeof ctx, "object");
		if (ctx) {
			strictEqual(typeof ctx.element, "object");
			strictEqual(typeof ctx.data, "undefined");
		}
	});
	it(`Invalid Data ("")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context=""></div>`;
		const ctx = getContext("mycontainer");
		strictEqual(typeof ctx, "object");
		if (ctx) {
			strictEqual(typeof ctx.element, "object");
			strictEqual(typeof ctx.data, "undefined");
		}
	});
	it(`Invalid Data ("null")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="null"></div>`;
		const ctx = getContext("mycontainer");
		strictEqual(typeof ctx, "object");
		if (ctx) {
			strictEqual(typeof ctx.element, "object");
			strictEqual(typeof ctx.data, "undefined");
		}
	});
	it(`Invalid Data ("undefined")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="undefined"></div>`;
		const ctx = getContext("mycontainer");
		strictEqual(typeof ctx, "object");
		if (ctx) {
			strictEqual(typeof ctx.element, "object");
			strictEqual(typeof ctx.data, "undefined");
		}
	});
	it(`Invalid Data (not JSON)`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="NOT JSON"></div>`;
		const ctx = getContext("mycontainer");
		strictEqual(typeof ctx, "object");
		if (ctx) {
			strictEqual(typeof ctx.element, "object");
			strictEqual(typeof ctx.data, "undefined");
		}
	});
	it(`Valid Data (JSON Boolean)`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="true"></div>`;
		const ctx = getContext("mycontainer");
		strictEqual(typeof ctx, "object");
		if (ctx) {
			strictEqual(typeof ctx.element, "object");
			strictEqual(ctx.data, true);
		}
	});
	it(`Valid Data (JSON String)`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context='"123"'></div>`;
		const ctx = getContext("mycontainer");
		strictEqual(typeof ctx, "object");
		if (ctx) {
			strictEqual(typeof ctx.element, "object");
			strictEqual(ctx.data, "123");
		}
	});
	it(`Valid Data (JSON Object)`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context='{"hello": 123}'></div>`;
		const ctx = getContext("mycontainer");
		strictEqual(typeof ctx, "object");
		if (ctx) {
			strictEqual(typeof ctx.element, "object");
			deepStrictEqual(ctx.data, {hello: 123});
		}
	});
	it(`Invalid Property ("")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="111" data-myprop="222"></div>`;
		const ctx = getContext("mycontainer", "");
		strictEqual(typeof ctx, "object");
		if (ctx) {
			strictEqual(typeof ctx.element, "object");
			strictEqual(typeof ctx.data, "undefined");
		}
	});
	it(`Invalid Property ("fake")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="111" data-myprop="222"></div>`;
		const ctx = getContext("mycontainer", "fake");
		strictEqual(typeof ctx, "object");
		if (ctx) {
			strictEqual(typeof ctx.element, "object");
			strictEqual(typeof ctx.data, "undefined");
		}
	});
	it(`Valid Property ("data-myprop")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="111" data-myprop="222"></div>`;
		const ctx = getContext("mycontainer", "data-myprop");
		strictEqual(typeof ctx, "object");
		if (ctx) {
			strictEqual(typeof ctx.element, "object");
			strictEqual(ctx.data, 222);
		}
	});
	it(`Valid Property ("myprop")`, () => {
		document.body.innerHTML = `<div id="mycontainer" data-context="111" myprop="222"></div>`;
		const ctx = getContext("mycontainer", "myprop");
		strictEqual(typeof ctx, "object");
		if (ctx) {
			strictEqual(typeof ctx.element, "object");
			strictEqual(ctx.data, 222);
		}
	});
});
