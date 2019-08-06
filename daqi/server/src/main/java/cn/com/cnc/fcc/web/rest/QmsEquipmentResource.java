package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsEquipment;
import cn.com.cnc.fcc.repository.QmsEquipmentRepository;
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
 * REST controller for managing QmsEquipment.
 */
@RestController
@RequestMapping("/api")
public class QmsEquipmentResource {

    private final Logger log = LoggerFactory.getLogger(QmsEquipmentResource.class);

    private static final String ENTITY_NAME = "qmsEquipment";

    private final QmsEquipmentRepository qmsEquipmentRepository;

    public QmsEquipmentResource(QmsEquipmentRepository qmsEquipmentRepository) {
        this.qmsEquipmentRepository = qmsEquipmentRepository;
    }

    /**
     * POST  /qms-equipments : Create a new qmsEquipment.
     *
     * @param qmsEquipment the qmsEquipment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsEquipment, or with status 400 (Bad Request) if the qmsEquipment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-equipments")
    @Timed
    public ResponseEntity<QmsEquipment> createQmsEquipment(@Valid @RequestBody QmsEquipment qmsEquipment) throws URISyntaxException {
        log.debug("REST request to save QmsEquipment : {}", qmsEquipment);
        if (qmsEquipment.getId() != null) {
            throw new BadRequestAlertException("A new qmsEquipment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsEquipment result = qmsEquipmentRepository.save(qmsEquipment);
        return ResponseEntity.created(new URI("/api/qms-equipments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-equipments : Updates an existing qmsEquipment.
     *
     * @param qmsEquipment the qmsEquipment to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsEquipment,
     * or with status 400 (Bad Request) if the qmsEquipment is not valid,
     * or with status 500 (Internal Server Error) if the qmsEquipment couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-equipments")
    @Timed
    public ResponseEntity<QmsEquipment> updateQmsEquipment(@Valid @RequestBody QmsEquipment qmsEquipment) throws URISyntaxException {
        log.debug("REST request to update QmsEquipment : {}", qmsEquipment);
        if (qmsEquipment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsEquipment result = qmsEquipmentRepository.save(qmsEquipment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsEquipment.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-equipments : get all the qmsEquipments.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsEquipments in body
     */
    @GetMapping("/qms-equipments")
    @Timed
    public ResponseEntity<List<QmsEquipment>> getAllQmsEquipments(Pageable pageable) {
        log.debug("REST request to get a page of QmsEquipments");
        Page<QmsEquipment> page = qmsEquipmentRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-equipments");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-equipments/:id : get the "id" qmsEquipment.
     *
     * @param id the id of the qmsEquipment to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsEquipment, or with status 404 (Not Found)
     */
    @GetMapping("/qms-equipments/{id}")
    @Timed
    public ResponseEntity<QmsEquipment> getQmsEquipment(@PathVariable Long id) {
        log.debug("REST request to get QmsEquipment : {}", id);
        Optional<QmsEquipment> qmsEquipment = qmsEquipmentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsEquipment);
    }

    /**
     * DELETE  /qms-equipments/:id : delete the "id" qmsEquipment.
     *
     * @param id the id of the qmsEquipment to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-equipments/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsEquipment(@PathVariable Long id) {
        log.debug("REST request to delete QmsEquipment : {}", id);

        qmsEquipmentRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
