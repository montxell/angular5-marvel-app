export class Character {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  comics: Comics;

  constructor(character?) {
    this.id = character && character.id ? character.id : null;
    this.name = character && character.name ? character.name : null;
    this.description =
      character && character.description ? character.description : null;
    this.thumbnail =
      character && character.thumbnail ? character.thumbnail : null;
    this.comics = character && character.comics ? character.comics : null;
  }
}

export class Thumbnail {
  path: number;
  extension: string;
}

export class Comics {
  available: number;
  items: Items[];
}

export class Items {
  resourceURI: string;
  name: string;
}
