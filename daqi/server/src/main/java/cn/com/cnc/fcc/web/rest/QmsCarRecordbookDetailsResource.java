package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsCarRecordbookDetails;
import cn.com.cnc.fcc.repository.QmsCarRecordbookDetailsRepository;
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
 * REST controller for managing QmsCarRecordbookDetails.
 */
@RestController
@RequestMapping("/api")
public class QmsCarRecordbookDetailsResource {

    private final Logger log = LoggerFactory.getLogger(QmsCarRecordbookDetailsResource.class);

    private static final String ENTITY_NAME = "qmsCarRecordbookDetails";

    private final QmsCarRecordbookDetailsRepository qmsCarRecordbookDetailsRepository;

    public QmsCarRecordbookDetailsResource(QmsCarRecordbookDetailsRepository qmsCarRecordbookDetailsRepository) {
        this.qmsCarRecordbookDetailsRepository = qmsCarRecordbookDetailsRepository;
    }

    /**
     * POST  /qms-car-recordbook-details : Create a new qmsCarRecordbookDetails.
     *
     * @param qmsCarRecordbookDetails the qmsCarRecordbookDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsCarRecordbookDetails, or with status 400 (Bad Request) if the qmsCarRecordbookDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-car-recordbook-details")
    @Timed
    public ResponseEntity<QmsCarRecordbookDetails> createQmsCarRecordbookDetails(@Valid @RequestBody QmsCarRecordbookDetails qmsCarRecordbookDetails) throws URISyntaxException {
        log.debug("REST request to save QmsCarRecordbookDetails : {}", qmsCarRecordbookDetails);
        if (qmsCarRecordbookDetails.getId() != null) {
            throw new BadRequestAlertException("A new qmsCarRecordbookDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsCarRecordbookDetails result = qmsCarRecordbookDetailsRepository.save(qmsCarRecordbookDetails);
        return ResponseEntity.created(new URI("/api/qms-car-recordbook-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-car-recordbook-details : Updates an existing qmsCarRecordbookDetails.
     *
     * @param qmsCarRecordbookDetails the qmsCarRecordbookDetails to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsCarRecordbookDetails,
     * or with status 400 (Bad Request) if the qmsCarRecordbookDetails is not valid,
     * or with status 500 (Internal Server Error) if the qmsCarRecordbookDetails couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-car-recordbook-details")
    @Timed
    public ResponseEntity<QmsCarRecordbookDetails> updateQmsCarRecordbookDetails(@Valid @RequestBody QmsCarRecordbookDetails qmsCarRecordbookDetails) throws URISyntaxException {
        log.debug("REST request to update QmsCarRecordbookDetails : {}", qmsCarRecordbookDetails);
        if (qmsCarRecordbookDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsCarRecordbookDetails result = qmsCarRecordbookDetailsRepository.save(qmsCarRecordbookDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsCarRecordbookDetails.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-car-recordbook-details : get all the qmsCarRecordbookDetails.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsCarRecordbookDetails in body
     */
    @GetMapping("/qms-car-recordbook-details")
    @Timed
    public ResponseEntity<List<QmsCarRecordbookDetails>> getAllQmsCarRecordbookDetails(Pageable pageable) {
        log.debug("REST request to get a page of QmsCarRecordbookDetails");
        Page<QmsCarRecordbookDetails> page = qmsCarRecordbookDetailsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-car-recordbook-details");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-car-recordbook-details/:id : get the "id" qmsCarRecordbookDetails.
     *
     * @param id the id of the qmsCarRecordbookDetails to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsCarRecordbookDetails, or with status 404 (Not Found)
     */
    @GetMapping("/qms-car-recordbook-details/{id}")
    @Timed
    public ResponseEntity<QmsCarRecordbookDetails> getQmsCarRecordbookDetails(@PathVariable Long id) {
        log.debug("REST request to get QmsCarRecordbookDetails : {}", id);
        Optional<QmsCarRecordbookDetails> qmsCarRecordbookDetails = qmsCarRecordbookDetailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsCarRecordbookDetails);
    }

    /**
     * DELETE  /qms-car-recordbook-details/:id : delete the "id" qmsCarRecordbookDetails.
     *
     * @param id the id of the qmsCarRecordbookDetails to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-car-recordbook-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsCarRecordbookDetails(@PathVariable Long id) {
        log.debug("REST request to delete QmsCarRecordbookDetails : {}", id);

        qmsCarRecordbookDetailsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
