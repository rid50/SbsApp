import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class LocaleService {

  //Chosse Locale From This Link
  //https://github.com/angular/angular/tree/master/packages/common/locales

  constructor(@Inject(APP_BASE_HREF) public baseHref:string) {}

  private _locale: string;

  private _dateFormat: Record<string, unknown>;

  EnDateFormat = {
    parse: {
      dateInput: 'MM/DD/yyyy',
    },  
    display: {
      dateInput: 'MM/DD/yyyy',
    },
  };

  FrDateFormat = {
    parse: {
      dateInput: 'DD/MM/yyyy',
    },  
    display: {
      dateInput: 'DD/MM/yyyy',
    },
  };

  RuDateFormat = {
    parse: {
      dateInput: 'DD.MM.yyyy',
    },  
    display: {
      dateInput: 'DD.MM.yyyy',
    },
  };

  set locale(value: string) {
    this._locale = value;
  }

  get locale(): string {
    // this._locale  = this.getUsersLocale('en-US')
    // this._locale  = this.getBaseHref
    // return this._locale;
    if (this.baseHref == '/')
      this._locale = 'en-US'
    else
      this._locale = this.baseHref.replace(/\//g, '')

    // console.log(`locale ${this._locale}`)
    return this._locale
  }

  set dateFormat(value: Record<string, unknown>) {
    this._dateFormat = value;
  }

  get dateFormat(): Record<string, unknown> {
    console.log(`locale ${this._locale}`)    
    switch(this._locale) {
      case 'en': {
        this._dateFormat = this.EnDateFormat
        break
      }
      case 'fr': {
        this._dateFormat = this.FrDateFormat
        break
      }
      case 'ru': {
        this._dateFormat = this.RuDateFormat
        break
      }
      default: {
        this._dateFormat = this.EnDateFormat
      }
    }
    return this._dateFormat
  }

  getUsersLocale(defaultValue: string): string {
    // return 'ru'
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      return defaultValue;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wn = window.navigator as any;
    let lang = wn.languages ? wn.languages[0] : defaultValue;
    lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
    return lang;
  }

  // public registerCulture(culture: string): void {
  //   // debugger;
  //   if (!culture) {
  //     return;
  //   }
  //   switch (culture) {
  //     case 'en': {
  //       this._locale = culture;
  //       console.log('Application Culture Set to English');
  //       break;
  //     }
  //     case 'fr': {
  //       this._locale = 'fr';
  //       console.log('Application Culture Set to French');
  //       break;
  //     }
  //     case 'ru': {
  //       this._locale = 'ru';
  //       console.log('Application Culture Set to Russian');
  //       break;
  //     }
  //     default: {
  //       this._locale = 'en';
  //       console.log('Application Culture Set to English');
  //       break;
  //     }
  //   }
  //}
}