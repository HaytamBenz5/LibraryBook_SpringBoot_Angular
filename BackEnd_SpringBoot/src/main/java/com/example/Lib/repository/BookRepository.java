package com.example.Lib.repository;

import com.example.Lib.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {
    // Pas besoin d'ajouter des méthodes spécifiques pour CRUD, MongoRepository fournit déjà les méthodes nécessaires.

    Optional<Book> findById(String id);
    boolean existsByIsbn(String isbn);
    boolean existsById(Long id); // Check if ID exists

}
