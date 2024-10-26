import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Book } from '../models/book.model'; // Adjust the import path
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { CommonModule } from '@angular/common'; // Import CommonModule
import { NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ModalComponent } from '../modal/modal.component'; // Adjust the path based on your file structure

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, RouterLink, NavbarComponent, FormsModule, CommonModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  BookAdded = false;
  BookUploaded = false;
  selectedFile: File | null = null; // Variable to hold the selected file

  fillAll = false;
  books: Book[] = []; // Assuming there's a books array to store added books

  constructor(private http: HttpClient) {} // Inject HttpClient


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file; // Store the selected file
      this.BookUploaded=true;
    } else {
      this.selectedFile = null; // Reset if the file is not a PDF
    }
  }

  addBook(form: NgForm) {
    // Check if the form is valid
    if (form.valid) {
        const savingBook: Book = {
          id :Book.nextId++,
          title: form.value.titre,
          author: form.value.author,
          isbn: form.value.isbn,
          available:  this.BookUploaded // Convert string to boolean
        };
        console.log('f',form.value.titre);

      this.http.post<Book>('http://localhost:8080/add', savingBook).subscribe(
        data => {
          // Optionally, you can add the newly added book to the local books array
          this.books.push(data); // Assuming the response returns the newly added book with the generated id
          
          console.log('Book added:', data);
          
          // Set flags for UI feedback
          this.BookAdded = true;
          this.fillAll = false;
        },
        error => {
          console.error('Error adding book:', error);
          this.fillAll = true; // Show the fill-all error if the HTTP request fails
          Book.nextId--;
        }
      );
    } else {
      this.fillAll = true; // Show error if the form is not valid
    }
  }
}
