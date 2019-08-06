package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsDefect;
import cn.com.cnc.fcc.repository.QmsDefectRepository;
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
 * REST controller for managing QmsDefect.
 */
@RestController
@RequestMapping("/api")
public class QmsDefectResource {

    private final Logger log = LoggerFactory.getLogger(QmsDefectResource.class);

    private static final String ENTITY_NAME = "qmsDefect";

    private final QmsDefectRepository qmsDefectRepository;

    public QmsDefectResource(QmsDefectRepository qmsDefectRepository) {
        this.qmsDefectRepository = qmsDefectRepository;
    }

    /**
     * POST  /qms-defects : Create a new qmsDefect.
     *
     * @param qmsDefect the qmsDefect to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsDefect, or with status 400 (Bad Request) if the qmsDefect has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-defects")
    @Timed
    public ResponseEntity<QmsDefect> createQmsDefect(@Valid @RequestBody QmsDefect qmsDefect) throws URISyntaxException {
        log.debug("REST request to save QmsDefect : {}", qmsDefect);
        if (qmsDefect.getId() != null) {
            throw new BadRequestAlertException("A new qmsDefect cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsDefect result = qmsDefectRepository.save(qmsDefect);
        return ResponseEntity.created(new URI("/api/qms-defects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-defects : Updates an existing qmsDefect.
     *
     * @param qmsDefect the qmsDefect to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsDefect,
     * or with status 400 (Bad Request) if the qmsDefect is not valid,
     * or with status 500 (Internal Server Error) if the qmsDefect couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-defects")
    @Timed
    public ResponseEntity<QmsDefect> updateQmsDefect(@Valid @RequestBody QmsDefect qmsDefect) throws URISyntaxException {
        log.debug("REST request to update QmsDefect : {}", qmsDefect);
        if (qmsDefect.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsDefect result = qmsDefectRepository.save(qmsDefect);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsDefect.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-defects : get all the qmsDefects.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsDefects in body
     */
    @GetMapping("/qms-defects")
    @Timed
    public ResponseEntity<List<QmsDefect>> getAllQmsDefects(Pageable pageable) {
        log.debug("REST request to get a page of QmsDefects");
        Page<QmsDefect> page = qmsDefectRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-defects");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-defects/:id : get the "id" qmsDefect.
     *
     * @param id the id of the qmsDefect to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsDefect, or with status 404 (Not Found)
     */
    @GetMapping("/qms-defects/{id}")
    @Timed
    public ResponseEntity<QmsDefect> getQmsDefect(@PathVariable Long id) {
        log.debug("REST request to get QmsDefect : {}", id);
        Optional<QmsDefect> qmsDefect = qmsDefectRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsDefect);
    }

    /**
     * DELETE  /qms-defects/:id : delete the "id" qmsDefect.
     *
     * @param id the id of the qmsDefect to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-defects/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsDefect(@PathVariable Long id) {
        log.debug("REST request to delete QmsDefect : {}", id);

        qmsDefectRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
