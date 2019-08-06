package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsMicSwicthRegulattoTest;
import cn.com.cnc.fcc.repository.QmsMicSwicthRegulattoTestRepository;
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
 * REST controller for managing QmsMicSwicthRegulattoTest.
 */
@RestController
@RequestMapping("/api")
public class QmsMicSwicthRegulattoTestResource {

    private final Logger log = LoggerFactory.getLogger(QmsMicSwicthRegulattoTestResource.class);

    private static final String ENTITY_NAME = "qmsMicSwicthRegulattoTest";

    private final QmsMicSwicthRegulattoTestRepository qmsMicSwicthRegulattoTestRepository;

    public QmsMicSwicthRegulattoTestResource(QmsMicSwicthRegulattoTestRepository qmsMicSwicthRegulattoTestRepository) {
        this.qmsMicSwicthRegulattoTestRepository = qmsMicSwicthRegulattoTestRepository;
    }

    /**
     * POST  /qms-mic-swicth-regulatto-tests : Create a new qmsMicSwicthRegulattoTest.
     *
     * @param qmsMicSwicthRegulattoTest the qmsMicSwicthRegulattoTest to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsMicSwicthRegulattoTest, or with status 400 (Bad Request) if the qmsMicSwicthRegulattoTest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-mic-swicth-regulatto-tests")
    @Timed
    public ResponseEntity<QmsMicSwicthRegulattoTest> createQmsMicSwicthRegulattoTest(@Valid @RequestBody QmsMicSwicthRegulattoTest qmsMicSwicthRegulattoTest) throws URISyntaxException {
        log.debug("REST request to save QmsMicSwicthRegulattoTest : {}", qmsMicSwicthRegulattoTest);
        if (qmsMicSwicthRegulattoTest.getId() != null) {
            throw new BadRequestAlertException("A new qmsMicSwicthRegulattoTest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsMicSwicthRegulattoTest result = qmsMicSwicthRegulattoTestRepository.save(qmsMicSwicthRegulattoTest);
        return ResponseEntity.created(new URI("/api/qms-mic-swicth-regulatto-tests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-mic-swicth-regulatto-tests : Updates an existing qmsMicSwicthRegulattoTest.
     *
     * @param qmsMicSwicthRegulattoTest the qmsMicSwicthRegulattoTest to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsMicSwicthRegulattoTest,
     * or with status 400 (Bad Request) if the qmsMicSwicthRegulattoTest is not valid,
     * or with status 500 (Internal Server Error) if the qmsMicSwicthRegulattoTest couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-mic-swicth-regulatto-tests")
    @Timed
    public ResponseEntity<QmsMicSwicthRegulattoTest> updateQmsMicSwicthRegulattoTest(@Valid @RequestBody QmsMicSwicthRegulattoTest qmsMicSwicthRegulattoTest) throws URISyntaxException {
        log.debug("REST request to update QmsMicSwicthRegulattoTest : {}", qmsMicSwicthRegulattoTest);
        if (qmsMicSwicthRegulattoTest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsMicSwicthRegulattoTest result = qmsMicSwicthRegulattoTestRepository.save(qmsMicSwicthRegulattoTest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsMicSwicthRegulattoTest.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-mic-swicth-regulatto-tests : get all the qmsMicSwicthRegulattoTests.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsMicSwicthRegulattoTests in body
     */
    @GetMapping("/qms-mic-swicth-regulatto-tests")
    @Timed
    public ResponseEntity<List<QmsMicSwicthRegulattoTest>> getAllQmsMicSwicthRegulattoTests(Pageable pageable) {
        log.debug("REST request to get a page of QmsMicSwicthRegulattoTests");
        Page<QmsMicSwicthRegulattoTest> page = qmsMicSwicthRegulattoTestRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-mic-swicth-regulatto-tests");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-mic-swicth-regulatto-tests/:id : get the "id" qmsMicSwicthRegulattoTest.
     *
     * @param id the id of the qmsMicSwicthRegulattoTest to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsMicSwicthRegulattoTest, or with status 404 (Not Found)
     */
    @GetMapping("/qms-mic-swicth-regulatto-tests/{id}")
    @Timed
    public ResponseEntity<QmsMicSwicthRegulattoTest> getQmsMicSwicthRegulattoTest(@PathVariable Long id) {
        log.debug("REST request to get QmsMicSwicthRegulattoTest : {}", id);
        Optional<QmsMicSwicthRegulattoTest> qmsMicSwicthRegulattoTest = qmsMicSwicthRegulattoTestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsMicSwicthRegulattoTest);
    }

    /**
     * DELETE  /qms-mic-swicth-regulatto-tests/:id : delete the "id" qmsMicSwicthRegulattoTest.
     *
     * @param id the id of the qmsMicSwicthRegulattoTest to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-mic-swicth-regulatto-tests/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsMicSwicthRegulattoTest(@PathVariable Long id) {
        log.debug("REST request to delete QmsMicSwicthRegulattoTest : {}", id);

        qmsMicSwicthRegulattoTestRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
