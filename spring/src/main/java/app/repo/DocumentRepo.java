package app.repo;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import app.model.Document;

public interface DocumentRepo extends  JpaRepository<Document, Long> {
        Document findByTitle(String Title);
        Iterable<Document> findByUserId(Long user);
        Page<Document> findAll(Pageable pageable);
        Page<Document> findByUserId(Long user,Pageable pageable);
        Void deleteById(long id);
}
