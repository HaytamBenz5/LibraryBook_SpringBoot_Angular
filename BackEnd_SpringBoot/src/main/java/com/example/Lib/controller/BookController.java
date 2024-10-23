package com.example.Lib.controller;

import com.example.Lib.model.Book;
import com.example.Lib.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    // Lire tous les livres
    @GetMapping("/list")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    // Lire un livre par son ID
    @GetMapping("/show/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable("id") String id) {
        Optional<Book> book = bookService.getBookById(id);
        if (book.isPresent()) {
            return new ResponseEntity<>(book.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Créer ou mettre à jour un livre
    @PostMapping("/add")
    public ResponseEntity<?> createOrUpdateBook(@RequestBody Book book) {
        // Check if the book already exists by ID
        if (book.getId() != null && bookService.doesBookExistById(book.getId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Book with this ID already exists."); // Return a conflict status
        }

        // Check if the ISBN already exists
        if (bookService.doesIsbnExist(book.getIsbn())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("ISBN already exists."); // Return a conflict status
        }
        
        // Save the book if ID and ISBN are unique
        Book savedBook = bookService.saveBook(book);
        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }

    // Supprimer un livre par son ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable("id") String id) {
        Optional<Book> book = bookService.getBookById(id);
        if (book.isPresent()) {
            bookService.deleteBook(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/modify/{id}")
    public ResponseEntity<?> modifyBook(@PathVariable("id") String id, @RequestBody Book updatedBook) {
        // Fetch the book by custom 'id' field
        Optional<Book> existingBookOptional = bookService.getBookById(id);

        if (existingBookOptional.isPresent()) {
            Book existingBook = existingBookOptional.get();
            
            // Update the book fields
            existingBook.setTitle(updatedBook.getTitle());
            existingBook.setAuthor(updatedBook.getAuthor());
            existingBook.setIsbn(updatedBook.getIsbn());
            existingBook.setAvailable(updatedBook.isAvailable());

            // Save the updated book and return it
            return ResponseEntity.ok(bookService.saveBook(existingBook));
        }

        // If the book is not found, return a personalized error message
        return ResponseEntity.status(404).body("Book not found with ID: " + id);
    }
}
