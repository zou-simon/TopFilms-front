import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Film } from '../film';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  public films: Film[];

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.getFilms();
  }

  public getFilms(): void {
    this.filmService.getFilms().subscribe(
      (response: Film[]) => {
        this.films = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
