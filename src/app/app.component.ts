import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Film } from './film';
import { FilmService } from './film.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public films: Film[];

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.getFilms();
  }

  public getFilms(): void {
    this.filmService.getFilm().subscribe(
      (response: Film[]) => {
        this.films = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
}
