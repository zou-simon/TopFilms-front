import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../../film';
import { FilmService } from '../../services/film.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  film: Film;
  filmForm: FormGroup;
  trustedUrl: SafeResourceUrl;
  listGenres: string[] = ['Animation', 'Comédie', 'Familial', 'Mystère', 'Aventure', 'Action', 'Science-Fiction'];
  filmGenre: string[] = [];
  showMsg: boolean = false;
  alertMessage: string;
  selectedFile: File;

  constructor(private route: ActivatedRoute, private filmService: FilmService, private sanitizer: DomSanitizer, private http: HttpClient, private router: Router, private uploadService: UploadFileService) {
    this.film = {
      id: 0,
      titre: '',
      imageUrl: '',
      genre: '',
      synopsis: '',
      dateSortie: '',
      realisateur: '',
      duree: 0,
      bandeAnnonce: ''
    };
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.filmForm = new FormGroup({
        id: new FormControl(id),
        titre: new FormControl(''),
        imageUrl: new FormControl(''),
        genre: new FormControl(''),
        synopsis: new FormControl(''),
        dateSortie: new FormControl(''),
        realisateur: new FormControl(''),
        duree: new FormControl(''),
        bandeAnnonce: new FormControl('')
      });
    });
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.setFilm(id);
    });
  }

  setFilm(id: number) {
    this.filmService.getFilm(id).subscribe(
      (response: Film) => {
          this.film = response;
          this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.film.bandeAnnonce);
          this.filmGenre = this.film.genre.split(', ');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  updateFilm() {
    this.showMsg = true;
    let changed: number = 0;
    for (let key in this.film) {
      let value = this.filmForm.get(key).value;
      if (value && key != 'id' && this.film[key] != value && key != 'imageUrl') {
        this.film[key] = value;
        changed = 1;
      }
    }
    if (this.film.genre != this.filmGenre.join(', ')) {
      this.film.genre = this.filmGenre.join(', ');
      changed = 1;
    }   
    if (this.selectedFile) {
      changed = 1;
      this.uploadService.upload(this.selectedFile).subscribe(
        response => {
          this.film.imageUrl = "http://localhost:8080/files/" + this.selectedFile.name;
          this.filmService.updateFilm(this.film).subscribe();
        },
        error => {
          alert(error.message);
        }
      );
    }
    if (changed == 1) {
      this.filmService.updateFilm(this.film).subscribe(
        response => {
          this.resetInput();
          this.alertMessage = "Film modifié !";
        },
        error => {
          alert(error.message);
        }
      );
    }
    else {
      this.alertMessage = "Aucune modification...";
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

  delFilm() {
    this.filmService.deleteFilm(this.film.id).subscribe(
      response => {
        this.router.navigate(['/films']);
      },
      error => {
        alert(error.message);
      }
    )
  }

  resetInput() {
    this.filmForm.reset();
  }

}
