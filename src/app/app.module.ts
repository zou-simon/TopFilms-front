import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FilmService } from './services/film.service';
import { MenuComponent } from './components/menu/menu.component';
import { ContentComponent } from './components/home/content/content.component';
import { SidebarComponent } from './components/home/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ClassementsComponent } from './components/classements/classements.component';
import { FilmsComponent } from './components/films/films.component';
import { CompteComponent } from './components/compte/compte.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FilmComponent } from './components/film/film.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ContentComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    ClassementsComponent,
    FilmsComponent,
    CompteComponent,
    NotFoundComponent,
    FilmComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '', 
        component: HomeComponent
      },
      {
        path: 'classements', 
        component: ClassementsComponent
      },
      {
        path: 'films/:id', 
        component: FilmComponent
      },
      {
        path: 'films', 
        component: FilmsComponent
      },
      {
        path: 'compte', 
        component: CompteComponent
      },
      {
        path: '**', 
        component: NotFoundComponent
      }
    ])
  ],
  providers: [FilmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
