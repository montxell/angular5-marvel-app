import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Character } from '../../models/character';
import { CharactersService } from '../../services/characters.service';
import { Comic } from '../../models/comic';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: Character;
  limit = 20;
  offset = 0;
  pageSize: number; // Paginate Pipe: itemsPerPage
  p = 1; // Paginate Pipe: currentPage
  total: number; // Paginate Pipe: totalItems
  isComicsListShown: boolean;
  characterComics: Comic[] = [];

  constructor(
    private charactersService: CharactersService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCharacterById();
    this.getCharacterComics(this.limit, this.offset);
  }

  getCharacterById() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.charactersService.getCharacterById(id).subscribe(
      character => {
        this.character = character.data.results[0];
        console.log(this.character);
      },
      error => {
        console.log(JSON.stringify(error.json()));
      }
    );
  }

  getCharacterComics(limit: number, offset: number) {
    const id = this.route.snapshot.paramMap.get('id');
    return this.charactersService
      .getCharacterComics(id, limit, offset)
      .subscribe(
        characterComics => {
          this.characterComics = characterComics.data.results;
          this.pageSize = characterComics.data.limit;
          this.total = characterComics.data.total;
          console.log(this.characterComics);
        },
        error => {
          console.log(JSON.stringify(error.json()));
        }
      );
  }

  pageCharacterComicsChanged($event) {
    const limit = this.limit;
    const offset = ($event - 1) * limit;
    this.p = $event;
    this.getCharacterComics(limit, offset);
  }

  showComicsList() {
    this.isComicsListShown = !this.isComicsListShown;
  }

  goBack(): void {
    this.location.back();
    // this.router.navigate(['/characters'], {
    //   queryParams: { page: paramsPage }
    // });
  }
}
