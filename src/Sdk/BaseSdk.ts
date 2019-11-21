import { Entity, HeadersMap } from '../types';

import { DEFAULT_USER_AGENT } from './constants';

export interface Options {
    accessToken: string;
    baseUrl: string;
    headers: HeadersMap;
}

export default class BaseSdk<T extends Entity<number | string>> {
    protected readonly accessToken: string;
    protected readonly url: string;
    protected readonly headers: HeadersMap;

    constructor({ accessToken, baseUrl, headers }: Options, sdkUrl: string) {
        this.accessToken = accessToken;
        this.headers = headers;
        this.url = `${baseUrl}/${sdkUrl}`;
    }

    protected getHeaders(): { [key: string]: string } {
        return {
            'User-Agent': DEFAULT_USER_AGENT,
            'x-access-token': this.accessToken,
            ...this.headers,
        };
    }

    protected getUrlWithId(itemOrItemId: string | T): string {
        const itemId = typeof itemOrItemId === 'object' ? itemOrItemId.id : itemOrItemId;
        return `${this.url}/${itemId}`;
    }
}
