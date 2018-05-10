import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../../models/character';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  charactersSearchResults: Character[] = [];
  term: string;

  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersService
  ) {
    route.params.subscribe(params => {
      console.log(params);
      this.term = params['term'];
      this.search(this.term);
    });
  }

  ngOnInit() {}

  search(term: string) {
    this.charactersService.searchCharacter(term).subscribe(searchResults => {
      this.charactersSearchResults = searchResults.data.results;
      console.log(this.charactersSearchResults);
    });
  }
}
