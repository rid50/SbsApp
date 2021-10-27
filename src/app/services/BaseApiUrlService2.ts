import { Inject, Injectable } from '@angular/core';

@Injectable()
export class BaseApiUrlService2 {

    constructor(@Inject('BASE_API_URL') private apiUrl: string) { }

    public get baseApiUrl(): string {
        return this.apiUrl;
    }

    public set baseApiUrl(value: string) {
        this.apiUrl = value;
    }
}