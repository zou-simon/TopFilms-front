import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Film } from '../../film';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-classements',
  templateUrl: './classements.component.html',
  styleUrls: ['./classements.component.css']
})
export class ClassementsComponent implements OnInit {
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
