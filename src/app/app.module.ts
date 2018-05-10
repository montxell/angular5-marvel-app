import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  HttpClient,
  HttpHandler,
  HttpClientModule
} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ComicsComponent } from './components/comics/comics.component';
import { ComicsService } from './services/comics.service';
import { CharactersService } from './services/characters.service';
import { AppRoutingModule } from './/app-routing.module';
import { CharactersComponent } from './components/characters/characters.component';
import { HomeComponent } from './components/home/home.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ComicsComponent,
    CharactersComponent,
    HomeComponent,
    CharacterDetailComponent,
    ComicDetailComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [ComicsService, CharactersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
