package com.example.Lib.service;

import com.example.Lib.model.Book;
import com.example.Lib.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    // Lire tous les livres
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Lire un livre par son ID
    public Optional<Book> getBookById(String id) {
        return bookRepository.findById(id);
    }
    
    // Method to check if ISBN exists
    public boolean doesIsbnExist(String isbn) {
        return bookRepository.existsByIsbn(isbn);
    }
    
    public boolean doesBookExistById(String id) {
        return bookRepository.existsById(id);
    }

    // Créer ou mettre à jour un livre
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    // Supprimer un livre par son ID
    public void deleteBook(String id) {
        bookRepository.deleteById(id);
    }
}
