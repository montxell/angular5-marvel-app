export class Comic {
  id: number;
  title: string;
  pageCount: number;
  description: string;
  prices: Prices[];
  thumbnail: Thumbnail;
  characters: Characters;
  creators: Creators;

  constructor(comic?) {
    this.id = comic && comic.id ? comic.id : null;
    this.title = comic && comic.title ? comic.title : null;
    this.pageCount = comic && comic.pageCount ? comic.pageCount : null;
    this.description = comic && comic.description ? comic.description : null;
    this.prices = comic && comic.prices ? comic.prices : null;
    this.thumbnail = comic && comic.thumbnail ? comic.thumbnail : null;
    this.characters = comic && comic.comics ? comic.comics : null;
    this.creators = comic && comic.creators ? comic.creators : null;
  }
}

export class Thumbnail {
  path: number;
  extension: string;
}

export class Dates {
  type: string;
  date: Date;
}

export class Prices {
  type: string;
  price: number;
}

export class Characters {
  available: number;
  items: Items[];
}

export class Creators {
  available: number;
  items: Items[];
}

export class Items {
  resourceURI: string;
  name: string;
  role?: string;
}
