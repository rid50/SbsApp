import { AfterViewInit, Component, OnInit } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const $: any;

@Component({
  selector: 'app-database-schema',
  templateUrl: './database-schema.component.html',
  styleUrls: ['./database-schema.component.scss']
})
export class DatabaseSchemaComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    $(function () {
      const codes = ['USD', 'BHD', 'OMR', 'QAR', 'SAR', 'AED', 'RUB'];

      for (let i = 0; i < codes.length; i++) {
        $.ajax({
          type: 'GET',
          contentType: 'application/json; charset=utf-8',
          dataType: 'jsonp',
          //url: 'http://www.geoplugin.net/currency_converter.gp?jsoncallback=?',
          //url: 'http://localhost:3000',
          url: 'https://geoplugin-service.herokuapp.com',
          data: { from: 'KWD', to: codes[i] },
          //data: { from: 'KWD', to: codes[i], amount: 1 },
          async: true, //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
          timeout: 3000,
          success: function (data) {
            //console.log('success:' + JSON.stringify(data))
            $('.currency-rates #' + data.to.code).text(data.to.amount);
          }
        });
      }
    });
  }
}
