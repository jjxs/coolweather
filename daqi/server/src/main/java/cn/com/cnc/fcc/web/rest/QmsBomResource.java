package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsBom;
import cn.com.cnc.fcc.repository.QmsBomRepository;
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
 * REST controller for managing QmsBom.
 */
@RestController
@RequestMapping("/api")
public class QmsBomResource {

    private final Logger log = LoggerFactory.getLogger(QmsBomResource.class);

    private static final String ENTITY_NAME = "qmsBom";

    private final QmsBomRepository qmsBomRepository;

    public QmsBomResource(QmsBomRepository qmsBomRepository) {
        this.qmsBomRepository = qmsBomRepository;
    }

    /**
     * POST  /qms-boms : Create a new qmsBom.
     *
     * @param qmsBom the qmsBom to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsBom, or with status 400 (Bad Request) if the qmsBom has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-boms")
    @Timed
    public ResponseEntity<QmsBom> createQmsBom(@Valid @RequestBody QmsBom qmsBom) throws URISyntaxException {
        log.debug("REST request to save QmsBom : {}", qmsBom);
        if (qmsBom.getId() != null) {
            throw new BadRequestAlertException("A new qmsBom cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsBom result = qmsBomRepository.save(qmsBom);
        return ResponseEntity.created(new URI("/api/qms-boms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-boms : Updates an existing qmsBom.
     *
     * @param qmsBom the qmsBom to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsBom,
     * or with status 400 (Bad Request) if the qmsBom is not valid,
     * or with status 500 (Internal Server Error) if the qmsBom couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-boms")
    @Timed
    public ResponseEntity<QmsBom> updateQmsBom(@Valid @RequestBody QmsBom qmsBom) throws URISyntaxException {
        log.debug("REST request to update QmsBom : {}", qmsBom);
        if (qmsBom.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsBom result = qmsBomRepository.save(qmsBom);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsBom.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-boms : get all the qmsBoms.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsBoms in body
     */
    @GetMapping("/qms-boms")
    @Timed
    public ResponseEntity<List<QmsBom>> getAllQmsBoms(Pageable pageable) {
        log.debug("REST request to get a page of QmsBoms");
        Page<QmsBom> page = qmsBomRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-boms");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-boms/:id : get the "id" qmsBom.
     *
     * @param id the id of the qmsBom to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsBom, or with status 404 (Not Found)
     */
    @GetMapping("/qms-boms/{id}")
    @Timed
    public ResponseEntity<QmsBom> getQmsBom(@PathVariable Long id) {
        log.debug("REST request to get QmsBom : {}", id);
        Optional<QmsBom> qmsBom = qmsBomRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsBom);
    }

    /**
     * DELETE  /qms-boms/:id : delete the "id" qmsBom.
     *
     * @param id the id of the qmsBom to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-boms/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsBom(@PathVariable Long id) {
        log.debug("REST request to delete QmsBom : {}", id);

        qmsBomRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
