package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsMaterielEntry;
import cn.com.cnc.fcc.repository.QmsMaterielEntryRepository;
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
 * REST controller for managing QmsMaterielEntry.
 */
@RestController
@RequestMapping("/api")
public class QmsMaterielEntryResource {

    private final Logger log = LoggerFactory.getLogger(QmsMaterielEntryResource.class);

    private static final String ENTITY_NAME = "qmsMaterielEntry";

    private final QmsMaterielEntryRepository qmsMaterielEntryRepository;

    public QmsMaterielEntryResource(QmsMaterielEntryRepository qmsMaterielEntryRepository) {
        this.qmsMaterielEntryRepository = qmsMaterielEntryRepository;
    }

    /**
     * POST  /qms-materiel-entries : Create a new qmsMaterielEntry.
     *
     * @param qmsMaterielEntry the qmsMaterielEntry to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsMaterielEntry, or with status 400 (Bad Request) if the qmsMaterielEntry has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-materiel-entries")
    @Timed
    public ResponseEntity<QmsMaterielEntry> createQmsMaterielEntry(@Valid @RequestBody QmsMaterielEntry qmsMaterielEntry) throws URISyntaxException {
        log.debug("REST request to save QmsMaterielEntry : {}", qmsMaterielEntry);
        if (qmsMaterielEntry.getId() != null) {
            throw new BadRequestAlertException("A new qmsMaterielEntry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsMaterielEntry result = qmsMaterielEntryRepository.save(qmsMaterielEntry);
        return ResponseEntity.created(new URI("/api/qms-materiel-entries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-materiel-entries : Updates an existing qmsMaterielEntry.
     *
     * @param qmsMaterielEntry the qmsMaterielEntry to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsMaterielEntry,
     * or with status 400 (Bad Request) if the qmsMaterielEntry is not valid,
     * or with status 500 (Internal Server Error) if the qmsMaterielEntry couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-materiel-entries")
    @Timed
    public ResponseEntity<QmsMaterielEntry> updateQmsMaterielEntry(@Valid @RequestBody QmsMaterielEntry qmsMaterielEntry) throws URISyntaxException {
        log.debug("REST request to update QmsMaterielEntry : {}", qmsMaterielEntry);
        if (qmsMaterielEntry.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsMaterielEntry result = qmsMaterielEntryRepository.save(qmsMaterielEntry);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsMaterielEntry.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-materiel-entries : get all the qmsMaterielEntries.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsMaterielEntries in body
     */
    @GetMapping("/qms-materiel-entries")
    @Timed
    public ResponseEntity<List<QmsMaterielEntry>> getAllQmsMaterielEntries(Pageable pageable) {
        log.debug("REST request to get a page of QmsMaterielEntries");
        Page<QmsMaterielEntry> page = qmsMaterielEntryRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-materiel-entries");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-materiel-entries/:id : get the "id" qmsMaterielEntry.
     *
     * @param id the id of the qmsMaterielEntry to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsMaterielEntry, or with status 404 (Not Found)
     */
    @GetMapping("/qms-materiel-entries/{id}")
    @Timed
    public ResponseEntity<QmsMaterielEntry> getQmsMaterielEntry(@PathVariable Long id) {
        log.debug("REST request to get QmsMaterielEntry : {}", id);
        Optional<QmsMaterielEntry> qmsMaterielEntry = qmsMaterielEntryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsMaterielEntry);
    }

    /**
     * DELETE  /qms-materiel-entries/:id : delete the "id" qmsMaterielEntry.
     *
     * @param id the id of the qmsMaterielEntry to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-materiel-entries/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsMaterielEntry(@PathVariable Long id) {
        log.debug("REST request to delete QmsMaterielEntry : {}", id);

        qmsMaterielEntryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
