package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsMaster;
import cn.com.cnc.fcc.repository.QmsMasterRepository;
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
 * REST controller for managing QmsMaster.
 */
@RestController
@RequestMapping("/api")
public class QmsMasterResource {

    private final Logger log = LoggerFactory.getLogger(QmsMasterResource.class);

    private static final String ENTITY_NAME = "qmsMaster";

    private final QmsMasterRepository qmsMasterRepository;

    public QmsMasterResource(QmsMasterRepository qmsMasterRepository) {
        this.qmsMasterRepository = qmsMasterRepository;
    }

    /**
     * POST  /qms-masters : Create a new qmsMaster.
     *
     * @param qmsMaster the qmsMaster to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsMaster, or with status 400 (Bad Request) if the qmsMaster has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-masters")
    @Timed
    public ResponseEntity<QmsMaster> createQmsMaster(@Valid @RequestBody QmsMaster qmsMaster) throws URISyntaxException {
        log.debug("REST request to save QmsMaster : {}", qmsMaster);
        if (qmsMaster.getId() != null) {
            throw new BadRequestAlertException("A new qmsMaster cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsMaster result = qmsMasterRepository.save(qmsMaster);
        return ResponseEntity.created(new URI("/api/qms-masters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-masters : Updates an existing qmsMaster.
     *
     * @param qmsMaster the qmsMaster to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsMaster,
     * or with status 400 (Bad Request) if the qmsMaster is not valid,
     * or with status 500 (Internal Server Error) if the qmsMaster couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-masters")
    @Timed
    public ResponseEntity<QmsMaster> updateQmsMaster(@Valid @RequestBody QmsMaster qmsMaster) throws URISyntaxException {
        log.debug("REST request to update QmsMaster : {}", qmsMaster);
        if (qmsMaster.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsMaster result = qmsMasterRepository.save(qmsMaster);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsMaster.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-masters : get all the qmsMasters.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsMasters in body
     */
    @GetMapping("/qms-masters")
    @Timed
    public ResponseEntity<List<QmsMaster>> getAllQmsMasters(Pageable pageable) {
        log.debug("REST request to get a page of QmsMasters");
        Page<QmsMaster> page = qmsMasterRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-masters");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-masters/:id : get the "id" qmsMaster.
     *
     * @param id the id of the qmsMaster to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsMaster, or with status 404 (Not Found)
     */
    @GetMapping("/qms-masters/{id}")
    @Timed
    public ResponseEntity<QmsMaster> getQmsMaster(@PathVariable Long id) {
        log.debug("REST request to get QmsMaster : {}", id);
        Optional<QmsMaster> qmsMaster = qmsMasterRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsMaster);
    }

    /**
     * DELETE  /qms-masters/:id : delete the "id" qmsMaster.
     *
     * @param id the id of the qmsMaster to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-masters/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsMaster(@PathVariable Long id) {
        log.debug("REST request to delete QmsMaster : {}", id);

        qmsMasterRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
