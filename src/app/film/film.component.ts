import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../film';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  film: Film;

  constructor(private route: ActivatedRoute, private filmService: FilmService) {
    this.film = {
      id: 0,
      titre: '',
      dateSortie: '',
      realisateur: '',
      duree: 0
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.getFilm(id);
    });
  }

  public getFilm(id: number): void {
    this.filmService.getFilm(id).subscribe(
      (response: Film) => {
          this.film = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
