export class Book {
  static nextId: number = 1; 
    id: number;
    title: string;
    author: string;
    isbn: string;
    available: boolean;
  
    constructor(id: number, title: string, author: string, isbn: string, available: boolean) {
      this.id = id ?? Book.nextId++;
      this.title = title;
      this.author = author;
      this.isbn = isbn;
      this.available = available;
    }
  }
  