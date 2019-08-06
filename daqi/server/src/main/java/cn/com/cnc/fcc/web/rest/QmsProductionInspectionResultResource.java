package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsProductionInspectionResult;
import cn.com.cnc.fcc.repository.QmsProductionInspectionResultRepository;
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
 * REST controller for managing QmsProductionInspectionResult.
 */
@RestController
@RequestMapping("/api")
public class QmsProductionInspectionResultResource {

    private final Logger log = LoggerFactory.getLogger(QmsProductionInspectionResultResource.class);

    private static final String ENTITY_NAME = "qmsProductionInspectionResult";

    private final QmsProductionInspectionResultRepository qmsProductionInspectionResultRepository;

    public QmsProductionInspectionResultResource(QmsProductionInspectionResultRepository qmsProductionInspectionResultRepository) {
        this.qmsProductionInspectionResultRepository = qmsProductionInspectionResultRepository;
    }

    /**
     * POST  /qms-production-inspection-results : Create a new qmsProductionInspectionResult.
     *
     * @param qmsProductionInspectionResult the qmsProductionInspectionResult to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsProductionInspectionResult, or with status 400 (Bad Request) if the qmsProductionInspectionResult has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-production-inspection-results")
    @Timed
    public ResponseEntity<QmsProductionInspectionResult> createQmsProductionInspectionResult(@Valid @RequestBody QmsProductionInspectionResult qmsProductionInspectionResult) throws URISyntaxException {
        log.debug("REST request to save QmsProductionInspectionResult : {}", qmsProductionInspectionResult);
        if (qmsProductionInspectionResult.getId() != null) {
            throw new BadRequestAlertException("A new qmsProductionInspectionResult cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsProductionInspectionResult result = qmsProductionInspectionResultRepository.save(qmsProductionInspectionResult);
        return ResponseEntity.created(new URI("/api/qms-production-inspection-results/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-production-inspection-results : Updates an existing qmsProductionInspectionResult.
     *
     * @param qmsProductionInspectionResult the qmsProductionInspectionResult to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsProductionInspectionResult,
     * or with status 400 (Bad Request) if the qmsProductionInspectionResult is not valid,
     * or with status 500 (Internal Server Error) if the qmsProductionInspectionResult couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-production-inspection-results")
    @Timed
    public ResponseEntity<QmsProductionInspectionResult> updateQmsProductionInspectionResult(@Valid @RequestBody QmsProductionInspectionResult qmsProductionInspectionResult) throws URISyntaxException {
        log.debug("REST request to update QmsProductionInspectionResult : {}", qmsProductionInspectionResult);
        if (qmsProductionInspectionResult.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsProductionInspectionResult result = qmsProductionInspectionResultRepository.save(qmsProductionInspectionResult);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsProductionInspectionResult.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-production-inspection-results : get all the qmsProductionInspectionResults.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsProductionInspectionResults in body
     */
    @GetMapping("/qms-production-inspection-results")
    @Timed
    public ResponseEntity<List<QmsProductionInspectionResult>> getAllQmsProductionInspectionResults(Pageable pageable) {
        log.debug("REST request to get a page of QmsProductionInspectionResults");
        Page<QmsProductionInspectionResult> page = qmsProductionInspectionResultRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-production-inspection-results");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-production-inspection-results/:id : get the "id" qmsProductionInspectionResult.
     *
     * @param id the id of the qmsProductionInspectionResult to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsProductionInspectionResult, or with status 404 (Not Found)
     */
    @GetMapping("/qms-production-inspection-results/{id}")
    @Timed
    public ResponseEntity<QmsProductionInspectionResult> getQmsProductionInspectionResult(@PathVariable Long id) {
        log.debug("REST request to get QmsProductionInspectionResult : {}", id);
        Optional<QmsProductionInspectionResult> qmsProductionInspectionResult = qmsProductionInspectionResultRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsProductionInspectionResult);
    }

    /**
     * DELETE  /qms-production-inspection-results/:id : delete the "id" qmsProductionInspectionResult.
     *
     * @param id the id of the qmsProductionInspectionResult to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-production-inspection-results/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsProductionInspectionResult(@PathVariable Long id) {
        log.debug("REST request to delete QmsProductionInspectionResult : {}", id);

        qmsProductionInspectionResultRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
