package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Document")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String title;
    String content;
    String date;
    String contractOwner;
    String contractTarget;
    String dateEnd;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    public Document() {

    }

    public Document(String title, String content, String date, String contractOwner, String contractTarget,
            String dateEnd) {
        this.title = title;
        this.content = content;
        this.date = date;
        this.contractOwner = contractOwner;
        this.contractTarget = contractTarget;
        this.dateEnd = dateEnd;
    }

    public Document(Document doc) {
        this.title = doc.title;
        this.content = doc.content;
        this.date = doc.date;
        this.contractOwner = doc.contractOwner;
        this.contractTarget = doc.contractTarget;
        this.dateEnd = doc.dateEnd;
        this.user = doc.user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getContractOwner() {
        return contractOwner;
    }

    public void setContractOwner(String contractOwner) {
        this.contractOwner = contractOwner;
    }

    public String getContractTarget() {
        return contractTarget;
    }

    public void setContractTarget(String contractTarget) {
        this.contractTarget = contractTarget;
    }

    public String getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(String dateEnd) {
        this.dateEnd = dateEnd;
    }
}
