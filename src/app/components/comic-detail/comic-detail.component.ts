import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Comic } from '../../models/comic';
import { ComicsService } from '../../services/comics.service';
import { Character } from '../../models/character';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.css']
})
export class ComicDetailComponent implements OnInit {
  comic: Comic;
  limit = 20;
  offset = 0;
  pageSize: number; // Paginate Pipe: itemsPerPage
  p = 1; // Paginate Pipe: currentPage
  total: number; // Paginate Pipe: totalItems
  comicCharacters: Character[] = [];
  comicCreators: any[] = []; // CREATOR MODEL

  constructor(
    private comicsService: ComicsService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.getComicById();
    this.getComicCharacters(this.limit, this.offset);
    // this.getComicCreators(this.limit, this.offset);
  }

  getComicById() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.comicsService.getComicById(id).subscribe(
      comic => {
        this.comic = comic.data.results[0];
        console.log(this.comic);
      },
      error => {
        console.log(JSON.stringify(error.json()));
      }
    );
  }

  getComicCharacters(limit: number, offset: number) {
    const id = this.route.snapshot.paramMap.get('id');
    return this.comicsService.getComicCharacters(id, limit, offset).subscribe(
      comicCharacters => {
        this.comicCharacters = comicCharacters.data.results;
        console.log(this.comicCharacters);
      },
      error => {
        console.log(JSON.stringify(error.json()));
      }
    );
  }

  // getComicCreators(limit: number, offset: number) {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   return this.comicsService.getComicCreators(id, limit, offset).subscribe(
  //     comicCreators => {
  //       this.comicCreators = comicCreators.data.results;
  //       console.log(this.comicCreators);
  //     },
  //     error => {
  //       console.log(JSON.stringify(error.json()));
  //     }
  //   );
  // }

  pageComicCharactersChanged($event) {
    const limit = this.limit;
    const offset = ($event - 1) * limit;
    this.p = $event;
    this.getComicCharacters(limit, offset);
  }

  // pageComicCreatorsChanged($event) {
  //   const limit = this.limit;
  //   const offset = ($event - 1) * limit;
  //   this.p = $event;
  //   this.getComicCreators(limit, offset);
  // }

  goBack(): void {
    this.location.back();
  }
}
