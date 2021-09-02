/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Constants } from './../util/constants';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { LocaleService } from './localeService.service';

@Pipe({
    name: 'MyDateFormatPipe'
})
export class MyDateFormatPipe extends DatePipe implements PipeTransform {

    constructor(@Inject(LocaleService) private localeService: LocaleService) {

        super(localeService.locale);
        // console.log(`locale ${localeService.locale}`)

        // console.log(`format2 ${this.localeService.EnDateFormat.display.dateInput}`)
        // console.log(`format3 ${this.localeService.dateFormat.parse.dateInput}`)    
        // console.log(`format4 ${JSON.stringify(this.localeService.dateFormat['parse'])}`)        
    }

    transform(value: string, format?: string, timezone?: string, locale?: string): any {
        // format = this.customFormats[format] || format;
        // this.dateFormat
        // this.localeService.dateFormat
        switch (this.localeService.locale) {
            case 'en': {
                // console.log(`format ${this.localeService.EnDateFormat.display.dateInput}`)
                format = 'yyyy-MM-dd'
                break
            }
            // case 'fr': {
            //     // console.log(`format ${this.localeService.EnDateFormat.display.dateInput}`)
            //     format = this.localeService.FrDateFormat.display.dateInput
            //     break
            // }
            // case 'ru': {
            //     // console.log(`format ${this.localeService.EnDateFormat.display.dateInput}`)
            //     format = this.localeService.RuDateFormat.display.dateInput
            //     break
            // }
            // eslint-disable-next-line no-empty
            default: {
            }
        }
        // console.log(`format ${format}`)
        return super.transform(value, format, timezone, this.localeService.locale);
    }

    //   transform(value: any, args?: any): any {
    //     return super.transform(value, 'dd-MMM-yyyy');
    //   }
}