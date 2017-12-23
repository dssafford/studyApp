package doug.com.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Journal.
 */
@Entity
@Table(name = "journal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Journal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_added")
    private ZonedDateTime dateAdded;

    @Column(name = "project")
    private String project;

    @Column(name = "file_directory")
    private String fileDirectory;

    @Column(name = "machine")
    private String machine;

    @Column(name = "technology")
    private String technology;

    @Column(name = "version")
    private String version;

    @Column(name = "comments")
    private String comments;

    @Column(name = "is_active")
    private Boolean isActive;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDateAdded() {
        return dateAdded;
    }

    public Journal dateAdded(ZonedDateTime dateAdded) {
        this.dateAdded = dateAdded;
        return this;
    }

    public void setDateAdded(ZonedDateTime dateAdded) {
        this.dateAdded = dateAdded;
    }

    public String getProject() {
        return project;
    }

    public Journal project(String project) {
        this.project = project;
        return this;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public String getFileDirectory() {
        return fileDirectory;
    }

    public Journal fileDirectory(String fileDirectory) {
        this.fileDirectory = fileDirectory;
        return this;
    }

    public void setFileDirectory(String fileDirectory) {
        this.fileDirectory = fileDirectory;
    }

    public String getMachine() {
        return machine;
    }

    public Journal machine(String machine) {
        this.machine = machine;
        return this;
    }

    public void setMachine(String machine) {
        this.machine = machine;
    }

    public String getTechnology() {
        return technology;
    }

    public Journal technology(String technology) {
        this.technology = technology;
        return this;
    }

    public void setTechnology(String technology) {
        this.technology = technology;
    }

    public String getVersion() {
        return version;
    }

    public Journal version(String version) {
        this.version = version;
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getComments() {
        return comments;
    }

    public Journal comments(String comments) {
        this.comments = comments;
        return this;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public Journal isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Journal journal = (Journal) o;
        if (journal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), journal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Journal{" +
            "id=" + getId() +
            ", dateAdded='" + getDateAdded() + "'" +
            ", project='" + getProject() + "'" +
            ", fileDirectory='" + getFileDirectory() + "'" +
            ", machine='" + getMachine() + "'" +
            ", technology='" + getTechnology() + "'" +
            ", version='" + getVersion() + "'" +
            ", comments='" + getComments() + "'" +
            ", isActive='" + isIsActive() + "'" +
            "}";
    }
}
