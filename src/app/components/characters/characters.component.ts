import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Character } from '../../models/character';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  limit: number;
  offset: number;
  pageSize: number; // Paginate Pipe: itemsPerPage
  p = 1; // Paginate Pipe: currentPage
  total: number; // Paginate Pipe: totalItems

  constructor(
    private charactersService: CharactersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.p = +params['page'] || 1;
      console.log('Page:', this.p);

      // SET THIS DIFFERENCE TO GET CHARACTERS WHEN WE CLICK THE LINK 'CHARACTHERS' OF THE NAVBAR; PAGE=1
      if (this.p !== 1) {
        this.limit = +localStorage.getItem('limitParam');
        this.offset = +localStorage.getItem('offsetParam');
      } else {
        this.limit = 20;
        this.offset = 0;
      }

      console.log('Limit:', this.limit);
      console.log('Offset:', this.offset);

      this.getCharacters(this.limit, this.offset);

      // Scroll to top of the page
      window.scrollTo(0, 0);
    });

    // const limit = +localStorage.getItem('limitParam') || this.limit;
    // const offset = +localStorage.getItem('offsetParam') || this.offset;

    // console.log('Limit:', limit);
    // console.log('Offset:', offset);

    // this.getCharacters(limit, offset);

    // this.route.queryParams.subscribe(params => {
    //   this.p = +params['page'] || 1;
    //   console.log('Page:', this.p);
    // });
  }

  getCharacters(limit: number, offset: number) {
    return this.charactersService.getCharacters(limit, offset).subscribe(
      characters => {
        this.characters = characters.data.results;
        this.pageSize = characters.data.limit;
        this.total = characters.data.total;
        console.log(this.characters);
      },
      error => {
        console.log(JSON.stringify(error.json()));
      }
    );
  }

  pageCharactersChanged($event) {
    const limit = this.limit;
    const offset = ($event - 1) * limit;
    this.p = $event;

    // this.getCharacters(limit, offset);

    localStorage.setItem('limitParam', limit.toString());
    localStorage.setItem('offsetParam', offset.toString());

    // add query param 'page' to the url
    this.router.navigate(['characters'], { queryParams: { page: this.p } });
  }

  // class MyComponent {
  //   config = {
  //     currentPage: 1,
  //     itemsPerPage: 10
  //   };
  //   constructor(private router: Router, private route: ActivatedRoute) {}

  //   ngOnInit() {
  //     this.route.paramMap
  //       .map(params => params.get('page'))
  //       .subscribe(page => this.config.currentPage = page);
  //   }

  //   pageChange(newPage: number) {
  //     this.router.navigate(['path/to/here'], { queryParams: { page: newPage } });
  //   }
  // }

  //   this.sub = this.route
  //   .queryParams
  //   .subscribe(params => {
  //     // Defaults to 0 if no query param provided.
  //     this.page = +params['page'] || 0;
  //   });
  // }

  //   constructor() {
  //     let currentPage = localStorage.getItem('currentPage');
  //     this.config = {
  //         currentPage: currentPage ? currentPage : 1 ,
  //         itemsPerPage: 2
  //     };
  // }

  // pageChange(newPage: number) {
  //     localStorage.setItem('currentPage', newPage);
  //     this.config.currentPage = newPage;
  // }
}
