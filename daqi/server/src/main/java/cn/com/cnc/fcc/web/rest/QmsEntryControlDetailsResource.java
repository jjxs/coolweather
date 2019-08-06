package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsEntryControlDetails;
import cn.com.cnc.fcc.repository.QmsEntryControlDetailsRepository;
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
 * REST controller for managing QmsEntryControlDetails.
 */
@RestController
@RequestMapping("/api")
public class QmsEntryControlDetailsResource {

    private final Logger log = LoggerFactory.getLogger(QmsEntryControlDetailsResource.class);

    private static final String ENTITY_NAME = "qmsEntryControlDetails";

    private final QmsEntryControlDetailsRepository qmsEntryControlDetailsRepository;

    public QmsEntryControlDetailsResource(QmsEntryControlDetailsRepository qmsEntryControlDetailsRepository) {
        this.qmsEntryControlDetailsRepository = qmsEntryControlDetailsRepository;
    }

    /**
     * POST  /qms-entry-control-details : Create a new qmsEntryControlDetails.
     *
     * @param qmsEntryControlDetails the qmsEntryControlDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsEntryControlDetails, or with status 400 (Bad Request) if the qmsEntryControlDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-entry-control-details")
    @Timed
    public ResponseEntity<QmsEntryControlDetails> createQmsEntryControlDetails(@Valid @RequestBody QmsEntryControlDetails qmsEntryControlDetails) throws URISyntaxException {
        log.debug("REST request to save QmsEntryControlDetails : {}", qmsEntryControlDetails);
        if (qmsEntryControlDetails.getId() != null) {
            throw new BadRequestAlertException("A new qmsEntryControlDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsEntryControlDetails result = qmsEntryControlDetailsRepository.save(qmsEntryControlDetails);
        return ResponseEntity.created(new URI("/api/qms-entry-control-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-entry-control-details : Updates an existing qmsEntryControlDetails.
     *
     * @param qmsEntryControlDetails the qmsEntryControlDetails to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsEntryControlDetails,
     * or with status 400 (Bad Request) if the qmsEntryControlDetails is not valid,
     * or with status 500 (Internal Server Error) if the qmsEntryControlDetails couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-entry-control-details")
    @Timed
    public ResponseEntity<QmsEntryControlDetails> updateQmsEntryControlDetails(@Valid @RequestBody QmsEntryControlDetails qmsEntryControlDetails) throws URISyntaxException {
        log.debug("REST request to update QmsEntryControlDetails : {}", qmsEntryControlDetails);
        if (qmsEntryControlDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsEntryControlDetails result = qmsEntryControlDetailsRepository.save(qmsEntryControlDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsEntryControlDetails.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-entry-control-details : get all the qmsEntryControlDetails.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsEntryControlDetails in body
     */
    @GetMapping("/qms-entry-control-details")
    @Timed
    public ResponseEntity<List<QmsEntryControlDetails>> getAllQmsEntryControlDetails(Pageable pageable) {
        log.debug("REST request to get a page of QmsEntryControlDetails");
        Page<QmsEntryControlDetails> page = qmsEntryControlDetailsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-entry-control-details");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-entry-control-details/:id : get the "id" qmsEntryControlDetails.
     *
     * @param id the id of the qmsEntryControlDetails to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsEntryControlDetails, or with status 404 (Not Found)
     */
    @GetMapping("/qms-entry-control-details/{id}")
    @Timed
    public ResponseEntity<QmsEntryControlDetails> getQmsEntryControlDetails(@PathVariable Long id) {
        log.debug("REST request to get QmsEntryControlDetails : {}", id);
        Optional<QmsEntryControlDetails> qmsEntryControlDetails = qmsEntryControlDetailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsEntryControlDetails);
    }

    /**
     * DELETE  /qms-entry-control-details/:id : delete the "id" qmsEntryControlDetails.
     *
     * @param id the id of the qmsEntryControlDetails to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-entry-control-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsEntryControlDetails(@PathVariable Long id) {
        log.debug("REST request to delete QmsEntryControlDetails : {}", id);

        qmsEntryControlDetailsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
