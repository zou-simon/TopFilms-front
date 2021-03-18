import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Film } from './film';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getFilm(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiServerUrl}/films`);
  }

  public addFilm(film: Film): Observable<Film> {
    return this.http.post<Film>(`${this.apiServerUrl}/film/add`, film);
  }
  public updateFilm(film: Film): Observable<Film> {
    return this.http.put<Film>(`${this.apiServerUrl}/film/update`, film);
  }
  public deleteFilm(filmId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/film/delete/${filmId}`);
  }
}
