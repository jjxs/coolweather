package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsApproveResult;
import cn.com.cnc.fcc.repository.QmsApproveResultRepository;
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
 * REST controller for managing QmsApproveResult.
 */
@RestController
@RequestMapping("/api")
public class QmsApproveResultResource {

    private final Logger log = LoggerFactory.getLogger(QmsApproveResultResource.class);

    private static final String ENTITY_NAME = "qmsApproveResult";

    private final QmsApproveResultRepository qmsApproveResultRepository;

    public QmsApproveResultResource(QmsApproveResultRepository qmsApproveResultRepository) {
        this.qmsApproveResultRepository = qmsApproveResultRepository;
    }

    /**
     * POST  /qms-approve-results : Create a new qmsApproveResult.
     *
     * @param qmsApproveResult the qmsApproveResult to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsApproveResult, or with status 400 (Bad Request) if the qmsApproveResult has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-approve-results")
    @Timed
    public ResponseEntity<QmsApproveResult> createQmsApproveResult(@Valid @RequestBody QmsApproveResult qmsApproveResult) throws URISyntaxException {
        log.debug("REST request to save QmsApproveResult : {}", qmsApproveResult);
        if (qmsApproveResult.getId() != null) {
            throw new BadRequestAlertException("A new qmsApproveResult cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsApproveResult result = qmsApproveResultRepository.save(qmsApproveResult);
        return ResponseEntity.created(new URI("/api/qms-approve-results/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-approve-results : Updates an existing qmsApproveResult.
     *
     * @param qmsApproveResult the qmsApproveResult to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsApproveResult,
     * or with status 400 (Bad Request) if the qmsApproveResult is not valid,
     * or with status 500 (Internal Server Error) if the qmsApproveResult couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-approve-results")
    @Timed
    public ResponseEntity<QmsApproveResult> updateQmsApproveResult(@Valid @RequestBody QmsApproveResult qmsApproveResult) throws URISyntaxException {
        log.debug("REST request to update QmsApproveResult : {}", qmsApproveResult);
        if (qmsApproveResult.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsApproveResult result = qmsApproveResultRepository.save(qmsApproveResult);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsApproveResult.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-approve-results : get all the qmsApproveResults.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsApproveResults in body
     */
    @GetMapping("/qms-approve-results")
    @Timed
    public ResponseEntity<List<QmsApproveResult>> getAllQmsApproveResults(Pageable pageable) {
        log.debug("REST request to get a page of QmsApproveResults");
        Page<QmsApproveResult> page = qmsApproveResultRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-approve-results");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-approve-results/:id : get the "id" qmsApproveResult.
     *
     * @param id the id of the qmsApproveResult to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsApproveResult, or with status 404 (Not Found)
     */
    @GetMapping("/qms-approve-results/{id}")
    @Timed
    public ResponseEntity<QmsApproveResult> getQmsApproveResult(@PathVariable Long id) {
        log.debug("REST request to get QmsApproveResult : {}", id);
        Optional<QmsApproveResult> qmsApproveResult = qmsApproveResultRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsApproveResult);
    }

    /**
     * DELETE  /qms-approve-results/:id : delete the "id" qmsApproveResult.
     *
     * @param id the id of the qmsApproveResult to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-approve-results/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsApproveResult(@PathVariable Long id) {
        log.debug("REST request to delete QmsApproveResult : {}", id);

        qmsApproveResultRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
