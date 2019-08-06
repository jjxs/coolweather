package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsPartsAssemblyRelation;
import cn.com.cnc.fcc.repository.QmsPartsAssemblyRelationRepository;
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
 * REST controller for managing QmsPartsAssemblyRelation.
 */
@RestController
@RequestMapping("/api")
public class QmsPartsAssemblyRelationResource {

    private final Logger log = LoggerFactory.getLogger(QmsPartsAssemblyRelationResource.class);

    private static final String ENTITY_NAME = "qmsPartsAssemblyRelation";

    private final QmsPartsAssemblyRelationRepository qmsPartsAssemblyRelationRepository;

    public QmsPartsAssemblyRelationResource(QmsPartsAssemblyRelationRepository qmsPartsAssemblyRelationRepository) {
        this.qmsPartsAssemblyRelationRepository = qmsPartsAssemblyRelationRepository;
    }

    /**
     * POST  /qms-parts-assembly-relations : Create a new qmsPartsAssemblyRelation.
     *
     * @param qmsPartsAssemblyRelation the qmsPartsAssemblyRelation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsPartsAssemblyRelation, or with status 400 (Bad Request) if the qmsPartsAssemblyRelation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-parts-assembly-relations")
    @Timed
    public ResponseEntity<QmsPartsAssemblyRelation> createQmsPartsAssemblyRelation(@Valid @RequestBody QmsPartsAssemblyRelation qmsPartsAssemblyRelation) throws URISyntaxException {
        log.debug("REST request to save QmsPartsAssemblyRelation : {}", qmsPartsAssemblyRelation);
        if (qmsPartsAssemblyRelation.getId() != null) {
            throw new BadRequestAlertException("A new qmsPartsAssemblyRelation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsPartsAssemblyRelation result = qmsPartsAssemblyRelationRepository.save(qmsPartsAssemblyRelation);
        return ResponseEntity.created(new URI("/api/qms-parts-assembly-relations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-parts-assembly-relations : Updates an existing qmsPartsAssemblyRelation.
     *
     * @param qmsPartsAssemblyRelation the qmsPartsAssemblyRelation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsPartsAssemblyRelation,
     * or with status 400 (Bad Request) if the qmsPartsAssemblyRelation is not valid,
     * or with status 500 (Internal Server Error) if the qmsPartsAssemblyRelation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-parts-assembly-relations")
    @Timed
    public ResponseEntity<QmsPartsAssemblyRelation> updateQmsPartsAssemblyRelation(@Valid @RequestBody QmsPartsAssemblyRelation qmsPartsAssemblyRelation) throws URISyntaxException {
        log.debug("REST request to update QmsPartsAssemblyRelation : {}", qmsPartsAssemblyRelation);
        if (qmsPartsAssemblyRelation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsPartsAssemblyRelation result = qmsPartsAssemblyRelationRepository.save(qmsPartsAssemblyRelation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsPartsAssemblyRelation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-parts-assembly-relations : get all the qmsPartsAssemblyRelations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsPartsAssemblyRelations in body
     */
    @GetMapping("/qms-parts-assembly-relations")
    @Timed
    public ResponseEntity<List<QmsPartsAssemblyRelation>> getAllQmsPartsAssemblyRelations(Pageable pageable) {
        log.debug("REST request to get a page of QmsPartsAssemblyRelations");
        Page<QmsPartsAssemblyRelation> page = qmsPartsAssemblyRelationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-parts-assembly-relations");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-parts-assembly-relations/:id : get the "id" qmsPartsAssemblyRelation.
     *
     * @param id the id of the qmsPartsAssemblyRelation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsPartsAssemblyRelation, or with status 404 (Not Found)
     */
    @GetMapping("/qms-parts-assembly-relations/{id}")
    @Timed
    public ResponseEntity<QmsPartsAssemblyRelation> getQmsPartsAssemblyRelation(@PathVariable Long id) {
        log.debug("REST request to get QmsPartsAssemblyRelation : {}", id);
        Optional<QmsPartsAssemblyRelation> qmsPartsAssemblyRelation = qmsPartsAssemblyRelationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsPartsAssemblyRelation);
    }

    /**
     * DELETE  /qms-parts-assembly-relations/:id : delete the "id" qmsPartsAssemblyRelation.
     *
     * @param id the id of the qmsPartsAssemblyRelation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-parts-assembly-relations/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsPartsAssemblyRelation(@PathVariable Long id) {
        log.debug("REST request to delete QmsPartsAssemblyRelation : {}", id);

        qmsPartsAssemblyRelationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
