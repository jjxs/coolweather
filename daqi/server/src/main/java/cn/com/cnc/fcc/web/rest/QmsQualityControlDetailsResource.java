package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsQualityControlDetails;
import cn.com.cnc.fcc.repository.QmsQualityControlDetailsRepository;
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
 * REST controller for managing QmsQualityControlDetails.
 */
@RestController
@RequestMapping("/api")
public class QmsQualityControlDetailsResource {

    private final Logger log = LoggerFactory.getLogger(QmsQualityControlDetailsResource.class);

    private static final String ENTITY_NAME = "qmsQualityControlDetails";

    private final QmsQualityControlDetailsRepository qmsQualityControlDetailsRepository;

    public QmsQualityControlDetailsResource(QmsQualityControlDetailsRepository qmsQualityControlDetailsRepository) {
        this.qmsQualityControlDetailsRepository = qmsQualityControlDetailsRepository;
    }

    /**
     * POST  /qms-quality-control-details : Create a new qmsQualityControlDetails.
     *
     * @param qmsQualityControlDetails the qmsQualityControlDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsQualityControlDetails, or with status 400 (Bad Request) if the qmsQualityControlDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-quality-control-details")
    @Timed
    public ResponseEntity<QmsQualityControlDetails> createQmsQualityControlDetails(@Valid @RequestBody QmsQualityControlDetails qmsQualityControlDetails) throws URISyntaxException {
        log.debug("REST request to save QmsQualityControlDetails : {}", qmsQualityControlDetails);
        if (qmsQualityControlDetails.getId() != null) {
            throw new BadRequestAlertException("A new qmsQualityControlDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsQualityControlDetails result = qmsQualityControlDetailsRepository.save(qmsQualityControlDetails);
        return ResponseEntity.created(new URI("/api/qms-quality-control-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-quality-control-details : Updates an existing qmsQualityControlDetails.
     *
     * @param qmsQualityControlDetails the qmsQualityControlDetails to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsQualityControlDetails,
     * or with status 400 (Bad Request) if the qmsQualityControlDetails is not valid,
     * or with status 500 (Internal Server Error) if the qmsQualityControlDetails couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-quality-control-details")
    @Timed
    public ResponseEntity<QmsQualityControlDetails> updateQmsQualityControlDetails(@Valid @RequestBody QmsQualityControlDetails qmsQualityControlDetails) throws URISyntaxException {
        log.debug("REST request to update QmsQualityControlDetails : {}", qmsQualityControlDetails);
        if (qmsQualityControlDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsQualityControlDetails result = qmsQualityControlDetailsRepository.save(qmsQualityControlDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsQualityControlDetails.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-quality-control-details : get all the qmsQualityControlDetails.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsQualityControlDetails in body
     */
    @GetMapping("/qms-quality-control-details")
    @Timed
    public ResponseEntity<List<QmsQualityControlDetails>> getAllQmsQualityControlDetails(Pageable pageable) {
        log.debug("REST request to get a page of QmsQualityControlDetails");
        Page<QmsQualityControlDetails> page = qmsQualityControlDetailsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-quality-control-details");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-quality-control-details/:id : get the "id" qmsQualityControlDetails.
     *
     * @param id the id of the qmsQualityControlDetails to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsQualityControlDetails, or with status 404 (Not Found)
     */
    @GetMapping("/qms-quality-control-details/{id}")
    @Timed
    public ResponseEntity<QmsQualityControlDetails> getQmsQualityControlDetails(@PathVariable Long id) {
        log.debug("REST request to get QmsQualityControlDetails : {}", id);
        Optional<QmsQualityControlDetails> qmsQualityControlDetails = qmsQualityControlDetailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsQualityControlDetails);
    }

    /**
     * DELETE  /qms-quality-control-details/:id : delete the "id" qmsQualityControlDetails.
     *
     * @param id the id of the qmsQualityControlDetails to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-quality-control-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsQualityControlDetails(@PathVariable Long id) {
        log.debug("REST request to delete QmsQualityControlDetails : {}", id);

        qmsQualityControlDetailsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
