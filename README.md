# DOM Entry Context

[![Build Status](https://travis-ci.org/wildpeaks/package-dom-entry-context.svg?branch=master)](https://travis-ci.org/wildpeaks/package-dom-entry-context) [![Greenkeeper badge](https://badges.greenkeeper.io/wildpeaks/package-dom-entry-context.svg)](https://greenkeeper.io/)

Typescript function to **read JSON-encoded data from an HTMLElement attribute**.

Install:

	npm install @wildpeaks/dom-entry-context

-------------------------------------------------------------------------------

## Example: Read a number from the default attribute `data-context`

index.html:
````html
<div id="mycontainer" data-context="123">
````

script.ts:
````ts
import {Context, getContext} from '@wildpeaks/dom-entry-context';

const context: Context = getContext('mycontainer');
console.log(context.element); // Reference to #mycontainer
console.log(context.data);    // 123
````

-------------------------------------------------------------------------------

## Example: Read an object from a custom attribute

index.html:
````html
<div id="mycontainer" data-myprop='{"hello": {"world": 123}}'>
````

script.ts:
````ts
import {Context, getContext} from '@wildpeaks/dom-entry-context';

const context: Context = getContext('mycontainer', 'data-myprop');
console.log(context.element);          // Reference to #mycontainer
console.log(context.data);             // {"hello": {"world": 123}}
console.log(context.data.hello);       // {"world": 123}
console.log(context.data.hello.world); // 123
````

-------------------------------------------------------------------------------
