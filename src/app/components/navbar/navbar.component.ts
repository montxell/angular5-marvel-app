import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  searchCharacter(term: string) {
    term = term.trim();
    if (!term) {
      return;
    }

    console.log(term);

    this.router.navigate(['/search', term]);
  }
}
