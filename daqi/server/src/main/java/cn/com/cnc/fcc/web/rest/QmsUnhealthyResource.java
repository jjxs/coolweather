package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsUnhealthy;
import cn.com.cnc.fcc.repository.QmsUnhealthyRepository;
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
 * REST controller for managing QmsUnhealthy.
 */
@RestController
@RequestMapping("/api")
public class QmsUnhealthyResource {

    private final Logger log = LoggerFactory.getLogger(QmsUnhealthyResource.class);

    private static final String ENTITY_NAME = "qmsUnhealthy";

    private final QmsUnhealthyRepository qmsUnhealthyRepository;

    public QmsUnhealthyResource(QmsUnhealthyRepository qmsUnhealthyRepository) {
        this.qmsUnhealthyRepository = qmsUnhealthyRepository;
    }

    /**
     * POST  /qms-unhealthies : Create a new qmsUnhealthy.
     *
     * @param qmsUnhealthy the qmsUnhealthy to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsUnhealthy, or with status 400 (Bad Request) if the qmsUnhealthy has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-unhealthies")
    @Timed
    public ResponseEntity<QmsUnhealthy> createQmsUnhealthy(@Valid @RequestBody QmsUnhealthy qmsUnhealthy) throws URISyntaxException {
        log.debug("REST request to save QmsUnhealthy : {}", qmsUnhealthy);
        if (qmsUnhealthy.getId() != null) {
            throw new BadRequestAlertException("A new qmsUnhealthy cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsUnhealthy result = qmsUnhealthyRepository.save(qmsUnhealthy);
        return ResponseEntity.created(new URI("/api/qms-unhealthies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-unhealthies : Updates an existing qmsUnhealthy.
     *
     * @param qmsUnhealthy the qmsUnhealthy to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsUnhealthy,
     * or with status 400 (Bad Request) if the qmsUnhealthy is not valid,
     * or with status 500 (Internal Server Error) if the qmsUnhealthy couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-unhealthies")
    @Timed
    public ResponseEntity<QmsUnhealthy> updateQmsUnhealthy(@Valid @RequestBody QmsUnhealthy qmsUnhealthy) throws URISyntaxException {
        log.debug("REST request to update QmsUnhealthy : {}", qmsUnhealthy);
        if (qmsUnhealthy.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsUnhealthy result = qmsUnhealthyRepository.save(qmsUnhealthy);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsUnhealthy.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-unhealthies : get all the qmsUnhealthies.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsUnhealthies in body
     */
    @GetMapping("/qms-unhealthies")
    @Timed
    public ResponseEntity<List<QmsUnhealthy>> getAllQmsUnhealthies(Pageable pageable) {
        log.debug("REST request to get a page of QmsUnhealthies");
        Page<QmsUnhealthy> page = qmsUnhealthyRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-unhealthies");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-unhealthies/:id : get the "id" qmsUnhealthy.
     *
     * @param id the id of the qmsUnhealthy to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsUnhealthy, or with status 404 (Not Found)
     */
    @GetMapping("/qms-unhealthies/{id}")
    @Timed
    public ResponseEntity<QmsUnhealthy> getQmsUnhealthy(@PathVariable Long id) {
        log.debug("REST request to get QmsUnhealthy : {}", id);
        Optional<QmsUnhealthy> qmsUnhealthy = qmsUnhealthyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsUnhealthy);
    }

    /**
     * DELETE  /qms-unhealthies/:id : delete the "id" qmsUnhealthy.
     *
     * @param id the id of the qmsUnhealthy to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-unhealthies/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsUnhealthy(@PathVariable Long id) {
        log.debug("REST request to delete QmsUnhealthy : {}", id);

        qmsUnhealthyRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
