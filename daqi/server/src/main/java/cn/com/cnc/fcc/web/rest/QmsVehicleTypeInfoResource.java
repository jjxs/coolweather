package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsVehicleTypeInfo;
import cn.com.cnc.fcc.repository.QmsVehicleTypeInfoRepository;
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
 * REST controller for managing QmsVehicleTypeInfo.
 */
@RestController
@RequestMapping("/api")
public class QmsVehicleTypeInfoResource {

    private final Logger log = LoggerFactory.getLogger(QmsVehicleTypeInfoResource.class);

    private static final String ENTITY_NAME = "qmsVehicleTypeInfo";

    private final QmsVehicleTypeInfoRepository qmsVehicleTypeInfoRepository;

    public QmsVehicleTypeInfoResource(QmsVehicleTypeInfoRepository qmsVehicleTypeInfoRepository) {
        this.qmsVehicleTypeInfoRepository = qmsVehicleTypeInfoRepository;
    }

    /**
     * POST  /qms-vehicle-type-infos : Create a new qmsVehicleTypeInfo.
     *
     * @param qmsVehicleTypeInfo the qmsVehicleTypeInfo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsVehicleTypeInfo, or with status 400 (Bad Request) if the qmsVehicleTypeInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-vehicle-type-infos")
    @Timed
    public ResponseEntity<QmsVehicleTypeInfo> createQmsVehicleTypeInfo(@Valid @RequestBody QmsVehicleTypeInfo qmsVehicleTypeInfo) throws URISyntaxException {
        log.debug("REST request to save QmsVehicleTypeInfo : {}", qmsVehicleTypeInfo);
        if (qmsVehicleTypeInfo.getId() != null) {
            throw new BadRequestAlertException("A new qmsVehicleTypeInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsVehicleTypeInfo result = qmsVehicleTypeInfoRepository.save(qmsVehicleTypeInfo);
        return ResponseEntity.created(new URI("/api/qms-vehicle-type-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-vehicle-type-infos : Updates an existing qmsVehicleTypeInfo.
     *
     * @param qmsVehicleTypeInfo the qmsVehicleTypeInfo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsVehicleTypeInfo,
     * or with status 400 (Bad Request) if the qmsVehicleTypeInfo is not valid,
     * or with status 500 (Internal Server Error) if the qmsVehicleTypeInfo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-vehicle-type-infos")
    @Timed
    public ResponseEntity<QmsVehicleTypeInfo> updateQmsVehicleTypeInfo(@Valid @RequestBody QmsVehicleTypeInfo qmsVehicleTypeInfo) throws URISyntaxException {
        log.debug("REST request to update QmsVehicleTypeInfo : {}", qmsVehicleTypeInfo);
        if (qmsVehicleTypeInfo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsVehicleTypeInfo result = qmsVehicleTypeInfoRepository.save(qmsVehicleTypeInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsVehicleTypeInfo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-vehicle-type-infos : get all the qmsVehicleTypeInfos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsVehicleTypeInfos in body
     */
    @GetMapping("/qms-vehicle-type-infos")
    @Timed
    public ResponseEntity<List<QmsVehicleTypeInfo>> getAllQmsVehicleTypeInfos(Pageable pageable) {
        log.debug("REST request to get a page of QmsVehicleTypeInfos");
        Page<QmsVehicleTypeInfo> page = qmsVehicleTypeInfoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-vehicle-type-infos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-vehicle-type-infos/:id : get the "id" qmsVehicleTypeInfo.
     *
     * @param id the id of the qmsVehicleTypeInfo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsVehicleTypeInfo, or with status 404 (Not Found)
     */
    @GetMapping("/qms-vehicle-type-infos/{id}")
    @Timed
    public ResponseEntity<QmsVehicleTypeInfo> getQmsVehicleTypeInfo(@PathVariable Long id) {
        log.debug("REST request to get QmsVehicleTypeInfo : {}", id);
        Optional<QmsVehicleTypeInfo> qmsVehicleTypeInfo = qmsVehicleTypeInfoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsVehicleTypeInfo);
    }

    /**
     * DELETE  /qms-vehicle-type-infos/:id : delete the "id" qmsVehicleTypeInfo.
     *
     * @param id the id of the qmsVehicleTypeInfo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-vehicle-type-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsVehicleTypeInfo(@PathVariable Long id) {
        log.debug("REST request to delete QmsVehicleTypeInfo : {}", id);

        qmsVehicleTypeInfoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
