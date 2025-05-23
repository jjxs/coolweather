package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsUnqualifiedMateriel;
import cn.com.cnc.fcc.repository.QmsUnqualifiedMaterielRepository;
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
 * REST controller for managing QmsUnqualifiedMateriel.
 */
@RestController
@RequestMapping("/api")
public class QmsUnqualifiedMaterielResource {

    private final Logger log = LoggerFactory.getLogger(QmsUnqualifiedMaterielResource.class);

    private static final String ENTITY_NAME = "qmsUnqualifiedMateriel";

    private final QmsUnqualifiedMaterielRepository qmsUnqualifiedMaterielRepository;

    public QmsUnqualifiedMaterielResource(QmsUnqualifiedMaterielRepository qmsUnqualifiedMaterielRepository) {
        this.qmsUnqualifiedMaterielRepository = qmsUnqualifiedMaterielRepository;
    }

    /**
     * POST  /qms-unqualified-materiels : Create a new qmsUnqualifiedMateriel.
     *
     * @param qmsUnqualifiedMateriel the qmsUnqualifiedMateriel to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsUnqualifiedMateriel, or with status 400 (Bad Request) if the qmsUnqualifiedMateriel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-unqualified-materiels")
    @Timed
    public ResponseEntity<QmsUnqualifiedMateriel> createQmsUnqualifiedMateriel(@Valid @RequestBody QmsUnqualifiedMateriel qmsUnqualifiedMateriel) throws URISyntaxException {
        log.debug("REST request to save QmsUnqualifiedMateriel : {}", qmsUnqualifiedMateriel);
        if (qmsUnqualifiedMateriel.getId() != null) {
            throw new BadRequestAlertException("A new qmsUnqualifiedMateriel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsUnqualifiedMateriel result = qmsUnqualifiedMaterielRepository.save(qmsUnqualifiedMateriel);
        return ResponseEntity.created(new URI("/api/qms-unqualified-materiels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-unqualified-materiels : Updates an existing qmsUnqualifiedMateriel.
     *
     * @param qmsUnqualifiedMateriel the qmsUnqualifiedMateriel to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsUnqualifiedMateriel,
     * or with status 400 (Bad Request) if the qmsUnqualifiedMateriel is not valid,
     * or with status 500 (Internal Server Error) if the qmsUnqualifiedMateriel couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-unqualified-materiels")
    @Timed
    public ResponseEntity<QmsUnqualifiedMateriel> updateQmsUnqualifiedMateriel(@Valid @RequestBody QmsUnqualifiedMateriel qmsUnqualifiedMateriel) throws URISyntaxException {
        log.debug("REST request to update QmsUnqualifiedMateriel : {}", qmsUnqualifiedMateriel);
        if (qmsUnqualifiedMateriel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsUnqualifiedMateriel result = qmsUnqualifiedMaterielRepository.save(qmsUnqualifiedMateriel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsUnqualifiedMateriel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-unqualified-materiels : get all the qmsUnqualifiedMateriels.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsUnqualifiedMateriels in body
     */
    @GetMapping("/qms-unqualified-materiels")
    @Timed
    public ResponseEntity<List<QmsUnqualifiedMateriel>> getAllQmsUnqualifiedMateriels(Pageable pageable) {
        log.debug("REST request to get a page of QmsUnqualifiedMateriels");
        Page<QmsUnqualifiedMateriel> page = qmsUnqualifiedMaterielRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-unqualified-materiels");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-unqualified-materiels/:id : get the "id" qmsUnqualifiedMateriel.
     *
     * @param id the id of the qmsUnqualifiedMateriel to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsUnqualifiedMateriel, or with status 404 (Not Found)
     */
    @GetMapping("/qms-unqualified-materiels/{id}")
    @Timed
    public ResponseEntity<QmsUnqualifiedMateriel> getQmsUnqualifiedMateriel(@PathVariable Long id) {
        log.debug("REST request to get QmsUnqualifiedMateriel : {}", id);
        Optional<QmsUnqualifiedMateriel> qmsUnqualifiedMateriel = qmsUnqualifiedMaterielRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsUnqualifiedMateriel);
    }

    /**
     * DELETE  /qms-unqualified-materiels/:id : delete the "id" qmsUnqualifiedMateriel.
     *
     * @param id the id of the qmsUnqualifiedMateriel to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-unqualified-materiels/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsUnqualifiedMateriel(@PathVariable Long id) {
        log.debug("REST request to delete QmsUnqualifiedMateriel : {}", id);

        qmsUnqualifiedMaterielRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
