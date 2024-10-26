import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { BrowserModule } from '@angular/platform-browser';
import { Book } from '../models/book.model'; // Import the new Book model
import { ModalComponent } from '../modal/modal.component'; // Adjust the path based on your file structure
import { environment } from '../../environments/environment'; // Adjust the path if needed

@Component({
  selector: 'app-book-library',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, RouterLink, CommonModule, NavbarComponent,ModalComponent,FormsModule], // Include CommonModule here
  templateUrl: './book-library.component.html',
  styleUrls: ['./book-library.component.css']
})
export class BookLibraryComponent {
  apiUrl = environment.apiUrl;
  showModal = false;
  books: Book[] = []; // Use the Book model instead of any[]
  selectedBook: Book = new Book(0, '', '', '', false);// Use Book model for selectedBook

  openModal(book: Book) {
    this.selectedBook = Object.assign({}, book); // Create a shallow copy
    this.showModal = true; // Show the modal
    
  }

  closeModal() {
    this.showModal = false;
  }


  constructor(private http: HttpClient) {
    this.getBooks();
  }

  // Fetch books from the API and map them to the Book model
  getBooks(): void {

    this.http.get<Book[]>('http://localhost:8080/list').subscribe(data => {
      this.books = data;
      console.log(data[0].id);
    });
    
  }

  // Delete a book by ID
  deleteBooks(id: number): void {
    this.http.delete<any>(`http://localhost:8080/delete/${id}`).subscribe(data => {
      this.books = this.books.filter(book => book.id !== id); // Update the books array after deletion
      console.log(`Deleted book with id: ${id}`);
    }, error => {
      console.error('Error deleting book:', error);
    });
  }
  onSaveBook(modifiedBook: Book) {
    // Call modifyBooks with the updated book data
    this.modifyBooks(modifiedBook.id, modifiedBook.title, modifiedBook.author, modifiedBook.isbn, modifiedBook.available);
    this.showModal = false; // Close the modal
  }
  ajouterLivre(){

  }

  openPdf(bookId: string) {
    window.open(`${this.apiUrl}/viewPdf/${bookId}`, '_blank');
}
  // Modify a book by ID
  modifyBooks(id: number, title: string, author: string, isbn: string, available: boolean): void {
    const updatedBook: Book = { id, title, author, isbn, available }; // Create an updated book object

    this.http.post<any>(`http://localhost:8080/modify/${id}`, updatedBook).subscribe(data => {
      // Update the books array with the modified book
      this.books = this.books.map(book => book.id === id ? updatedBook : book);
      console.log(`Modified book with id: ${id}`);
    }, error => {
      console.error('Error modifying book:', error);
    });
  }
}

