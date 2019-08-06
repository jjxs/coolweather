package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsIntelligentTriggerTest;
import cn.com.cnc.fcc.repository.QmsIntelligentTriggerTestRepository;
import cn.com.cnc.fcc.web.rest.errors.BadRequestAlertException;
import cn.com.cnc.fcc.web.rest.util.HeaderUtil;
import cn.com.cnc.fcc.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing QmsIntelligentTriggerTest.
 */
@RestController
@RequestMapping("/api")
public class QmsIntelligentTriggerTestResource {

    private final Logger log = LoggerFactory.getLogger(QmsIntelligentTriggerTestResource.class);

    private static final String ENTITY_NAME = "qmsIntelligentTriggerTest";

    private final QmsIntelligentTriggerTestRepository qmsIntelligentTriggerTestRepository;

    public QmsIntelligentTriggerTestResource(QmsIntelligentTriggerTestRepository qmsIntelligentTriggerTestRepository) {
        this.qmsIntelligentTriggerTestRepository = qmsIntelligentTriggerTestRepository;
    }

    /**
     * POST  /qms-intelligent-trigger-tests : Create a new qmsIntelligentTriggerTest.
     *
     * @param qmsIntelligentTriggerTest the qmsIntelligentTriggerTest to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsIntelligentTriggerTest, or with status 400 (Bad Request) if the qmsIntelligentTriggerTest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-intelligent-trigger-tests")
    @Timed
    public ResponseEntity<QmsIntelligentTriggerTest> createQmsIntelligentTriggerTest(@Valid @RequestBody QmsIntelligentTriggerTest qmsIntelligentTriggerTest) throws URISyntaxException {
        log.debug("REST request to save QmsIntelligentTriggerTest : {}", qmsIntelligentTriggerTest);
        if (qmsIntelligentTriggerTest.getId() != null) {
            throw new BadRequestAlertException("A new qmsIntelligentTriggerTest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsIntelligentTriggerTest result = qmsIntelligentTriggerTestRepository.save(qmsIntelligentTriggerTest);
        return ResponseEntity.created(new URI("/api/qms-intelligent-trigger-tests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-intelligent-trigger-tests : Updates an existing qmsIntelligentTriggerTest.
     *
     * @param qmsIntelligentTriggerTest the qmsIntelligentTriggerTest to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsIntelligentTriggerTest,
     * or with status 400 (Bad Request) if the qmsIntelligentTriggerTest is not valid,
     * or with status 500 (Internal Server Error) if the qmsIntelligentTriggerTest couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-intelligent-trigger-tests")
    @Timed
    public ResponseEntity<QmsIntelligentTriggerTest> updateQmsIntelligentTriggerTest(@Valid @RequestBody QmsIntelligentTriggerTest qmsIntelligentTriggerTest) throws URISyntaxException {
        log.debug("REST request to update QmsIntelligentTriggerTest : {}", qmsIntelligentTriggerTest);
        if (qmsIntelligentTriggerTest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsIntelligentTriggerTest result = qmsIntelligentTriggerTestRepository.save(qmsIntelligentTriggerTest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsIntelligentTriggerTest.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-intelligent-trigger-tests : get all the qmsIntelligentTriggerTests.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsIntelligentTriggerTests in body
     */
    @GetMapping("/qms-intelligent-trigger-tests")
    @Timed
    public ResponseEntity<List<QmsIntelligentTriggerTest>> getAllQmsIntelligentTriggerTests(Pageable pageable) {
        log.debug("REST request to get a page of QmsIntelligentTriggerTests");
        Page<QmsIntelligentTriggerTest> page = qmsIntelligentTriggerTestRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-intelligent-trigger-tests");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-intelligent-trigger-tests/:id : get the "id" qmsIntelligentTriggerTest.
     *
     * @param id the id of the qmsIntelligentTriggerTest to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsIntelligentTriggerTest, or with status 404 (Not Found)
     */
    @GetMapping("/qms-intelligent-trigger-tests/{id}")
    @Timed
    public ResponseEntity<QmsIntelligentTriggerTest> getQmsIntelligentTriggerTest(@PathVariable Long id) {
        log.debug("REST request to get QmsIntelligentTriggerTest : {}", id);
        Optional<QmsIntelligentTriggerTest> qmsIntelligentTriggerTest = qmsIntelligentTriggerTestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsIntelligentTriggerTest);
    }

    /**
     * DELETE  /qms-intelligent-trigger-tests/:id : delete the "id" qmsIntelligentTriggerTest.
     *
     * @param id the id of the qmsIntelligentTriggerTest to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-intelligent-trigger-tests/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsIntelligentTriggerTest(@PathVariable Long id) {
        log.debug("REST request to delete QmsIntelligentTriggerTest : {}", id);

        qmsIntelligentTriggerTestRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
