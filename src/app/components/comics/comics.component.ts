import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ComicsService } from '../../services/comics.service';
import { Comic } from '../../models/comic';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
  comics: Comic[] = [];
  limit: number;
  offset: number;
  pageSize: number; // Paginate Pipe: itemsPerPage
  p = 1; // Paginate Pipe: currentPage
  total: number; // Paginate Pipe: totalItems

  constructor(
    private comicsService: ComicsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.p = +params['page'] || 1;
      console.log('Page:', this.p);

      // SET THIS DIFFERENCE TO GET COMICS WHEN WE CLICK THE LINK 'COMICS' OF THE NAVBAR; PAGE=1
      if (this.p !== 1) {
        this.limit = +localStorage.getItem('limitParam');
        this.offset = +localStorage.getItem('offsetParam');
      } else {
        this.limit = 20;
        this.offset = 0;
      }

      console.log('Limit:', this.limit);
      console.log('Offset:', this.offset);

      this.getComics(this.limit, this.offset);

      // Scroll to top of the page
      window.scrollTo(0, 0);
    });
  }

  getComics(limit: number, offset: number) {
    return this.comicsService.getComics(limit, offset).subscribe(
      comics => {
        this.comics = comics.data.results;
        this.pageSize = comics.data.limit;
        this.total = comics.data.total;
        console.log(this.comics);
      },
      error => {
        console.log(JSON.stringify(error.json()));
      }
    );
  }

  pageComicsChanged($event) {
    const limit = this.limit;
    const offset = ($event - 1) * limit;
    this.p = $event;

    // this.getComics(limit, offset);

    localStorage.setItem('limitParam', limit.toString());
    localStorage.setItem('offsetParam', offset.toString());

    // add query param 'page' to the url
    this.router.navigate(['comics'], { queryParams: { page: this.p } });
  }
}
