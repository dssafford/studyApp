package doug.com.web.rest;

import doug.com.StudyApp;

import doug.com.domain.Journal;
import doug.com.repository.JournalRepository;
import doug.com.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static doug.com.web.rest.TestUtil.sameInstant;
import static doug.com.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the JournalResource REST controller.
 *
 * @see JournalResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StudyApp.class)
public class JournalResourceIntTest {

    private static final ZonedDateTime DEFAULT_DATE_ADDED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_ADDED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_PROJECT = "AAAAAAAAAA";
    private static final String UPDATED_PROJECT = "BBBBBBBBBB";

    private static final String DEFAULT_FILE_DIRECTORY = "AAAAAAAAAA";
    private static final String UPDATED_FILE_DIRECTORY = "BBBBBBBBBB";

    private static final String DEFAULT_MACHINE = "AAAAAAAAAA";
    private static final String UPDATED_MACHINE = "BBBBBBBBBB";

    private static final String DEFAULT_TECHNOLOGY = "AAAAAAAAAA";
    private static final String UPDATED_TECHNOLOGY = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENTS = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTS = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ACTIVE = false;
    private static final Boolean UPDATED_IS_ACTIVE = true;

    @Autowired
    private JournalRepository journalRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJournalMockMvc;

    private Journal journal;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JournalResource journalResource = new JournalResource(journalRepository);
        this.restJournalMockMvc = MockMvcBuilders.standaloneSetup(journalResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Journal createEntity(EntityManager em) {
        Journal journal = new Journal()
            .dateAdded(DEFAULT_DATE_ADDED)
            .project(DEFAULT_PROJECT)
            .fileDirectory(DEFAULT_FILE_DIRECTORY)
            .machine(DEFAULT_MACHINE)
            .technology(DEFAULT_TECHNOLOGY)
            .version(DEFAULT_VERSION)
            .comments(DEFAULT_COMMENTS)
            .isActive(DEFAULT_IS_ACTIVE);
        return journal;
    }

    @Before
    public void initTest() {
        journal = createEntity(em);
    }

    @Test
    @Transactional
    public void createJournal() throws Exception {
        int databaseSizeBeforeCreate = journalRepository.findAll().size();

        // Create the Journal
        restJournalMockMvc.perform(post("/api/journals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(journal)))
            .andExpect(status().isCreated());

        // Validate the Journal in the database
        List<Journal> journalList = journalRepository.findAll();
        assertThat(journalList).hasSize(databaseSizeBeforeCreate + 1);
        Journal testJournal = journalList.get(journalList.size() - 1);
        assertThat(testJournal.getDateAdded()).isEqualTo(DEFAULT_DATE_ADDED);
        assertThat(testJournal.getProject()).isEqualTo(DEFAULT_PROJECT);
        assertThat(testJournal.getFileDirectory()).isEqualTo(DEFAULT_FILE_DIRECTORY);
        assertThat(testJournal.getMachine()).isEqualTo(DEFAULT_MACHINE);
        assertThat(testJournal.getTechnology()).isEqualTo(DEFAULT_TECHNOLOGY);
        assertThat(testJournal.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testJournal.getComments()).isEqualTo(DEFAULT_COMMENTS);
        assertThat(testJournal.isIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
    }

    @Test
    @Transactional
    public void createJournalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = journalRepository.findAll().size();

        // Create the Journal with an existing ID
        journal.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJournalMockMvc.perform(post("/api/journals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(journal)))
            .andExpect(status().isBadRequest());

        // Validate the Journal in the database
        List<Journal> journalList = journalRepository.findAll();
        assertThat(journalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJournals() throws Exception {
        // Initialize the database
        journalRepository.saveAndFlush(journal);

        // Get all the journalList
        restJournalMockMvc.perform(get("/api/journals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(journal.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateAdded").value(hasItem(sameInstant(DEFAULT_DATE_ADDED))))
            .andExpect(jsonPath("$.[*].project").value(hasItem(DEFAULT_PROJECT.toString())))
            .andExpect(jsonPath("$.[*].fileDirectory").value(hasItem(DEFAULT_FILE_DIRECTORY.toString())))
            .andExpect(jsonPath("$.[*].machine").value(hasItem(DEFAULT_MACHINE.toString())))
            .andExpect(jsonPath("$.[*].technology").value(hasItem(DEFAULT_TECHNOLOGY.toString())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION.toString())))
            .andExpect(jsonPath("$.[*].comments").value(hasItem(DEFAULT_COMMENTS.toString())))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.booleanValue())));
    }

    @Test
    @Transactional
    public void getJournal() throws Exception {
        // Initialize the database
        journalRepository.saveAndFlush(journal);

        // Get the journal
        restJournalMockMvc.perform(get("/api/journals/{id}", journal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(journal.getId().intValue()))
            .andExpect(jsonPath("$.dateAdded").value(sameInstant(DEFAULT_DATE_ADDED)))
            .andExpect(jsonPath("$.project").value(DEFAULT_PROJECT.toString()))
            .andExpect(jsonPath("$.fileDirectory").value(DEFAULT_FILE_DIRECTORY.toString()))
            .andExpect(jsonPath("$.machine").value(DEFAULT_MACHINE.toString()))
            .andExpect(jsonPath("$.technology").value(DEFAULT_TECHNOLOGY.toString()))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION.toString()))
            .andExpect(jsonPath("$.comments").value(DEFAULT_COMMENTS.toString()))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingJournal() throws Exception {
        // Get the journal
        restJournalMockMvc.perform(get("/api/journals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJournal() throws Exception {
        // Initialize the database
        journalRepository.saveAndFlush(journal);
        int databaseSizeBeforeUpdate = journalRepository.findAll().size();

        // Update the journal
        Journal updatedJournal = journalRepository.findOne(journal.getId());
        // Disconnect from session so that the updates on updatedJournal are not directly saved in db
        em.detach(updatedJournal);
        updatedJournal
            .dateAdded(UPDATED_DATE_ADDED)
            .project(UPDATED_PROJECT)
            .fileDirectory(UPDATED_FILE_DIRECTORY)
            .machine(UPDATED_MACHINE)
            .technology(UPDATED_TECHNOLOGY)
            .version(UPDATED_VERSION)
            .comments(UPDATED_COMMENTS)
            .isActive(UPDATED_IS_ACTIVE);

        restJournalMockMvc.perform(put("/api/journals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJournal)))
            .andExpect(status().isOk());

        // Validate the Journal in the database
        List<Journal> journalList = journalRepository.findAll();
        assertThat(journalList).hasSize(databaseSizeBeforeUpdate);
        Journal testJournal = journalList.get(journalList.size() - 1);
        assertThat(testJournal.getDateAdded()).isEqualTo(UPDATED_DATE_ADDED);
        assertThat(testJournal.getProject()).isEqualTo(UPDATED_PROJECT);
        assertThat(testJournal.getFileDirectory()).isEqualTo(UPDATED_FILE_DIRECTORY);
        assertThat(testJournal.getMachine()).isEqualTo(UPDATED_MACHINE);
        assertThat(testJournal.getTechnology()).isEqualTo(UPDATED_TECHNOLOGY);
        assertThat(testJournal.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testJournal.getComments()).isEqualTo(UPDATED_COMMENTS);
        assertThat(testJournal.isIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingJournal() throws Exception {
        int databaseSizeBeforeUpdate = journalRepository.findAll().size();

        // Create the Journal

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restJournalMockMvc.perform(put("/api/journals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(journal)))
            .andExpect(status().isCreated());

        // Validate the Journal in the database
        List<Journal> journalList = journalRepository.findAll();
        assertThat(journalList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteJournal() throws Exception {
        // Initialize the database
        journalRepository.saveAndFlush(journal);
        int databaseSizeBeforeDelete = journalRepository.findAll().size();

        // Get the journal
        restJournalMockMvc.perform(delete("/api/journals/{id}", journal.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Journal> journalList = journalRepository.findAll();
        assertThat(journalList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Journal.class);
        Journal journal1 = new Journal();
        journal1.setId(1L);
        Journal journal2 = new Journal();
        journal2.setId(journal1.getId());
        assertThat(journal1).isEqualTo(journal2);
        journal2.setId(2L);
        assertThat(journal1).isNotEqualTo(journal2);
        journal1.setId(null);
        assertThat(journal1).isNotEqualTo(journal2);
    }
}
