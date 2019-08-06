package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsBreathingSafetyTest;
import cn.com.cnc.fcc.repository.QmsBreathingSafetyTestRepository;
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
 * REST controller for managing QmsBreathingSafetyTest.
 */
@RestController
@RequestMapping("/api")
public class QmsBreathingSafetyTestResource {

    private final Logger log = LoggerFactory.getLogger(QmsBreathingSafetyTestResource.class);

    private static final String ENTITY_NAME = "qmsBreathingSafetyTest";

    private final QmsBreathingSafetyTestRepository qmsBreathingSafetyTestRepository;

    public QmsBreathingSafetyTestResource(QmsBreathingSafetyTestRepository qmsBreathingSafetyTestRepository) {
        this.qmsBreathingSafetyTestRepository = qmsBreathingSafetyTestRepository;
    }

    /**
     * POST  /qms-breathing-safety-tests : Create a new qmsBreathingSafetyTest.
     *
     * @param qmsBreathingSafetyTest the qmsBreathingSafetyTest to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsBreathingSafetyTest, or with status 400 (Bad Request) if the qmsBreathingSafetyTest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-breathing-safety-tests")
    @Timed
    public ResponseEntity<QmsBreathingSafetyTest> createQmsBreathingSafetyTest(@Valid @RequestBody QmsBreathingSafetyTest qmsBreathingSafetyTest) throws URISyntaxException {
        log.debug("REST request to save QmsBreathingSafetyTest : {}", qmsBreathingSafetyTest);
        if (qmsBreathingSafetyTest.getId() != null) {
            throw new BadRequestAlertException("A new qmsBreathingSafetyTest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsBreathingSafetyTest result = qmsBreathingSafetyTestRepository.save(qmsBreathingSafetyTest);
        return ResponseEntity.created(new URI("/api/qms-breathing-safety-tests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-breathing-safety-tests : Updates an existing qmsBreathingSafetyTest.
     *
     * @param qmsBreathingSafetyTest the qmsBreathingSafetyTest to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsBreathingSafetyTest,
     * or with status 400 (Bad Request) if the qmsBreathingSafetyTest is not valid,
     * or with status 500 (Internal Server Error) if the qmsBreathingSafetyTest couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-breathing-safety-tests")
    @Timed
    public ResponseEntity<QmsBreathingSafetyTest> updateQmsBreathingSafetyTest(@Valid @RequestBody QmsBreathingSafetyTest qmsBreathingSafetyTest) throws URISyntaxException {
        log.debug("REST request to update QmsBreathingSafetyTest : {}", qmsBreathingSafetyTest);
        if (qmsBreathingSafetyTest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsBreathingSafetyTest result = qmsBreathingSafetyTestRepository.save(qmsBreathingSafetyTest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsBreathingSafetyTest.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-breathing-safety-tests : get all the qmsBreathingSafetyTests.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsBreathingSafetyTests in body
     */
    @GetMapping("/qms-breathing-safety-tests")
    @Timed
    public ResponseEntity<List<QmsBreathingSafetyTest>> getAllQmsBreathingSafetyTests(Pageable pageable) {
        log.debug("REST request to get a page of QmsBreathingSafetyTests");
        Page<QmsBreathingSafetyTest> page = qmsBreathingSafetyTestRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-breathing-safety-tests");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-breathing-safety-tests/:id : get the "id" qmsBreathingSafetyTest.
     *
     * @param id the id of the qmsBreathingSafetyTest to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsBreathingSafetyTest, or with status 404 (Not Found)
     */
    @GetMapping("/qms-breathing-safety-tests/{id}")
    @Timed
    public ResponseEntity<QmsBreathingSafetyTest> getQmsBreathingSafetyTest(@PathVariable Long id) {
        log.debug("REST request to get QmsBreathingSafetyTest : {}", id);
        Optional<QmsBreathingSafetyTest> qmsBreathingSafetyTest = qmsBreathingSafetyTestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsBreathingSafetyTest);
    }

    /**
     * DELETE  /qms-breathing-safety-tests/:id : delete the "id" qmsBreathingSafetyTest.
     *
     * @param id the id of the qmsBreathingSafetyTest to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-breathing-safety-tests/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsBreathingSafetyTest(@PathVariable Long id) {
        log.debug("REST request to delete QmsBreathingSafetyTest : {}", id);

        qmsBreathingSafetyTestRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
