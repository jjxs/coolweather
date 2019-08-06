package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsCarRecordbookMain;
import cn.com.cnc.fcc.repository.QmsCarRecordbookMainRepository;
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
 * REST controller for managing QmsCarRecordbookMain.
 */
@RestController
@RequestMapping("/api")
public class QmsCarRecordbookMainResource {

    private final Logger log = LoggerFactory.getLogger(QmsCarRecordbookMainResource.class);

    private static final String ENTITY_NAME = "qmsCarRecordbookMain";

    private final QmsCarRecordbookMainRepository qmsCarRecordbookMainRepository;

    public QmsCarRecordbookMainResource(QmsCarRecordbookMainRepository qmsCarRecordbookMainRepository) {
        this.qmsCarRecordbookMainRepository = qmsCarRecordbookMainRepository;
    }

    /**
     * POST  /qms-car-recordbook-mains : Create a new qmsCarRecordbookMain.
     *
     * @param qmsCarRecordbookMain the qmsCarRecordbookMain to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsCarRecordbookMain, or with status 400 (Bad Request) if the qmsCarRecordbookMain has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-car-recordbook-mains")
    @Timed
    public ResponseEntity<QmsCarRecordbookMain> createQmsCarRecordbookMain(@Valid @RequestBody QmsCarRecordbookMain qmsCarRecordbookMain) throws URISyntaxException {
        log.debug("REST request to save QmsCarRecordbookMain : {}", qmsCarRecordbookMain);
        if (qmsCarRecordbookMain.getId() != null) {
            throw new BadRequestAlertException("A new qmsCarRecordbookMain cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsCarRecordbookMain result = qmsCarRecordbookMainRepository.save(qmsCarRecordbookMain);
        return ResponseEntity.created(new URI("/api/qms-car-recordbook-mains/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-car-recordbook-mains : Updates an existing qmsCarRecordbookMain.
     *
     * @param qmsCarRecordbookMain the qmsCarRecordbookMain to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsCarRecordbookMain,
     * or with status 400 (Bad Request) if the qmsCarRecordbookMain is not valid,
     * or with status 500 (Internal Server Error) if the qmsCarRecordbookMain couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-car-recordbook-mains")
    @Timed
    public ResponseEntity<QmsCarRecordbookMain> updateQmsCarRecordbookMain(@Valid @RequestBody QmsCarRecordbookMain qmsCarRecordbookMain) throws URISyntaxException {
        log.debug("REST request to update QmsCarRecordbookMain : {}", qmsCarRecordbookMain);
        if (qmsCarRecordbookMain.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsCarRecordbookMain result = qmsCarRecordbookMainRepository.save(qmsCarRecordbookMain);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsCarRecordbookMain.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-car-recordbook-mains : get all the qmsCarRecordbookMains.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsCarRecordbookMains in body
     */
    @GetMapping("/qms-car-recordbook-mains")
    @Timed
    public ResponseEntity<List<QmsCarRecordbookMain>> getAllQmsCarRecordbookMains(Pageable pageable) {
        log.debug("REST request to get a page of QmsCarRecordbookMains");
        Page<QmsCarRecordbookMain> page = qmsCarRecordbookMainRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-car-recordbook-mains");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-car-recordbook-mains/:id : get the "id" qmsCarRecordbookMain.
     *
     * @param id the id of the qmsCarRecordbookMain to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsCarRecordbookMain, or with status 404 (Not Found)
     */
    @GetMapping("/qms-car-recordbook-mains/{id}")
    @Timed
    public ResponseEntity<QmsCarRecordbookMain> getQmsCarRecordbookMain(@PathVariable Long id) {
        log.debug("REST request to get QmsCarRecordbookMain : {}", id);
        Optional<QmsCarRecordbookMain> qmsCarRecordbookMain = qmsCarRecordbookMainRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsCarRecordbookMain);
    }

    /**
     * DELETE  /qms-car-recordbook-mains/:id : delete the "id" qmsCarRecordbookMain.
     *
     * @param id the id of the qmsCarRecordbookMain to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-car-recordbook-mains/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsCarRecordbookMain(@PathVariable Long id) {
        log.debug("REST request to delete QmsCarRecordbookMain : {}", id);

        qmsCarRecordbookMainRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
