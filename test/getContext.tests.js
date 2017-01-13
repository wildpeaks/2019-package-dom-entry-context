/* eslint-env browser, mocha */
/* eslint-disable no-undefined */
'use strict';
const {strictEqual, deepStrictEqual} = require('assert');
const getContext = require('..');


function assert_missing_id(){
	document.body.innerHTML = `<div id="mycontainer" data-context="111"></div>`;
	strictEqual(getContext(), false);
}
function assert_invalid_id_empty_string(){
	document.body.innerHTML = `<div id="mycontainer" data-context="111"></div>`;
	strictEqual(getContext(''), false);
}
function assert_invalid_id_fake_string(){
	document.body.innerHTML = `<div id="mycontainer" data-context="111"></div>`;
	strictEqual(getContext('fake'), false);
}
function assert_invalid_id_false(){
	document.body.innerHTML = `<div id="mycontainer" data-context="111"></div>`;
	strictEqual(getContext(false), false);
}
function assert_invalid_id_true(){
	document.body.innerHTML = `<div id="mycontainer" data-context="111"></div>`;
	strictEqual(getContext(true), false);
}
function assert_invalid_id_null(){
	document.body.innerHTML = `<div id="mycontainer" data-context="111"></div>`;
	strictEqual(getContext(null), false);
}
function assert_invalid_id_undefined(){
	document.body.innerHTML = `<div id="mycontainer" data-context="111"></div>`;
	strictEqual(getContext(undefined), false);
}
function assert_invalid_id_object(){
	document.body.innerHTML = `<div id="mycontainer" data-context="111"></div>`;
	strictEqual(getContext({}), false);
}
function assert_invalid_id_array(){
	document.body.innerHTML = `<div id="mycontainer" data-context="111"></div>`;
	strictEqual(getContext([]), false);
}
function assert_invalid_id_number_0(){
	document.body.innerHTML = `<div id="mycontainer" data-context="111"></div>`;
	strictEqual(getContext(0), false);
}
function assert_invalid_id_number_1(){
	document.body.innerHTML = `<div id="mycontainer" data-context="111"></div>`;
	strictEqual(getContext(1), false);
}
function assert_valid_id(){
	document.body.innerHTML = `<div id="mycontainer" data-context="123"></div>`;
	const context = getContext('mycontainer');
	strictEqual(typeof context, 'object', 'context is an Object');
	strictEqual(typeof context.element, 'object', 'context.element');
	strictEqual(context.data, 123, 'context.data');
}

function assert_missing_data(){
	document.body.innerHTML = `<div id="mycontainer"></div>`;
	const context = getContext('mycontainer');
	strictEqual(typeof context, 'object', 'context is an Object');
	strictEqual(typeof context.element, 'object', 'context.element');
	strictEqual(typeof context.data, 'undefined', 'context.data');
}
function assert_invalid_data_empty(){
	document.body.innerHTML = `<div id="mycontainer" data-context=""></div>`;
	const context = getContext('mycontainer');
	strictEqual(typeof context, 'object', 'context is an Object');
	strictEqual(typeof context.element, 'object', 'context.element');
	strictEqual(typeof context.data, 'undefined', 'context.data');
}
function assert_invalid_data_null(){
	document.body.innerHTML = `<div id="mycontainer" data-context="null"></div>`;
	const context = getContext('mycontainer');
	strictEqual(typeof context, 'object', 'context is an Object');
	strictEqual(typeof context.element, 'object', 'context.element');
	strictEqual(typeof context.data, 'undefined', 'context.data');
}
function assert_invalid_data_undefined(){
	document.body.innerHTML = `<div id="mycontainer" data-context="undefined"></div>`;
	const context = getContext('mycontainer');
	strictEqual(typeof context, 'object', 'context is an Object');
	strictEqual(typeof context.element, 'object', 'context.element');
	strictEqual(typeof context.data, 'undefined', 'context.data');
}
function assert_invalid_data_not_json(){
	document.body.innerHTML = `<div id="mycontainer" data-context="NOT JSON"></div>`;
	const context = getContext('mycontainer');
	strictEqual(typeof context, 'object', 'context is an Object');
	strictEqual(typeof context.element, 'object', 'context.element');
	strictEqual(typeof context.data, 'undefined', 'context.data');
}

function assert_valid_data_boolean(){
	document.body.innerHTML = `<div id="mycontainer" data-context="true"></div>`;
	const context = getContext('mycontainer');
	strictEqual(typeof context, 'object', 'context is an Object');
	strictEqual(typeof context.element, 'object', 'context.element');
	strictEqual(context.data, true, 'context.data');
}
function assert_valid_data_string(){
	document.body.innerHTML = `<div id="mycontainer" data-context='"123"'></div>`;
	const context = getContext('mycontainer');
	strictEqual(typeof context, 'object', 'context is an Object');
	strictEqual(typeof context.element, 'object', 'context.element');
	strictEqual(context.data, '123', 'context.data');
}
function assert_valid_data_object(){
	document.body.innerHTML = `<div id="mycontainer" data-context='{"hello": 123}'></div>`;
	const context = getContext('mycontainer');
	strictEqual(typeof context, 'object', 'context is an Object');
	strictEqual(typeof context.element, 'object', 'context.element');
	deepStrictEqual(context.data, {hello: 123}, 'context.data');
}


describe('@wildpeaks/dom-entry-context', () => {
	it('Missing ID', assert_missing_id);
	it('Invalid ID ("")', assert_invalid_id_empty_string);
	it('Invalid ID ("fake")', assert_invalid_id_fake_string);
	it('Invalid ID (false)', assert_invalid_id_false);
	it('Invalid ID (true)', assert_invalid_id_true);
	it('Invalid ID (null)', assert_invalid_id_null);
	it('Invalid ID (undefined)', assert_invalid_id_undefined);
	it('Invalid ID ({})', assert_invalid_id_object);
	it('Invalid ID ([])', assert_invalid_id_array);
	it('Invalid ID (0)', assert_invalid_id_number_0);
	it('Invalid ID (1)', assert_invalid_id_number_1);
	it('Valid ID', assert_valid_id);

	it('Missing Data', assert_missing_data);
	it('Invalid Data ("")', assert_invalid_data_empty);
	it('Invalid Data ("null")', assert_invalid_data_null);
	it('Invalid Data ("undefined")', assert_invalid_data_undefined);
	it('Invalid Data (not JSON)', assert_invalid_data_not_json);
	it('Valid Data (JSON Boolean)', assert_valid_data_boolean);
	it('Valid Data (JSON String)', assert_valid_data_string);
	it('Valid Data (JSON Object)', assert_valid_data_object);
});
