package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsBogiepressurePositiveTest;
import cn.com.cnc.fcc.repository.QmsBogiepressurePositiveTestRepository;
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
 * REST controller for managing QmsBogiepressurePositiveTest.
 */
@RestController
@RequestMapping("/api")
public class QmsBogiepressurePositiveTestResource {

    private final Logger log = LoggerFactory.getLogger(QmsBogiepressurePositiveTestResource.class);

    private static final String ENTITY_NAME = "qmsBogiepressurePositiveTest";

    private final QmsBogiepressurePositiveTestRepository qmsBogiepressurePositiveTestRepository;

    public QmsBogiepressurePositiveTestResource(QmsBogiepressurePositiveTestRepository qmsBogiepressurePositiveTestRepository) {
        this.qmsBogiepressurePositiveTestRepository = qmsBogiepressurePositiveTestRepository;
    }

    /**
     * POST  /qms-bogiepressure-positive-tests : Create a new qmsBogiepressurePositiveTest.
     *
     * @param qmsBogiepressurePositiveTest the qmsBogiepressurePositiveTest to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsBogiepressurePositiveTest, or with status 400 (Bad Request) if the qmsBogiepressurePositiveTest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-bogiepressure-positive-tests")
    @Timed
    public ResponseEntity<QmsBogiepressurePositiveTest> createQmsBogiepressurePositiveTest(@Valid @RequestBody QmsBogiepressurePositiveTest qmsBogiepressurePositiveTest) throws URISyntaxException {
        log.debug("REST request to save QmsBogiepressurePositiveTest : {}", qmsBogiepressurePositiveTest);
        if (qmsBogiepressurePositiveTest.getId() != null) {
            throw new BadRequestAlertException("A new qmsBogiepressurePositiveTest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsBogiepressurePositiveTest result = qmsBogiepressurePositiveTestRepository.save(qmsBogiepressurePositiveTest);
        return ResponseEntity.created(new URI("/api/qms-bogiepressure-positive-tests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-bogiepressure-positive-tests : Updates an existing qmsBogiepressurePositiveTest.
     *
     * @param qmsBogiepressurePositiveTest the qmsBogiepressurePositiveTest to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsBogiepressurePositiveTest,
     * or with status 400 (Bad Request) if the qmsBogiepressurePositiveTest is not valid,
     * or with status 500 (Internal Server Error) if the qmsBogiepressurePositiveTest couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-bogiepressure-positive-tests")
    @Timed
    public ResponseEntity<QmsBogiepressurePositiveTest> updateQmsBogiepressurePositiveTest(@Valid @RequestBody QmsBogiepressurePositiveTest qmsBogiepressurePositiveTest) throws URISyntaxException {
        log.debug("REST request to update QmsBogiepressurePositiveTest : {}", qmsBogiepressurePositiveTest);
        if (qmsBogiepressurePositiveTest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsBogiepressurePositiveTest result = qmsBogiepressurePositiveTestRepository.save(qmsBogiepressurePositiveTest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsBogiepressurePositiveTest.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-bogiepressure-positive-tests : get all the qmsBogiepressurePositiveTests.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsBogiepressurePositiveTests in body
     */
    @GetMapping("/qms-bogiepressure-positive-tests")
    @Timed
    public ResponseEntity<List<QmsBogiepressurePositiveTest>> getAllQmsBogiepressurePositiveTests(Pageable pageable) {
        log.debug("REST request to get a page of QmsBogiepressurePositiveTests");
        Page<QmsBogiepressurePositiveTest> page = qmsBogiepressurePositiveTestRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-bogiepressure-positive-tests");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-bogiepressure-positive-tests/:id : get the "id" qmsBogiepressurePositiveTest.
     *
     * @param id the id of the qmsBogiepressurePositiveTest to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsBogiepressurePositiveTest, or with status 404 (Not Found)
     */
    @GetMapping("/qms-bogiepressure-positive-tests/{id}")
    @Timed
    public ResponseEntity<QmsBogiepressurePositiveTest> getQmsBogiepressurePositiveTest(@PathVariable Long id) {
        log.debug("REST request to get QmsBogiepressurePositiveTest : {}", id);
        Optional<QmsBogiepressurePositiveTest> qmsBogiepressurePositiveTest = qmsBogiepressurePositiveTestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsBogiepressurePositiveTest);
    }

    /**
     * DELETE  /qms-bogiepressure-positive-tests/:id : delete the "id" qmsBogiepressurePositiveTest.
     *
     * @param id the id of the qmsBogiepressurePositiveTest to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-bogiepressure-positive-tests/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsBogiepressurePositiveTest(@PathVariable Long id) {
        log.debug("REST request to delete QmsBogiepressurePositiveTest : {}", id);

        qmsBogiepressurePositiveTestRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
