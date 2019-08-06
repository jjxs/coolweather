package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsMaterielDetails;
import cn.com.cnc.fcc.repository.QmsMaterielDetailsRepository;
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
 * REST controller for managing QmsMaterielDetails.
 */
@RestController
@RequestMapping("/api")
public class QmsMaterielDetailsResource {

    private final Logger log = LoggerFactory.getLogger(QmsMaterielDetailsResource.class);

    private static final String ENTITY_NAME = "qmsMaterielDetails";

    private final QmsMaterielDetailsRepository qmsMaterielDetailsRepository;

    public QmsMaterielDetailsResource(QmsMaterielDetailsRepository qmsMaterielDetailsRepository) {
        this.qmsMaterielDetailsRepository = qmsMaterielDetailsRepository;
    }

    /**
     * POST  /qms-materiel-details : Create a new qmsMaterielDetails.
     *
     * @param qmsMaterielDetails the qmsMaterielDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsMaterielDetails, or with status 400 (Bad Request) if the qmsMaterielDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-materiel-details")
    @Timed
    public ResponseEntity<QmsMaterielDetails> createQmsMaterielDetails(@Valid @RequestBody QmsMaterielDetails qmsMaterielDetails) throws URISyntaxException {
        log.debug("REST request to save QmsMaterielDetails : {}", qmsMaterielDetails);
        if (qmsMaterielDetails.getId() != null) {
            throw new BadRequestAlertException("A new qmsMaterielDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsMaterielDetails result = qmsMaterielDetailsRepository.save(qmsMaterielDetails);
        return ResponseEntity.created(new URI("/api/qms-materiel-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-materiel-details : Updates an existing qmsMaterielDetails.
     *
     * @param qmsMaterielDetails the qmsMaterielDetails to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsMaterielDetails,
     * or with status 400 (Bad Request) if the qmsMaterielDetails is not valid,
     * or with status 500 (Internal Server Error) if the qmsMaterielDetails couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-materiel-details")
    @Timed
    public ResponseEntity<QmsMaterielDetails> updateQmsMaterielDetails(@Valid @RequestBody QmsMaterielDetails qmsMaterielDetails) throws URISyntaxException {
        log.debug("REST request to update QmsMaterielDetails : {}", qmsMaterielDetails);
        if (qmsMaterielDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsMaterielDetails result = qmsMaterielDetailsRepository.save(qmsMaterielDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsMaterielDetails.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-materiel-details : get all the qmsMaterielDetails.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsMaterielDetails in body
     */
    @GetMapping("/qms-materiel-details")
    @Timed
    public ResponseEntity<List<QmsMaterielDetails>> getAllQmsMaterielDetails(Pageable pageable) {
        log.debug("REST request to get a page of QmsMaterielDetails");
        Page<QmsMaterielDetails> page = qmsMaterielDetailsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-materiel-details");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-materiel-details/:id : get the "id" qmsMaterielDetails.
     *
     * @param id the id of the qmsMaterielDetails to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsMaterielDetails, or with status 404 (Not Found)
     */
    @GetMapping("/qms-materiel-details/{id}")
    @Timed
    public ResponseEntity<QmsMaterielDetails> getQmsMaterielDetails(@PathVariable Long id) {
        log.debug("REST request to get QmsMaterielDetails : {}", id);
        Optional<QmsMaterielDetails> qmsMaterielDetails = qmsMaterielDetailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsMaterielDetails);
    }

    /**
     * DELETE  /qms-materiel-details/:id : delete the "id" qmsMaterielDetails.
     *
     * @param id the id of the qmsMaterielDetails to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-materiel-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsMaterielDetails(@PathVariable Long id) {
        log.debug("REST request to delete QmsMaterielDetails : {}", id);

        qmsMaterielDetailsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
