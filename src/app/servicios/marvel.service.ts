import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private publicKey = 'eb67497dd9c1116464484384c214e2e1f4';
  private privateKey = '781d553230fa3ff922c332525bbc5a1b2bf99070e5';
  private baseUrl = 'https://gateway.marvel.com:443/v1/public';

  constructor(private http: HttpClient) { }

  private getHash(ts: string): string {
    return Md5.hashStr(ts + this.privateKey + this.publicKey).toString();
  }

  getCharacters() {
    const ts = new Date().getTime().toString();
    const hash = this.getHash(ts);
    const url = `${this.baseUrl}/characters?ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;
    return this.http.get(url);
  }
}
