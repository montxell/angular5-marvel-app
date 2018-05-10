import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ComicsService {
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

  constructor(private http: HttpClient) {}

  getComicById(id): Observable<any> {
    return this.http
      .get(`${this.url}/v1/public/comics/${id}?${this.query}`)
      .pipe(
        tap(data => this.log(`Got comic with id: ${id}!`)),
        catchError(this.handleError<any>('getComicById'))
      );
  }

  //  MAPEO PARA QUE SALGA DIRECTAMENTE RESULTS O SOLAMENTE EN  COMICS COMPONENT,
  //  CREAR UNA INSTANCIA DE COMIC PARA QUE ME DEVUELVA SOLAMENTE LO QUE QUIERO???

  // THE MARVEL API RETURNS AUTOMATICALLY 20 RESULTS, WE ADD THE PARAMS OFFSET AND LIMIT
  // TO GET LATER BY PAGINATION THE TOTAL COMICS

  getComics(limit: number, offset: number): Observable<any> {
    return this.http
      .get(
        `${this.url}/v1/public/comics?limit=${limit}&offset=${offset}&${
          this.query
        }`
      )
      .pipe(
        tap(data => this.log('Got comics!')),
        catchError(this.handleError<any>('getComics'))
      );
  }

  getLastWeekComics(limit: number): Observable<any> {
    return this.http
      .get(
        `${this.url}/v1/public/comics?dateDescriptor=lastWeek&limit=${limit}&${
          this.query
        }`
      )
      .pipe(
        tap(data => this.log('Got last week comics!')),
        catchError(this.handleError<any>('geLastWeekComics'))
      );
  }

  getComicCharacters(
    id: string,
    limit: number,
    offset: number
  ): Observable<any> {
    return this.http
      .get(
        `${
          this.url
        }/v1/public/comics/${id}/characters?limit=${limit}&offset=${offset}&${
          this.query
        }`
      )
      .pipe(
        tap(data => this.log(`Got characters of comic id: ${id}!`)),
        catchError(this.handleError<any>('getComicCharacters'))
      );
  }

  getComicCreators(id: string, limit: number, offset: number): Observable<any> {
    return this.http
      .get(
        `${
          this.url
        }/v1/public/comics/${id}/creators?limit=${limit}&offset=${offset}&${
          this.query
        }`
      )
      .pipe(
        tap(data => this.log(`Got creators of comic id: ${id}!`)),
        catchError(this.handleError<any>('getComicCreators'))
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
