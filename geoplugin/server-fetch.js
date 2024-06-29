/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

//http://www.geoplugin.net/currency_converter.gp?from=KWD&to=USD&amount=1

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
// eslint-disable-next-line quotes
const dom = new JSDOM(undefined, { url: 'file://.', runScripts: 'dangerously', resources: 'usable' });

global.window = dom.window;
global.document = dom.window.document;

const fetchJsonp = require('fetch-jsonp');
const express = require('express')

const app = express();
//app.set("view engine", "pug");
//app.set("views", path.join(__dirname, "views"));

//const PORT = 3000;
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// app.get('/', async (req, res) => {
	// res.jsonp(await getFetch2(req.query.from, req.query.to));	
// });

// app.get('/', async (req, res) => {
	// res.jsonp(await getFetch2('KWD', 'USD'));
// });

// app.get('/', async (req, res) => {
	// res.jsonp(await getFetch());	
// });

app.get('/', async (req, res) => {
	const path = require('path');
	res.sendFile(path.join(__dirname, '/index.html'));
	// res.render("index");
});

const getFetch = async () => {

	let result = []

    const codes = ['USD', 'BHD', 'OMR', 'QAR', 'SAR', 'AED', 'RUB'];
    for (let i = 0; i < codes.length; i++) {	  
		const params = new URLSearchParams({ from: 'KWD', to: codes[i], amount: 1 })
		const url = 'http://www.geoplugin.net/currency_converter.gp?' + params

		const response = await fetchJsonp(url, {
			jsonpCallback: 'jsoncallback',
			//jsonpCallbackFunction: 'myCallback',
			method: 'GET',
			cache: 'no-cache',
		})
		.catch(error => {
			console.error('Error33:', error);
		})		
		
		if (response.ok) {
			result.push(await response.json())
		} 
		// else {
			// return Promise.reject(new Error('fail')).then(function() {
			  // // not called
			// }, function(error) {
			  // console.error('Error2: ' +error); // Stacktrace
			// });
		// }		
		
		//result.push(await response.json())
	}
	
	return result
}

const getFetch2 = async (from, to) => {

	const params = new URLSearchParams({ from: from, to: to, amount: 1 })

	const url = 'http://www.geoplugin.net/currency_converter.gp?' + params

	const doAjax = async () => {
		const response = await fetchJsonp(url, {
			jsonpCallback: 'jsoncallback',
			//jsonpCallbackFunction: 'myCallback',
			method: 'GET',
			cache: 'no-cache',
		})

		//console.log('a1')	

		if (response.ok) {
			const jsonValue = await response.json();
			//console.log('a2')	
			return Promise.resolve(jsonValue);
		} else {
			return Promise.reject(new Error('fail')).then(function() {
			  // not called
			}, function(error) {
			  console.error(error); // Stacktrace
			});
		}
	}
	//console.log('a3')

	return await doAjax().then(json => json).catch(console.log);
	
}

const getFetch3 = async () => {

	let result = []
	
    const codes = ['USD', 'BHD', 'OMR', 'QAR', 'SAR', 'AED', 'RUB'];
    for (let i = 0; i < codes.length; i++) {	  
		const params = new URLSearchParams({ from: 'KWD', to: codes[i], amount: 1 })
		const url = 'http://www.geoplugin.net/currency_converter.gp?' + params
	
		const response = await fetchJsonp(url, {
			jsonpCallback: 'jsoncallback',
			//jsonpCallbackFunction: 'myCallback',
			method: 'GET',
			cache: 'no-cache',
		})
		.then(response => {
			//const dat = response.json
			//console.log('a1')	
			//console.log('success:' + dat)
			return response.json()
		})
		.then(data => {
			//console.log(data)
			//console.log('a2')	
			result.push(data);
		})
		.catch(error => {
			console.error(error);
		})

		if (result.length == 0)
			break;
	//console.log('a3')		
	}
	
	return result
}
