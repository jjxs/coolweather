package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsEnclosure;
import cn.com.cnc.fcc.repository.QmsEnclosureRepository;
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
 * REST controller for managing QmsEnclosure.
 */
@RestController
@RequestMapping("/api")
public class QmsEnclosureResource {

    private final Logger log = LoggerFactory.getLogger(QmsEnclosureResource.class);

    private static final String ENTITY_NAME = "qmsEnclosure";

    private final QmsEnclosureRepository qmsEnclosureRepository;

    public QmsEnclosureResource(QmsEnclosureRepository qmsEnclosureRepository) {
        this.qmsEnclosureRepository = qmsEnclosureRepository;
    }

    /**
     * POST  /qms-enclosures : Create a new qmsEnclosure.
     *
     * @param qmsEnclosure the qmsEnclosure to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsEnclosure, or with status 400 (Bad Request) if the qmsEnclosure has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-enclosures")
    @Timed
    public ResponseEntity<QmsEnclosure> createQmsEnclosure(@Valid @RequestBody QmsEnclosure qmsEnclosure) throws URISyntaxException {
        log.debug("REST request to save QmsEnclosure : {}", qmsEnclosure);
        if (qmsEnclosure.getId() != null) {
            throw new BadRequestAlertException("A new qmsEnclosure cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsEnclosure result = qmsEnclosureRepository.save(qmsEnclosure);
        return ResponseEntity.created(new URI("/api/qms-enclosures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-enclosures : Updates an existing qmsEnclosure.
     *
     * @param qmsEnclosure the qmsEnclosure to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsEnclosure,
     * or with status 400 (Bad Request) if the qmsEnclosure is not valid,
     * or with status 500 (Internal Server Error) if the qmsEnclosure couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-enclosures")
    @Timed
    public ResponseEntity<QmsEnclosure> updateQmsEnclosure(@Valid @RequestBody QmsEnclosure qmsEnclosure) throws URISyntaxException {
        log.debug("REST request to update QmsEnclosure : {}", qmsEnclosure);
        if (qmsEnclosure.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsEnclosure result = qmsEnclosureRepository.save(qmsEnclosure);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsEnclosure.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-enclosures : get all the qmsEnclosures.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsEnclosures in body
     */
    @GetMapping("/qms-enclosures")
    @Timed
    public ResponseEntity<List<QmsEnclosure>> getAllQmsEnclosures(Pageable pageable) {
        log.debug("REST request to get a page of QmsEnclosures");
        Page<QmsEnclosure> page = qmsEnclosureRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-enclosures");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-enclosures/:id : get the "id" qmsEnclosure.
     *
     * @param id the id of the qmsEnclosure to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsEnclosure, or with status 404 (Not Found)
     */
    @GetMapping("/qms-enclosures/{id}")
    @Timed
    public ResponseEntity<QmsEnclosure> getQmsEnclosure(@PathVariable Long id) {
        log.debug("REST request to get QmsEnclosure : {}", id);
        Optional<QmsEnclosure> qmsEnclosure = qmsEnclosureRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsEnclosure);
    }

    /**
     * DELETE  /qms-enclosures/:id : delete the "id" qmsEnclosure.
     *
     * @param id the id of the qmsEnclosure to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-enclosures/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsEnclosure(@PathVariable Long id) {
        log.debug("REST request to delete QmsEnclosure : {}", id);

        qmsEnclosureRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
