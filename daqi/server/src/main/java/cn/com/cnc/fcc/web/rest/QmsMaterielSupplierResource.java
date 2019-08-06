package cn.com.cnc.fcc.web.rest;

import cn.com.cnc.fcc.service.QmsSuppliersInfoService;
import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsMaterielSupplier;
import cn.com.cnc.fcc.repository.QmsMaterielSupplierRepository;
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
 * REST controller for managing QmsMaterielSupplier.
 */
@RestController
@RequestMapping("/api")
public class QmsMaterielSupplierResource {

    private final Logger log = LoggerFactory.getLogger(QmsMaterielSupplierResource.class);

    private static final String ENTITY_NAME = "qmsMaterielSupplier";

    private final QmsMaterielSupplierRepository qmsMaterielSupplierRepository;

    public QmsMaterielSupplierResource(QmsMaterielSupplierRepository qmsMaterielSupplierRepository) {
        this.qmsMaterielSupplierRepository = qmsMaterielSupplierRepository;
    }

    /**
     * POST  /qms-materiel-suppliers : Create a new qmsMaterielSupplier.
     *
     * @param qmsMaterielSupplier the qmsMaterielSupplier to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsMaterielSupplier, or with status 400 (Bad Request) if the qmsMaterielSupplier has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-materiel-suppliers")
    @Timed
    public ResponseEntity<QmsMaterielSupplier> createQmsMaterielSupplier(@Valid @RequestBody QmsMaterielSupplier qmsMaterielSupplier) throws URISyntaxException {
        log.debug("REST request to save QmsMaterielSupplier : {}", qmsMaterielSupplier);
        if (qmsMaterielSupplier.getId() != null) {
            throw new BadRequestAlertException("A new qmsMaterielSupplier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsMaterielSupplier result = qmsMaterielSupplierRepository.save(qmsMaterielSupplier);
        return ResponseEntity.created(new URI("/api/qms-materiel-suppliers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-materiel-suppliers : Updates an existing qmsMaterielSupplier.
     *
     * @param qmsMaterielSupplier the qmsMaterielSupplier to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsMaterielSupplier,
     * or with status 400 (Bad Request) if the qmsMaterielSupplier is not valid,
     * or with status 500 (Internal Server Error) if the qmsMaterielSupplier couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-materiel-suppliers")
    @Timed
    public ResponseEntity<QmsMaterielSupplier> updateQmsMaterielSupplier(@Valid @RequestBody QmsMaterielSupplier qmsMaterielSupplier) throws URISyntaxException {
        log.debug("REST request to update QmsMaterielSupplier : {}", qmsMaterielSupplier);
        if (qmsMaterielSupplier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Integer supplierId = qmsMaterielSupplier.getSupplierId();
        Integer materielId = qmsMaterielSupplier.getMaterielId();
        Long id = qmsMaterielSupplier.getId();
        Optional<QmsMaterielSupplier> check = qmsMaterielSupplierRepository.findByMaterielIdAndSupplierIdAndIdNot(materielId, supplierId, id);
        QmsMaterielSupplier result = qmsMaterielSupplierRepository.save(qmsMaterielSupplier);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsMaterielSupplier.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-materiel-suppliers : get all the qmsMaterielSuppliers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsMaterielSuppliers in body
     */
    @GetMapping("/qms-materiel-suppliers")
    @Timed
    public ResponseEntity<List<QmsMaterielSupplier>> getAllQmsMaterielSuppliers(Pageable pageable) {
        log.debug("REST request to get a page of QmsMaterielSuppliers");
        Page<QmsMaterielSupplier> page = qmsMaterielSupplierRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-materiel-suppliers");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-materiel-suppliers/:id : get the "id" qmsMaterielSupplier.
     *
     * @param id the id of the qmsMaterielSupplier to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsMaterielSupplier, or with status 404 (Not Found)
     */
    @GetMapping("/qms-materiel-suppliers/{id}")
    @Timed
    public ResponseEntity<QmsMaterielSupplier> getQmsMaterielSupplier(@PathVariable Long id) {
        log.debug("REST request to get QmsMaterielSupplier : {}", id);
        Optional<QmsMaterielSupplier> qmsMaterielSupplier = qmsMaterielSupplierRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsMaterielSupplier);
    }

    /**
     * DELETE  /qms-materiel-suppliers/:id : delete the "id" qmsMaterielSupplier.
     *
     * @param id the id of the qmsMaterielSupplier to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-materiel-suppliers/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsMaterielSupplier(@PathVariable Long id) {
        log.debug("REST request to delete QmsMaterielSupplier : {}", id);

        qmsMaterielSupplierRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
