import { Component, OnInit } from '@angular/core';
import { Comic } from '../../models/comic';
import { Character } from '../../models/character';
import { ComicsService } from '../../services/comics.service';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  limit = 12;
  lastWeekComics: Comic[] = [];
  charactersByNameStart: Character[] = [];
  randomCharactersList: Character[];
  randomComics: Comic[] = [];

  constructor(
    private comicsService: ComicsService,
    private charactersService: CharactersService
  ) {}

  ngOnInit() {
    this.getLastWeekComics(this.limit);
    // this.getRandomCharacters();
  }

  getLastWeekComics(limit: number) {
    return this.comicsService.getLastWeekComics(limit).subscribe(
      lastWeekComics => {
        this.lastWeekComics = lastWeekComics.data.results;
        console.log(this.lastWeekComics);
      },
      error => {
        console.log(JSON.stringify(error.json()));
      }
    );
  }

  // getRandomCharacters() {
  //   this.randomCharactersList = [];
  //   while (this.randomCharactersList.length < 6) {
  //     this.charactersService.getCharactersByNameStart().subscribe(
  //       charactersByNameStart => {
  //         this.charactersByNameStart = charactersByNameStart.data.results;
  //         console.log(this.charactersByNameStart);
  //         if (this.charactersByNameStart.length) {
  //           // Get a random index of the array 'charactersByNameStart' to get a random character
  //           const randomIndex = Math.floor(
  //             Math.random() * this.charactersByNameStart.length
  //           );
  //           // Push the random character into 'randomCharactersList' to get 6 characters to show on screen
  //           this.randomCharactersList.push(
  //             this.charactersByNameStart[randomIndex]
  //           );
  //           console.log(this.randomCharactersList);
  //         }
  //       },
  //       error => {
  //         console.log(JSON.stringify(error.json()));
  //       }
  //     );
  //   }
  // }

  // **** ORIGINAL CODE getRandomCharacters() ****

  // getRandomCharacters() {
  //   this.randomCharactersList = [];
  //   for (let i = 0; i < 6; i++) {
  //     this.charactersService.getCharacterByNameStart().subscribe(
  //       charactersByNameStart => {
  //         this.charactersByNameStart = charactersByNameStart.data.results;
  //         console.log(this.charactersByNameStart);
  //         // Get a random index of the array 'charactersByNameStart' to get a random character
  //         const randomIndex = Math.floor(
  //           Math.random() * this.charactersByNameStart.length
  //         );
  //         // Push the random character into 'randomCharactersList' to get 6 characters to show on screen
  //         this.randomCharactersList.push(
  //           this.charactersByNameStart[randomIndex]
  //         );
  //         console.log(this.randomCharactersList);
  //       },
  //       error => {
  //         console.log(JSON.stringify(error.json()));
  //       }
  //     );
  //   }
  // }

  getRandomComics() {}
}
