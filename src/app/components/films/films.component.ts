import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { Film } from '../../film';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: Film[];
  newfilm: Film;
  filmForm: FormGroup;
  listGenres: string[] = ['Animation', 'Comédie', 'Familial', 'Mystère', 'Aventure', 'Action', 'Science-Fiction'];
  selectedFile: File = null;
  filmGenre: string[] = [];
  showMsg: boolean = false;
  alertMessage: string;

  constructor(private filmService: FilmService, private http: HttpClient, private uploadService: UploadFileService) {
    this.newfilm = {
      id: undefined,
      titre: '',
      imageUrl: '',
      genre: '',
      synopsis: '',
      dateSortie: '',
      realisateur: '',
      duree: 0,
      bandeAnnonce: ''
    };
    this.filmForm = new FormGroup({
      titre: new FormControl(''),
      imageUrl: new FormControl(''),
      genre: new FormControl(''),
      synopsis: new FormControl(''),
      dateSortie: new FormControl(''),
      realisateur: new FormControl(''),
      duree: new FormControl(''),
      bandeAnnonce: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getFilms();
  }

  getFilms(): void {
    this.filmService.getFilms().subscribe(
      (response: Film[]) => {
        this.films = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  createFilm(): void {
    this.showMsg = true;
    if (this.filmForm.get('titre').value && this.filmForm.get('synopsis').value) {
      for (let key in this.newfilm) {
        if (key != 'id' && key != 'imageUrl') {
          let value = this.filmForm.get(key).value;
          if (value && this.newfilm[key] != value) {
            this.newfilm[key] = value;
          }
        }
      }
      if (this.newfilm.genre != this.filmGenre.join(', ')) {
        this.newfilm.genre = this.filmGenre.join(', ');
      }
      if (this.selectedFile) {
        this.uploadService.upload(this.selectedFile).subscribe(
          response => {
            this.newfilm.imageUrl = "http://localhost:8080/files/" + this.selectedFile.name;
            this.filmService.addFilm(this.newfilm).subscribe();
          },
          error => {
            alert(error.message);
          }
        );
      }
      else {
        this.newfilm.imageUrl = "/assets/images/no.jpg";
        this.filmService.addFilm(this.newfilm).subscribe();
      }
    
      this.filmService.addFilm(this.newfilm).subscribe(
        response => {
          this.resetInput();
          this.alertMessage = "Film crée !";
          this.getFilms();
        },
        error => {
          alert(error.message);
        }
      );
    }
    else {
      this.alertMessage = "Il faut au minimum le titre et le synopsis pour ajouter un film.";
    }
  }

  onDropDownEvent(event) {
    event.stopPropagation();
  }

  onCheckboxChange(event) { 
    let value = event.target.value;
    if (!event.target.checked && this.filmGenre.includes(value)) {
        const id = this.filmGenre.indexOf(value);
        this.filmGenre.splice(id,  1);
    } else
        this.filmGenre.push(value);
  }

  resetInput(): void {
    this.filmForm.reset();
  }

}
