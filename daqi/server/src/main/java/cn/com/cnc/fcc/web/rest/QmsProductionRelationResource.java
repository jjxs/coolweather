package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsProductionRelation;
import cn.com.cnc.fcc.repository.QmsProductionRelationRepository;
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
 * REST controller for managing QmsProductionRelation.
 */
@RestController
@RequestMapping("/api")
public class QmsProductionRelationResource {

    private final Logger log = LoggerFactory.getLogger(QmsProductionRelationResource.class);

    private static final String ENTITY_NAME = "qmsProductionRelation";

    private final QmsProductionRelationRepository qmsProductionRelationRepository;

    public QmsProductionRelationResource(QmsProductionRelationRepository qmsProductionRelationRepository) {
        this.qmsProductionRelationRepository = qmsProductionRelationRepository;
    }

    /**
     * POST  /qms-production-relations : Create a new qmsProductionRelation.
     *
     * @param qmsProductionRelation the qmsProductionRelation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsProductionRelation, or with status 400 (Bad Request) if the qmsProductionRelation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-production-relations")
    @Timed
    public ResponseEntity<QmsProductionRelation> createQmsProductionRelation(@Valid @RequestBody QmsProductionRelation qmsProductionRelation) throws URISyntaxException {
        log.debug("REST request to save QmsProductionRelation : {}", qmsProductionRelation);
        if (qmsProductionRelation.getId() != null) {
            throw new BadRequestAlertException("A new qmsProductionRelation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsProductionRelation result = qmsProductionRelationRepository.save(qmsProductionRelation);
        return ResponseEntity.created(new URI("/api/qms-production-relations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-production-relations : Updates an existing qmsProductionRelation.
     *
     * @param qmsProductionRelation the qmsProductionRelation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsProductionRelation,
     * or with status 400 (Bad Request) if the qmsProductionRelation is not valid,
     * or with status 500 (Internal Server Error) if the qmsProductionRelation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-production-relations")
    @Timed
    public ResponseEntity<QmsProductionRelation> updateQmsProductionRelation(@Valid @RequestBody QmsProductionRelation qmsProductionRelation) throws URISyntaxException {
        log.debug("REST request to update QmsProductionRelation : {}", qmsProductionRelation);
        if (qmsProductionRelation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsProductionRelation result = qmsProductionRelationRepository.save(qmsProductionRelation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsProductionRelation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-production-relations : get all the qmsProductionRelations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsProductionRelations in body
     */
    @GetMapping("/qms-production-relations")
    @Timed
    public ResponseEntity<List<QmsProductionRelation>> getAllQmsProductionRelations(Pageable pageable) {
        log.debug("REST request to get a page of QmsProductionRelations");
        Page<QmsProductionRelation> page = qmsProductionRelationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-production-relations");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-production-relations/:id : get the "id" qmsProductionRelation.
     *
     * @param id the id of the qmsProductionRelation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsProductionRelation, or with status 404 (Not Found)
     */
    @GetMapping("/qms-production-relations/{id}")
    @Timed
    public ResponseEntity<QmsProductionRelation> getQmsProductionRelation(@PathVariable Long id) {
        log.debug("REST request to get QmsProductionRelation : {}", id);
        Optional<QmsProductionRelation> qmsProductionRelation = qmsProductionRelationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsProductionRelation);
    }

    /**
     * DELETE  /qms-production-relations/:id : delete the "id" qmsProductionRelation.
     *
     * @param id the id of the qmsProductionRelation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-production-relations/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsProductionRelation(@PathVariable Long id) {
        log.debug("REST request to delete QmsProductionRelation : {}", id);

        qmsProductionRelationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
