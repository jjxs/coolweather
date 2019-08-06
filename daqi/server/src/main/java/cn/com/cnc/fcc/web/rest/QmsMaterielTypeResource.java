package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsMaterielType;
import cn.com.cnc.fcc.repository.QmsMaterielTypeRepository;
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
 * REST controller for managing QmsMaterielType.
 */
@RestController
@RequestMapping("/api")
public class QmsMaterielTypeResource {

    private final Logger log = LoggerFactory.getLogger(QmsMaterielTypeResource.class);

    private static final String ENTITY_NAME = "qmsMaterielType";

    private final QmsMaterielTypeRepository qmsMaterielTypeRepository;

    public QmsMaterielTypeResource(QmsMaterielTypeRepository qmsMaterielTypeRepository) {
        this.qmsMaterielTypeRepository = qmsMaterielTypeRepository;
    }

    /**
     * POST  /qms-materiel-types : Create a new qmsMaterielType.
     *
     * @param qmsMaterielType the qmsMaterielType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsMaterielType, or with status 400 (Bad Request) if the qmsMaterielType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-materiel-types")
    @Timed
    public ResponseEntity<QmsMaterielType> createQmsMaterielType(@Valid @RequestBody QmsMaterielType qmsMaterielType) throws URISyntaxException {
        log.debug("REST request to save QmsMaterielType : {}", qmsMaterielType);
        if (qmsMaterielType.getId() != null) {
            throw new BadRequestAlertException("A new qmsMaterielType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsMaterielType result = qmsMaterielTypeRepository.save(qmsMaterielType);
        return ResponseEntity.created(new URI("/api/qms-materiel-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-materiel-types : Updates an existing qmsMaterielType.
     *
     * @param qmsMaterielType the qmsMaterielType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsMaterielType,
     * or with status 400 (Bad Request) if the qmsMaterielType is not valid,
     * or with status 500 (Internal Server Error) if the qmsMaterielType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-materiel-types")
    @Timed
    public ResponseEntity<QmsMaterielType> updateQmsMaterielType(@Valid @RequestBody QmsMaterielType qmsMaterielType) throws URISyntaxException {
        log.debug("REST request to update QmsMaterielType : {}", qmsMaterielType);
        if (qmsMaterielType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsMaterielType result = qmsMaterielTypeRepository.save(qmsMaterielType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsMaterielType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-materiel-types : get all the qmsMaterielTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsMaterielTypes in body
     */
    @GetMapping("/qms-materiel-types")
    @Timed
    public ResponseEntity<List<QmsMaterielType>> getAllQmsMaterielTypes(Pageable pageable) {
        log.debug("REST request to get a page of QmsMaterielTypes");
        Page<QmsMaterielType> page = qmsMaterielTypeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-materiel-types");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-materiel-types/:id : get the "id" qmsMaterielType.
     *
     * @param id the id of the qmsMaterielType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsMaterielType, or with status 404 (Not Found)
     */
    @GetMapping("/qms-materiel-types/{id}")
    @Timed
    public ResponseEntity<QmsMaterielType> getQmsMaterielType(@PathVariable Long id) {
        log.debug("REST request to get QmsMaterielType : {}", id);
        Optional<QmsMaterielType> qmsMaterielType = qmsMaterielTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsMaterielType);
    }

    /**
     * DELETE  /qms-materiel-types/:id : delete the "id" qmsMaterielType.
     *
     * @param id the id of the qmsMaterielType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-materiel-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsMaterielType(@PathVariable Long id) {
        log.debug("REST request to delete QmsMaterielType : {}", id);

        qmsMaterielTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
