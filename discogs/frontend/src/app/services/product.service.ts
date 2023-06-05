import { Injectable } from '@angular/core';

import { Observable, catchError, of, map, forkJoin, fromEvent } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Product } from './product';
import { SearchbarComponent } from '../components/searchbar/searchbar.component';


@Injectable({providedIn: 'root'})
export class ProductService {

  private productsURL = 'https://itunes.apple.com/search';
  private ApiRest = 'http://localhost:8080/api/';
  products: any[] = [];
  public art = '';
  public query = '';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }


  /**
   * Metodo formateo de el nombre de la canción para el web scraping
   * @param song nombre de la cancion a formatear
   * @returns
   */
  private deleteFeaturing(song: string) : string{

    let indexFeat: number = song.indexOf("feat");
    if(indexFeat==-1) return song;

    song = song.slice(0, indexFeat - 2);

    return song;

  }


  /**
   * Eliminar los acentos de un string dado
   * @param elemento elemento a eliminar los acentos
   * @returns
   */
  private deleteAcentos(elemento : string): string {
    return elemento.replaceAll("ú", "u").replaceAll("ó", "o").replaceAll("í", "i").replaceAll("á", "a").replaceAll("é", "e");
  }

  /**
   * Obtencion de la caratula de la canción formateando previamente el nombre de la mis y el artista
   * @param artist
   * @param track
   * @returns
   */
  getUrlSong(artist: string, track: string): Observable<string> {
    //Eliminacion de los espacios y guiones extra
    track = track.replaceAll(" ", "-");
    track = track.replaceAll(/-+/g, "-");

    //Eliminacion de los elementos como el feat o acentos
    track = this.deleteFeaturing(track);
    track = this.deleteAcentos(track);

    //Formateo de elementos no soportados en el link de genius
    artist = artist.replaceAll(" ", "-").replaceAll("&", "and").replaceAll(",", "").replaceAll("ñ", "n");
    artist = artist.replaceAll(/-+/g, "-");
    artist = this.deleteAcentos(artist);


    const url = this.ApiRest + 'songs/url?artistName=' + artist + "&songName=" + track;
    console.log(url);
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.img;
      })
    );
  }

  /**
   * Obtencion de la caratula de un artista dado segun su nombre
   * @param artist artista del cual obtenemos la caratula
   * @returns
   */
  getUrl(artist: string): Observable<string> {
    artist = artist.replace(" ", "-");
    const url = this.ApiRest + 'songs/urlArtist?artistName=' + artist;

    return this.http.get(url).pipe(
      map((response: any) => {
        return response.img;
      })
    );
  }


  /**
   * Obtener imagen de respaldo del artista
   * @param artist
   * @returns
   */
  getUrlBack(artist: string): Observable<string> {
    artist = artist.replace(" ", "-");
    const url = this.ApiRest + 'songs/urlBack?artistName=' + artist;

    return this.http.get(url).pipe(
      map((response: any) => {
        console.log(response.imgBack);
        return response.imgBack;
      })
    );


  }



  /**
   * Obtencion de la letra de una cancion dada por el nombre de la cancion y el nombre del artista
   * @param artist nombre del autor de la cancion
   * @param track nombre de la cancion
   * @returns
   */
 getLyrics(artist: string, track: string): Observable<string> {
    track = track.replaceAll(" ", "-").replaceAll("ñ", "n").replaceAll(/-+/g, "-");
    track = this.deleteFeaturing(track);
    track = this.deleteAcentos(track);
    artist = artist.replaceAll(" ", "-").replaceAll("&", "and").replaceAll(",", "").replaceAll("ñ", "n");
    artist = artist.replaceAll(/-+/g, "-");
    artist = this.deleteAcentos(artist);


    const url = this.ApiRest + 'songs?artistName=' + artist + "&songName=" + track;
    console.log(artist);
    console.log(url);
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.lyrics;
      })
    );
  }


/**
 * Busqueda de un artista determinado para la obtención de todos sus componentes de la api de itunes
 * @param artist artista a obtener
 * @returns
 */
searchArtists(artist: string): Observable<any> {
  artist = artist.replace(' ', '+');

  this.art = artist;
  let url = this.productsURL;
  console.log(artist);

  console.log(artist);
  url += (artist == '' ? '?term=feid' : '?term=' + artist) + "&kind=song&minPrice=0.99";

  console.log("sEARCHaRTIST");

  return this.http.get(url)
  .pipe(
    map((response: any) => {
      const products: Product[] = response.results.map((result: any) => {
        const product: Product = {
          id: result.trackId,
          title: result.trackName,
          price: result.trackPrice,
          artist: result.artistName,
          genero: result.primaryGenreName,
          imageUrl: result.artworkUrl100,
          itunesUrl: result.trackViewUrl,
          lyrics: ''
        };
        return product;
      });

      return products;
    })
  );
}

  getProductsA(artist: string): Observable<Product[]> {
    return this.searchArtists(artist);
  }


  getProducts(): Observable<Product[]> {
    return this.searchArtists(this.art);
  }
}
