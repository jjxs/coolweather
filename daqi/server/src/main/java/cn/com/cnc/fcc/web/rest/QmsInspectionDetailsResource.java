package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsInspectionDetails;
import cn.com.cnc.fcc.repository.QmsInspectionDetailsRepository;
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
 * REST controller for managing QmsInspectionDetails.
 */
@RestController
@RequestMapping("/api")
public class QmsInspectionDetailsResource {

    private final Logger log = LoggerFactory.getLogger(QmsInspectionDetailsResource.class);

    private static final String ENTITY_NAME = "qmsInspectionDetails";

    private final QmsInspectionDetailsRepository qmsInspectionDetailsRepository;

    public QmsInspectionDetailsResource(QmsInspectionDetailsRepository qmsInspectionDetailsRepository) {
        this.qmsInspectionDetailsRepository = qmsInspectionDetailsRepository;
    }

    /**
     * POST  /qms-inspection-details : Create a new qmsInspectionDetails.
     *
     * @param qmsInspectionDetails the qmsInspectionDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsInspectionDetails, or with status 400 (Bad Request) if the qmsInspectionDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-inspection-details")
    @Timed
    public ResponseEntity<QmsInspectionDetails> createQmsInspectionDetails(@Valid @RequestBody QmsInspectionDetails qmsInspectionDetails) throws URISyntaxException {
        log.debug("REST request to save QmsInspectionDetails : {}", qmsInspectionDetails);
        if (qmsInspectionDetails.getId() != null) {
            throw new BadRequestAlertException("A new qmsInspectionDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsInspectionDetails result = qmsInspectionDetailsRepository.save(qmsInspectionDetails);
        return ResponseEntity.created(new URI("/api/qms-inspection-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-inspection-details : Updates an existing qmsInspectionDetails.
     *
     * @param qmsInspectionDetails the qmsInspectionDetails to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsInspectionDetails,
     * or with status 400 (Bad Request) if the qmsInspectionDetails is not valid,
     * or with status 500 (Internal Server Error) if the qmsInspectionDetails couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-inspection-details")
    @Timed
    public ResponseEntity<QmsInspectionDetails> updateQmsInspectionDetails(@Valid @RequestBody QmsInspectionDetails qmsInspectionDetails) throws URISyntaxException {
        log.debug("REST request to update QmsInspectionDetails : {}", qmsInspectionDetails);
        if (qmsInspectionDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsInspectionDetails result = qmsInspectionDetailsRepository.save(qmsInspectionDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsInspectionDetails.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-inspection-details : get all the qmsInspectionDetails.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsInspectionDetails in body
     */
    @GetMapping("/qms-inspection-details")
    @Timed
    public ResponseEntity<List<QmsInspectionDetails>> getAllQmsInspectionDetails(Pageable pageable) {
        log.debug("REST request to get a page of QmsInspectionDetails");
        Page<QmsInspectionDetails> page = qmsInspectionDetailsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-inspection-details");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-inspection-details/:id : get the "id" qmsInspectionDetails.
     *
     * @param id the id of the qmsInspectionDetails to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsInspectionDetails, or with status 404 (Not Found)
     */
    @GetMapping("/qms-inspection-details/{id}")
    @Timed
    public ResponseEntity<QmsInspectionDetails> getQmsInspectionDetails(@PathVariable Long id) {
        log.debug("REST request to get QmsInspectionDetails : {}", id);
        Optional<QmsInspectionDetails> qmsInspectionDetails = qmsInspectionDetailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsInspectionDetails);
    }

    /**
     * DELETE  /qms-inspection-details/:id : delete the "id" qmsInspectionDetails.
     *
     * @param id the id of the qmsInspectionDetails to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-inspection-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsInspectionDetails(@PathVariable Long id) {
        log.debug("REST request to delete QmsInspectionDetails : {}", id);

        qmsInspectionDetailsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
