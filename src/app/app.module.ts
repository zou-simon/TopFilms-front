import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FilmService } from './film.service';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './home/content/content.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ClassementsComponent } from './classements/classements.component';
import { FilmsComponent } from './films/films.component';
import { CompteComponent } from './compte/compte.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FilmComponent } from './film/film.component';

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
