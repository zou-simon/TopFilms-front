import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Film } from '../film';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiServerUrl}/films`);
  }

  public getFilm(filmId: number): Observable<Film> {
    return this.http.get<Film>(`${this.apiServerUrl}/films/${filmId}`);
  }

  public addFilm(film: Film): Observable<Film> {
    return this.http.post<Film>(`${this.apiServerUrl}/films`, film);
  }

  public updateFilm(film: Film): Observable<Film> {
    return this.http.patch<Film>(`${this.apiServerUrl}/films/${film.id}`, film);
  }

  public deleteFilm(filmId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/films/${filmId}`);
  }
}
