package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsEntryInspection;
import cn.com.cnc.fcc.repository.QmsEntryInspectionRepository;
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
 * REST controller for managing QmsEntryInspection.
 */
@RestController
@RequestMapping("/api")
public class QmsEntryInspectionResource {

    private final Logger log = LoggerFactory.getLogger(QmsEntryInspectionResource.class);

    private static final String ENTITY_NAME = "qmsEntryInspection";

    private final QmsEntryInspectionRepository qmsEntryInspectionRepository;

    public QmsEntryInspectionResource(QmsEntryInspectionRepository qmsEntryInspectionRepository) {
        this.qmsEntryInspectionRepository = qmsEntryInspectionRepository;
    }

    /**
     * POST  /qms-entry-inspections : Create a new qmsEntryInspection.
     *
     * @param qmsEntryInspection the qmsEntryInspection to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsEntryInspection, or with status 400 (Bad Request) if the qmsEntryInspection has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-entry-inspections")
    @Timed
    public ResponseEntity<QmsEntryInspection> createQmsEntryInspection(@Valid @RequestBody QmsEntryInspection qmsEntryInspection) throws URISyntaxException {
        log.debug("REST request to save QmsEntryInspection : {}", qmsEntryInspection);
        if (qmsEntryInspection.getId() != null) {
            throw new BadRequestAlertException("A new qmsEntryInspection cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsEntryInspection result = qmsEntryInspectionRepository.save(qmsEntryInspection);
        return ResponseEntity.created(new URI("/api/qms-entry-inspections/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-entry-inspections : Updates an existing qmsEntryInspection.
     *
     * @param qmsEntryInspection the qmsEntryInspection to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsEntryInspection,
     * or with status 400 (Bad Request) if the qmsEntryInspection is not valid,
     * or with status 500 (Internal Server Error) if the qmsEntryInspection couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-entry-inspections")
    @Timed
    public ResponseEntity<QmsEntryInspection> updateQmsEntryInspection(@Valid @RequestBody QmsEntryInspection qmsEntryInspection) throws URISyntaxException {
        log.debug("REST request to update QmsEntryInspection : {}", qmsEntryInspection);
        if (qmsEntryInspection.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsEntryInspection result = qmsEntryInspectionRepository.save(qmsEntryInspection);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsEntryInspection.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-entry-inspections : get all the qmsEntryInspections.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsEntryInspections in body
     */
    @GetMapping("/qms-entry-inspections")
    @Timed
    public ResponseEntity<List<QmsEntryInspection>> getAllQmsEntryInspections(Pageable pageable) {
        log.debug("REST request to get a page of QmsEntryInspections");
        Page<QmsEntryInspection> page = qmsEntryInspectionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-entry-inspections");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-entry-inspections/:id : get the "id" qmsEntryInspection.
     *
     * @param id the id of the qmsEntryInspection to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsEntryInspection, or with status 404 (Not Found)
     */
    @GetMapping("/qms-entry-inspections/{id}")
    @Timed
    public ResponseEntity<QmsEntryInspection> getQmsEntryInspection(@PathVariable Long id) {
        log.debug("REST request to get QmsEntryInspection : {}", id);
        Optional<QmsEntryInspection> qmsEntryInspection = qmsEntryInspectionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsEntryInspection);
    }

    /**
     * DELETE  /qms-entry-inspections/:id : delete the "id" qmsEntryInspection.
     *
     * @param id the id of the qmsEntryInspection to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-entry-inspections/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsEntryInspection(@PathVariable Long id) {
        log.debug("REST request to delete QmsEntryInspection : {}", id);

        qmsEntryInspectionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
