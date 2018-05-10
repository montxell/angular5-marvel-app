import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Character } from '../models/character';

@Injectable()
export class CharactersService {
  private url = 'https://gateway.marvel.com';
  private apikey = '90505659497c2697c2be64a38724c9e6';
  private hash = 'f31563e5d6e59f8d5b53e2759cf0a4f8'; // md5 digest of ts + marvel private apikey + marvel public apikey

  // DOES IT WORK?? IMPORT MD5??

  // import md5 from 'md5';

  // const publicKey = `YOUR_PUBLIC_KEY`;
  // const privateKey = `YOUR_PRIVATE_KEY`;
  // const ts = Date.now();
  // const hash = md5(ts + privateKey + publicKey);

  // Set ts(timestamp) to change on a request-by-request basis by assigning it to new Date ??
  // If so,  we need a method for md5 digest
  private ts = '1'; // we could add timestap ('ts') as Date.now() but we need the function to md5 digest

  private query = `apikey=${this.apikey}&hash=${this.hash}&ts=${this.ts}`;

  nameStartLimit = 100;

  constructor(private http: HttpClient) {}

  // SET LIMIT TO 100
  getCharactersByNameStart() {
    // Remove '0' as the marvel api thinks it's blank
    // "code": 409, "status": "nameStartsWith cannot be blank if it is set"
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';

    const randomAlphanumeric = alphanumeric.charAt(
      Math.floor(Math.random() * alphanumeric.length)
    );
    return this.http
      .get(
        `${
          this.url
        }/v1/public/characters?nameStartsWith=${randomAlphanumeric}&limit=${
          this.nameStartLimit
        }&${this.query}`
      )
      .pipe(
        tap(data =>
          this.log(
            `Got characters with name start with: ${randomAlphanumeric}!`
          )
        ),
        catchError(this.handleError<any>('getCharactersByNameStart'))
      );
  }

  getCharacterById(id): Observable<any> {
    return this.http
      .get(`${this.url}/v1/public/characters/${id}?${this.query}`)
      .pipe(
        tap(data => this.log(`Got character with id: ${id}!`)),
        catchError(this.handleError<any>('getCharacterById'))
      );
  }

  //  MAPEO PARA QUE SALGA DIRECTAMENTE RESULTS O SOLAMENTE EN CHARACTERS COMPONENT,
  //  CREAR UNA INSTANCIA DE CHARACTER PARA QUE ME DEVUELVA SOLAMENTE LO QUE QUIERO???

  // THE MARVEL API RETURNS AUTOMATICALLY 20 RESULTS, WE ADD THE PARAMS OFFSET AND LIMIT
  // TO GET LATER BY PAGINATION THE TOTAL CHARACTERS

  getCharacters(limit: number, offset: number): Observable<any> {
    return this.http
      .get(
        `${this.url}/v1/public/characters?limit=${limit}&offset=${offset}&${
          this.query
        }`
      )
      .pipe(
        tap(data => this.log('Got characters!')),
        catchError(this.handleError<any>('getCharacters'))
      );
  }

  getCharacterComics(
    id: string,
    limit: number,
    offset: number
  ): Observable<any> {
    return this.http
      .get(
        `${
          this.url
        }/v1/public/characters/${id}/comics?limit=${limit}&offset=${offset}&${
          this.query
        }`
      )
      .pipe(
        tap(data => this.log(`Got comics of character id: ${id}!`)),
        catchError(this.handleError<any>('getCharacterComics'))
      );
  }

  searchCharacter(term: string) {
    return this.http
      .get(
        `${this.url}/v1/public/characters?nameStartsWith=${term}&limit=${
          this.nameStartLimit
        }&${this.query}`
      )
      .pipe(
        tap(data => this.log(`Got characters searched by term: ${term}!`)),
        catchError(this.handleError<any>('searchCharacter'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('Message: ' + message);
  }
}
