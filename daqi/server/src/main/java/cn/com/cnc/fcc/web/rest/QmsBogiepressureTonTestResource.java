package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsBogiepressureTonTest;
import cn.com.cnc.fcc.repository.QmsBogiepressureTonTestRepository;
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
 * REST controller for managing QmsBogiepressureTonTest.
 */
@RestController
@RequestMapping("/api")
public class QmsBogiepressureTonTestResource {

    private final Logger log = LoggerFactory.getLogger(QmsBogiepressureTonTestResource.class);

    private static final String ENTITY_NAME = "qmsBogiepressureTonTest";

    private final QmsBogiepressureTonTestRepository qmsBogiepressureTonTestRepository;

    public QmsBogiepressureTonTestResource(QmsBogiepressureTonTestRepository qmsBogiepressureTonTestRepository) {
        this.qmsBogiepressureTonTestRepository = qmsBogiepressureTonTestRepository;
    }

    /**
     * POST  /qms-bogiepressure-ton-tests : Create a new qmsBogiepressureTonTest.
     *
     * @param qmsBogiepressureTonTest the qmsBogiepressureTonTest to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsBogiepressureTonTest, or with status 400 (Bad Request) if the qmsBogiepressureTonTest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-bogiepressure-ton-tests")
    @Timed
    public ResponseEntity<QmsBogiepressureTonTest> createQmsBogiepressureTonTest(@Valid @RequestBody QmsBogiepressureTonTest qmsBogiepressureTonTest) throws URISyntaxException {
        log.debug("REST request to save QmsBogiepressureTonTest : {}", qmsBogiepressureTonTest);
        if (qmsBogiepressureTonTest.getId() != null) {
            throw new BadRequestAlertException("A new qmsBogiepressureTonTest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsBogiepressureTonTest result = qmsBogiepressureTonTestRepository.save(qmsBogiepressureTonTest);
        return ResponseEntity.created(new URI("/api/qms-bogiepressure-ton-tests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-bogiepressure-ton-tests : Updates an existing qmsBogiepressureTonTest.
     *
     * @param qmsBogiepressureTonTest the qmsBogiepressureTonTest to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsBogiepressureTonTest,
     * or with status 400 (Bad Request) if the qmsBogiepressureTonTest is not valid,
     * or with status 500 (Internal Server Error) if the qmsBogiepressureTonTest couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-bogiepressure-ton-tests")
    @Timed
    public ResponseEntity<QmsBogiepressureTonTest> updateQmsBogiepressureTonTest(@Valid @RequestBody QmsBogiepressureTonTest qmsBogiepressureTonTest) throws URISyntaxException {
        log.debug("REST request to update QmsBogiepressureTonTest : {}", qmsBogiepressureTonTest);
        if (qmsBogiepressureTonTest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsBogiepressureTonTest result = qmsBogiepressureTonTestRepository.save(qmsBogiepressureTonTest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsBogiepressureTonTest.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-bogiepressure-ton-tests : get all the qmsBogiepressureTonTests.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsBogiepressureTonTests in body
     */
    @GetMapping("/qms-bogiepressure-ton-tests")
    @Timed
    public ResponseEntity<List<QmsBogiepressureTonTest>> getAllQmsBogiepressureTonTests(Pageable pageable) {
        log.debug("REST request to get a page of QmsBogiepressureTonTests");
        Page<QmsBogiepressureTonTest> page = qmsBogiepressureTonTestRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-bogiepressure-ton-tests");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-bogiepressure-ton-tests/:id : get the "id" qmsBogiepressureTonTest.
     *
     * @param id the id of the qmsBogiepressureTonTest to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsBogiepressureTonTest, or with status 404 (Not Found)
     */
    @GetMapping("/qms-bogiepressure-ton-tests/{id}")
    @Timed
    public ResponseEntity<QmsBogiepressureTonTest> getQmsBogiepressureTonTest(@PathVariable Long id) {
        log.debug("REST request to get QmsBogiepressureTonTest : {}", id);
        Optional<QmsBogiepressureTonTest> qmsBogiepressureTonTest = qmsBogiepressureTonTestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsBogiepressureTonTest);
    }

    /**
     * DELETE  /qms-bogiepressure-ton-tests/:id : delete the "id" qmsBogiepressureTonTest.
     *
     * @param id the id of the qmsBogiepressureTonTest to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-bogiepressure-ton-tests/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsBogiepressureTonTest(@PathVariable Long id) {
        log.debug("REST request to delete QmsBogiepressureTonTest : {}", id);

        qmsBogiepressureTonTestRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
