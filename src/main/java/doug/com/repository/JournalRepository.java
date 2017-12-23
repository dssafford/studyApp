package doug.com.repository;

import doug.com.domain.Journal;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Journal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JournalRepository extends JpaRepository<Journal, Long> {

}
