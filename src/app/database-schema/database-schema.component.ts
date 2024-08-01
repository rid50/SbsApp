import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';

import { ActivatedRoute } from '@angular/router';
import { ActivatedRoutesService } from '../services/activated-routes.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const $: any;
declare let fetchJsonp: any;

@Component({
	selector: 'app-database-schema',
	templateUrl: './database-schema.component.html',
	styleUrls: ['./database-schema.component.scss'],
	standalone: true,
	imports: [
		FlexLayoutModule,
	],
})
export class DatabaseSchemaComponent implements AfterViewInit {

	constructor(private route: ActivatedRoute,
		private activatedRoutesService: ActivatedRoutesService) { }


	ngOnInit(): void {
		this.activatedRoutesService.setRoutePathForDrawer(this.route);
	}

	// http://www.geoplugin.net/currency_converter.gp?from=KWD&to=USD&amount=1	!!! does not work
	// https://geopluginservice-sw2qek0j.b4a.run/?from=KWD&to=USD&amount=1

	ngAfterViewInit(): void {
		$(async function () {
			const codes = ['USD', 'BHD', 'OMR', 'QAR', 'SAR', 'AED', 'RUB'];

			for (let i = 0; i < codes.length; i++) {
				const params = new URLSearchParams({ from: 'KWD', to: codes[i], amount: '1' })
				//const url = 'http://www.geoplugin.net/currency_converter.gp?' + params	// jsonpCallback: 'jsoncallback'	!!!!!
				const url = 'https://geopluginservice-sw2qek0j.b4a.run?' + params	// no jsonpCallback: 'jsoncallback'	!!!!!
				const response = await fetchJsonp(url, {
					//jsonpCallback: 'jsoncallback',
					cache: 'no-cache',
				})
					.then(response => {
						//console.log('Response: ' + JSON.stringify(response))
						return response.json()
					})
					.then(data => {
						//console.log('Data: ' + JSON.stringify(data))
						$('.currency-rates #' + data.to.code).text(data.to.amount);
					})
					.catch(error => {
						console.error(error);
					})
			}
		});
	}
}
