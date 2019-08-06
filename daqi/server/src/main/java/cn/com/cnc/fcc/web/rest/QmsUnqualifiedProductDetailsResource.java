package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsUnqualifiedProductDetails;
import cn.com.cnc.fcc.repository.QmsUnqualifiedProductDetailsRepository;
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
 * REST controller for managing QmsUnqualifiedProductDetails.
 */
@RestController
@RequestMapping("/api")
public class QmsUnqualifiedProductDetailsResource {

    private final Logger log = LoggerFactory.getLogger(QmsUnqualifiedProductDetailsResource.class);

    private static final String ENTITY_NAME = "qmsUnqualifiedProductDetails";

    private final QmsUnqualifiedProductDetailsRepository qmsUnqualifiedProductDetailsRepository;

    public QmsUnqualifiedProductDetailsResource(QmsUnqualifiedProductDetailsRepository qmsUnqualifiedProductDetailsRepository) {
        this.qmsUnqualifiedProductDetailsRepository = qmsUnqualifiedProductDetailsRepository;
    }

    /**
     * POST  /qms-unqualified-product-details : Create a new qmsUnqualifiedProductDetails.
     *
     * @param qmsUnqualifiedProductDetails the qmsUnqualifiedProductDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsUnqualifiedProductDetails, or with status 400 (Bad Request) if the qmsUnqualifiedProductDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-unqualified-product-details")
    @Timed
    public ResponseEntity<QmsUnqualifiedProductDetails> createQmsUnqualifiedProductDetails(@Valid @RequestBody QmsUnqualifiedProductDetails qmsUnqualifiedProductDetails) throws URISyntaxException {
        log.debug("REST request to save QmsUnqualifiedProductDetails : {}", qmsUnqualifiedProductDetails);
        if (qmsUnqualifiedProductDetails.getId() != null) {
            throw new BadRequestAlertException("A new qmsUnqualifiedProductDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsUnqualifiedProductDetails result = qmsUnqualifiedProductDetailsRepository.save(qmsUnqualifiedProductDetails);
        return ResponseEntity.created(new URI("/api/qms-unqualified-product-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-unqualified-product-details : Updates an existing qmsUnqualifiedProductDetails.
     *
     * @param qmsUnqualifiedProductDetails the qmsUnqualifiedProductDetails to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsUnqualifiedProductDetails,
     * or with status 400 (Bad Request) if the qmsUnqualifiedProductDetails is not valid,
     * or with status 500 (Internal Server Error) if the qmsUnqualifiedProductDetails couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-unqualified-product-details")
    @Timed
    public ResponseEntity<QmsUnqualifiedProductDetails> updateQmsUnqualifiedProductDetails(@Valid @RequestBody QmsUnqualifiedProductDetails qmsUnqualifiedProductDetails) throws URISyntaxException {
        log.debug("REST request to update QmsUnqualifiedProductDetails : {}", qmsUnqualifiedProductDetails);
        if (qmsUnqualifiedProductDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsUnqualifiedProductDetails result = qmsUnqualifiedProductDetailsRepository.save(qmsUnqualifiedProductDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsUnqualifiedProductDetails.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-unqualified-product-details : get all the qmsUnqualifiedProductDetails.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsUnqualifiedProductDetails in body
     */
    @GetMapping("/qms-unqualified-product-details")
    @Timed
    public ResponseEntity<List<QmsUnqualifiedProductDetails>> getAllQmsUnqualifiedProductDetails(Pageable pageable) {
        log.debug("REST request to get a page of QmsUnqualifiedProductDetails");
        Page<QmsUnqualifiedProductDetails> page = qmsUnqualifiedProductDetailsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-unqualified-product-details");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-unqualified-product-details/:id : get the "id" qmsUnqualifiedProductDetails.
     *
     * @param id the id of the qmsUnqualifiedProductDetails to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsUnqualifiedProductDetails, or with status 404 (Not Found)
     */
    @GetMapping("/qms-unqualified-product-details/{id}")
    @Timed
    public ResponseEntity<QmsUnqualifiedProductDetails> getQmsUnqualifiedProductDetails(@PathVariable Long id) {
        log.debug("REST request to get QmsUnqualifiedProductDetails : {}", id);
        Optional<QmsUnqualifiedProductDetails> qmsUnqualifiedProductDetails = qmsUnqualifiedProductDetailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsUnqualifiedProductDetails);
    }

    /**
     * DELETE  /qms-unqualified-product-details/:id : delete the "id" qmsUnqualifiedProductDetails.
     *
     * @param id the id of the qmsUnqualifiedProductDetails to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-unqualified-product-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsUnqualifiedProductDetails(@PathVariable Long id) {
        log.debug("REST request to delete QmsUnqualifiedProductDetails : {}", id);

        qmsUnqualifiedProductDetailsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
