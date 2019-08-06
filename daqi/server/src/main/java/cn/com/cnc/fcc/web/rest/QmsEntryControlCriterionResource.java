package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsEntryControlCriterion;
import cn.com.cnc.fcc.repository.QmsEntryControlCriterionRepository;
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
 * REST controller for managing QmsEntryControlCriterion.
 */
@RestController
@RequestMapping("/api")
public class QmsEntryControlCriterionResource {

    private final Logger log = LoggerFactory.getLogger(QmsEntryControlCriterionResource.class);

    private static final String ENTITY_NAME = "qmsEntryControlCriterion";

    private final QmsEntryControlCriterionRepository qmsEntryControlCriterionRepository;

    public QmsEntryControlCriterionResource(QmsEntryControlCriterionRepository qmsEntryControlCriterionRepository) {
        this.qmsEntryControlCriterionRepository = qmsEntryControlCriterionRepository;
    }

    /**
     * POST  /qms-entry-control-criteria : Create a new qmsEntryControlCriterion.
     *
     * @param qmsEntryControlCriterion the qmsEntryControlCriterion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsEntryControlCriterion, or with status 400 (Bad Request) if the qmsEntryControlCriterion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-entry-control-criteria")
    @Timed
    public ResponseEntity<QmsEntryControlCriterion> createQmsEntryControlCriterion(@Valid @RequestBody QmsEntryControlCriterion qmsEntryControlCriterion) throws URISyntaxException {
        log.debug("REST request to save QmsEntryControlCriterion : {}", qmsEntryControlCriterion);
        if (qmsEntryControlCriterion.getId() != null) {
            throw new BadRequestAlertException("A new qmsEntryControlCriterion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsEntryControlCriterion result = qmsEntryControlCriterionRepository.save(qmsEntryControlCriterion);
        return ResponseEntity.created(new URI("/api/qms-entry-control-criteria/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-entry-control-criteria : Updates an existing qmsEntryControlCriterion.
     *
     * @param qmsEntryControlCriterion the qmsEntryControlCriterion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsEntryControlCriterion,
     * or with status 400 (Bad Request) if the qmsEntryControlCriterion is not valid,
     * or with status 500 (Internal Server Error) if the qmsEntryControlCriterion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-entry-control-criteria")
    @Timed
    public ResponseEntity<QmsEntryControlCriterion> updateQmsEntryControlCriterion(@Valid @RequestBody QmsEntryControlCriterion qmsEntryControlCriterion) throws URISyntaxException {
        log.debug("REST request to update QmsEntryControlCriterion : {}", qmsEntryControlCriterion);
        if (qmsEntryControlCriterion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsEntryControlCriterion result = qmsEntryControlCriterionRepository.save(qmsEntryControlCriterion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsEntryControlCriterion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-entry-control-criteria : get all the qmsEntryControlCriteria.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsEntryControlCriteria in body
     */
    @GetMapping("/qms-entry-control-criteria")
    @Timed
    public ResponseEntity<List<QmsEntryControlCriterion>> getAllQmsEntryControlCriteria(Pageable pageable) {
        log.debug("REST request to get a page of QmsEntryControlCriteria");
        Page<QmsEntryControlCriterion> page = qmsEntryControlCriterionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-entry-control-criteria");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-entry-control-criteria/:id : get the "id" qmsEntryControlCriterion.
     *
     * @param id the id of the qmsEntryControlCriterion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsEntryControlCriterion, or with status 404 (Not Found)
     */
    @GetMapping("/qms-entry-control-criteria/{id}")
    @Timed
    public ResponseEntity<QmsEntryControlCriterion> getQmsEntryControlCriterion(@PathVariable Long id) {
        log.debug("REST request to get QmsEntryControlCriterion : {}", id);
        Optional<QmsEntryControlCriterion> qmsEntryControlCriterion = qmsEntryControlCriterionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsEntryControlCriterion);
    }

    /**
     * DELETE  /qms-entry-control-criteria/:id : delete the "id" qmsEntryControlCriterion.
     *
     * @param id the id of the qmsEntryControlCriterion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-entry-control-criteria/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsEntryControlCriterion(@PathVariable Long id) {
        log.debug("REST request to delete QmsEntryControlCriterion : {}", id);

        qmsEntryControlCriterionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
