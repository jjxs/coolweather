package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsEntryInspectionResult;
import cn.com.cnc.fcc.repository.QmsEntryInspectionResultRepository;
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
 * REST controller for managing QmsEntryInspectionResult.
 */
@RestController
@RequestMapping("/api")
public class QmsEntryInspectionResultResource {

    private final Logger log = LoggerFactory.getLogger(QmsEntryInspectionResultResource.class);

    private static final String ENTITY_NAME = "qmsEntryInspectionResult";

    private final QmsEntryInspectionResultRepository qmsEntryInspectionResultRepository;

    public QmsEntryInspectionResultResource(QmsEntryInspectionResultRepository qmsEntryInspectionResultRepository) {
        this.qmsEntryInspectionResultRepository = qmsEntryInspectionResultRepository;
    }

    /**
     * POST  /qms-entry-inspection-results : Create a new qmsEntryInspectionResult.
     *
     * @param qmsEntryInspectionResult the qmsEntryInspectionResult to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsEntryInspectionResult, or with status 400 (Bad Request) if the qmsEntryInspectionResult has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-entry-inspection-results")
    @Timed
    public ResponseEntity<QmsEntryInspectionResult> createQmsEntryInspectionResult(@Valid @RequestBody QmsEntryInspectionResult qmsEntryInspectionResult) throws URISyntaxException {
        log.debug("REST request to save QmsEntryInspectionResult : {}", qmsEntryInspectionResult);
        if (qmsEntryInspectionResult.getId() != null) {
            throw new BadRequestAlertException("A new qmsEntryInspectionResult cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsEntryInspectionResult result = qmsEntryInspectionResultRepository.save(qmsEntryInspectionResult);
        return ResponseEntity.created(new URI("/api/qms-entry-inspection-results/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-entry-inspection-results : Updates an existing qmsEntryInspectionResult.
     *
     * @param qmsEntryInspectionResult the qmsEntryInspectionResult to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsEntryInspectionResult,
     * or with status 400 (Bad Request) if the qmsEntryInspectionResult is not valid,
     * or with status 500 (Internal Server Error) if the qmsEntryInspectionResult couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-entry-inspection-results")
    @Timed
    public ResponseEntity<QmsEntryInspectionResult> updateQmsEntryInspectionResult(@Valid @RequestBody QmsEntryInspectionResult qmsEntryInspectionResult) throws URISyntaxException {
        log.debug("REST request to update QmsEntryInspectionResult : {}", qmsEntryInspectionResult);
        if (qmsEntryInspectionResult.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsEntryInspectionResult result = qmsEntryInspectionResultRepository.save(qmsEntryInspectionResult);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsEntryInspectionResult.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-entry-inspection-results : get all the qmsEntryInspectionResults.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsEntryInspectionResults in body
     */
    @GetMapping("/qms-entry-inspection-results")
    @Timed
    public ResponseEntity<List<QmsEntryInspectionResult>> getAllQmsEntryInspectionResults(Pageable pageable) {
        log.debug("REST request to get a page of QmsEntryInspectionResults");
        Page<QmsEntryInspectionResult> page = qmsEntryInspectionResultRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-entry-inspection-results");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-entry-inspection-results/:id : get the "id" qmsEntryInspectionResult.
     *
     * @param id the id of the qmsEntryInspectionResult to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsEntryInspectionResult, or with status 404 (Not Found)
     */
    @GetMapping("/qms-entry-inspection-results/{id}")
    @Timed
    public ResponseEntity<QmsEntryInspectionResult> getQmsEntryInspectionResult(@PathVariable Long id) {
        log.debug("REST request to get QmsEntryInspectionResult : {}", id);
        Optional<QmsEntryInspectionResult> qmsEntryInspectionResult = qmsEntryInspectionResultRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsEntryInspectionResult);
    }

    /**
     * DELETE  /qms-entry-inspection-results/:id : delete the "id" qmsEntryInspectionResult.
     *
     * @param id the id of the qmsEntryInspectionResult to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-entry-inspection-results/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsEntryInspectionResult(@PathVariable Long id) {
        log.debug("REST request to delete QmsEntryInspectionResult : {}", id);

        qmsEntryInspectionResultRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
