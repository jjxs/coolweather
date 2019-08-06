package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsNrvTelation;
import cn.com.cnc.fcc.repository.QmsNrvTelationRepository;
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
 * REST controller for managing QmsNrvTelation.
 */
@RestController
@RequestMapping("/api")
public class QmsNrvTelationResource {

    private final Logger log = LoggerFactory.getLogger(QmsNrvTelationResource.class);

    private static final String ENTITY_NAME = "qmsNrvTelation";

    private final QmsNrvTelationRepository qmsNrvTelationRepository;

    public QmsNrvTelationResource(QmsNrvTelationRepository qmsNrvTelationRepository) {
        this.qmsNrvTelationRepository = qmsNrvTelationRepository;
    }

    /**
     * POST  /qms-nrv-telations : Create a new qmsNrvTelation.
     *
     * @param qmsNrvTelation the qmsNrvTelation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsNrvTelation, or with status 400 (Bad Request) if the qmsNrvTelation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-nrv-telations")
    @Timed
    public ResponseEntity<QmsNrvTelation> createQmsNrvTelation(@Valid @RequestBody QmsNrvTelation qmsNrvTelation) throws URISyntaxException {
        log.debug("REST request to save QmsNrvTelation : {}", qmsNrvTelation);
        if (qmsNrvTelation.getId() != null) {
            throw new BadRequestAlertException("A new qmsNrvTelation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsNrvTelation result = qmsNrvTelationRepository.save(qmsNrvTelation);
        return ResponseEntity.created(new URI("/api/qms-nrv-telations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-nrv-telations : Updates an existing qmsNrvTelation.
     *
     * @param qmsNrvTelation the qmsNrvTelation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsNrvTelation,
     * or with status 400 (Bad Request) if the qmsNrvTelation is not valid,
     * or with status 500 (Internal Server Error) if the qmsNrvTelation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-nrv-telations")
    @Timed
    public ResponseEntity<QmsNrvTelation> updateQmsNrvTelation(@Valid @RequestBody QmsNrvTelation qmsNrvTelation) throws URISyntaxException {
        log.debug("REST request to update QmsNrvTelation : {}", qmsNrvTelation);
        if (qmsNrvTelation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsNrvTelation result = qmsNrvTelationRepository.save(qmsNrvTelation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsNrvTelation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-nrv-telations : get all the qmsNrvTelations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsNrvTelations in body
     */
    @GetMapping("/qms-nrv-telations")
    @Timed
    public ResponseEntity<List<QmsNrvTelation>> getAllQmsNrvTelations(Pageable pageable) {
        log.debug("REST request to get a page of QmsNrvTelations");
        Page<QmsNrvTelation> page = qmsNrvTelationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-nrv-telations");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-nrv-telations/:id : get the "id" qmsNrvTelation.
     *
     * @param id the id of the qmsNrvTelation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsNrvTelation, or with status 404 (Not Found)
     */
    @GetMapping("/qms-nrv-telations/{id}")
    @Timed
    public ResponseEntity<QmsNrvTelation> getQmsNrvTelation(@PathVariable Long id) {
        log.debug("REST request to get QmsNrvTelation : {}", id);
        Optional<QmsNrvTelation> qmsNrvTelation = qmsNrvTelationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsNrvTelation);
    }

    /**
     * DELETE  /qms-nrv-telations/:id : delete the "id" qmsNrvTelation.
     *
     * @param id the id of the qmsNrvTelation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-nrv-telations/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsNrvTelation(@PathVariable Long id) {
        log.debug("REST request to delete QmsNrvTelation : {}", id);

        qmsNrvTelationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
