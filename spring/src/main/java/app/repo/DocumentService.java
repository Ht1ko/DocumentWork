package app.repo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import app.model.Document;
import app.model.User;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepo documentRepo;

    @Autowired
    private UserRepository userRepo;

    public Iterable<Document> findAll() {
        return documentRepo.findAll();
    }
    public Page<Document> findAll(int p) {
        Pageable pa=PageRequest.of(p, 5);
        
        return documentRepo.findAll(pa);
    }

    public Page<Document> findByUserId(Long userId,int p) {

        Page<Document> page;
        Pageable pa=PageRequest.of(p,5);
        page = documentRepo.findByUserId(userId,pa);
        return page;
    }

    public Iterable<Document> findByUserId(Long userId) {
        User user = userRepo.findById(userId).get();
        return documentRepo.findByUserId(user.getId());
    }

    public Document findById(Long id) {
        Document doc = documentRepo.findById(id).get();
        return doc;
    }

    public void update(Document doc, Long userId) {
        User user = userRepo.findById(userId).get();
        doc.setUser(user);

        documentRepo.save(doc);
    }

    public void save(Document doc, Long userId) {
        User user = userRepo.findById(userId).get();
        Document mess = new Document(doc);
        mess.setUser(user);

        documentRepo.save(mess);

    }

}
