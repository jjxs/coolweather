package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsNotice;
import cn.com.cnc.fcc.repository.QmsNoticeRepository;
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
 * REST controller for managing QmsNotice.
 */
@RestController
@RequestMapping("/api")
public class QmsNoticeResource {

    private final Logger log = LoggerFactory.getLogger(QmsNoticeResource.class);

    private static final String ENTITY_NAME = "qmsNotice";

    private final QmsNoticeRepository qmsNoticeRepository;

    public QmsNoticeResource(QmsNoticeRepository qmsNoticeRepository) {
        this.qmsNoticeRepository = qmsNoticeRepository;
    }

    /**
     * POST  /qms-notices : Create a new qmsNotice.
     *
     * @param qmsNotice the qmsNotice to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsNotice, or with status 400 (Bad Request) if the qmsNotice has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-notices")
    @Timed
    public ResponseEntity<QmsNotice> createQmsNotice(@Valid @RequestBody QmsNotice qmsNotice) throws URISyntaxException {
        log.debug("REST request to save QmsNotice : {}", qmsNotice);
        if (qmsNotice.getId() != null) {
            throw new BadRequestAlertException("A new qmsNotice cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsNotice result = qmsNoticeRepository.save(qmsNotice);
        return ResponseEntity.created(new URI("/api/qms-notices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-notices : Updates an existing qmsNotice.
     *
     * @param qmsNotice the qmsNotice to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsNotice,
     * or with status 400 (Bad Request) if the qmsNotice is not valid,
     * or with status 500 (Internal Server Error) if the qmsNotice couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-notices")
    @Timed
    public ResponseEntity<QmsNotice> updateQmsNotice(@Valid @RequestBody QmsNotice qmsNotice) throws URISyntaxException {
        log.debug("REST request to update QmsNotice : {}", qmsNotice);
        if (qmsNotice.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsNotice result = qmsNoticeRepository.save(qmsNotice);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsNotice.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-notices : get all the qmsNotices.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsNotices in body
     */
    @GetMapping("/qms-notices")
    @Timed
    public ResponseEntity<List<QmsNotice>> getAllQmsNotices(Pageable pageable) {
        log.debug("REST request to get a page of QmsNotices");
        Page<QmsNotice> page = qmsNoticeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-notices");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-notices/:id : get the "id" qmsNotice.
     *
     * @param id the id of the qmsNotice to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsNotice, or with status 404 (Not Found)
     */
    @GetMapping("/qms-notices/{id}")
    @Timed
    public ResponseEntity<QmsNotice> getQmsNotice(@PathVariable Long id) {
        log.debug("REST request to get QmsNotice : {}", id);
        Optional<QmsNotice> qmsNotice = qmsNoticeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsNotice);
    }

    /**
     * DELETE  /qms-notices/:id : delete the "id" qmsNotice.
     *
     * @param id the id of the qmsNotice to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-notices/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsNotice(@PathVariable Long id) {
        log.debug("REST request to delete QmsNotice : {}", id);

        qmsNoticeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
