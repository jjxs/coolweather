package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsInspectionInfo;
import cn.com.cnc.fcc.repository.QmsInspectionInfoRepository;
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
 * REST controller for managing QmsInspectionInfo.
 */
@RestController
@RequestMapping("/api")
public class QmsInspectionInfoResource {

    private final Logger log = LoggerFactory.getLogger(QmsInspectionInfoResource.class);

    private static final String ENTITY_NAME = "qmsInspectionInfo";

    private final QmsInspectionInfoRepository qmsInspectionInfoRepository;

    public QmsInspectionInfoResource(QmsInspectionInfoRepository qmsInspectionInfoRepository) {
        this.qmsInspectionInfoRepository = qmsInspectionInfoRepository;
    }

    /**
     * POST  /qms-inspection-infos : Create a new qmsInspectionInfo.
     *
     * @param qmsInspectionInfo the qmsInspectionInfo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsInspectionInfo, or with status 400 (Bad Request) if the qmsInspectionInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-inspection-infos")
    @Timed
    public ResponseEntity<QmsInspectionInfo> createQmsInspectionInfo(@Valid @RequestBody QmsInspectionInfo qmsInspectionInfo) throws URISyntaxException {
        log.debug("REST request to save QmsInspectionInfo : {}", qmsInspectionInfo);
        if (qmsInspectionInfo.getId() != null) {
            throw new BadRequestAlertException("A new qmsInspectionInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsInspectionInfo result = qmsInspectionInfoRepository.save(qmsInspectionInfo);
        return ResponseEntity.created(new URI("/api/qms-inspection-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-inspection-infos : Updates an existing qmsInspectionInfo.
     *
     * @param qmsInspectionInfo the qmsInspectionInfo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsInspectionInfo,
     * or with status 400 (Bad Request) if the qmsInspectionInfo is not valid,
     * or with status 500 (Internal Server Error) if the qmsInspectionInfo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-inspection-infos")
    @Timed
    public ResponseEntity<QmsInspectionInfo> updateQmsInspectionInfo(@Valid @RequestBody QmsInspectionInfo qmsInspectionInfo) throws URISyntaxException {
        log.debug("REST request to update QmsInspectionInfo : {}", qmsInspectionInfo);
        if (qmsInspectionInfo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsInspectionInfo result = qmsInspectionInfoRepository.save(qmsInspectionInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsInspectionInfo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-inspection-infos : get all the qmsInspectionInfos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsInspectionInfos in body
     */
    @GetMapping("/qms-inspection-infos")
    @Timed
    public ResponseEntity<List<QmsInspectionInfo>> getAllQmsInspectionInfos(Pageable pageable) {
        log.debug("REST request to get a page of QmsInspectionInfos");
        Page<QmsInspectionInfo> page = qmsInspectionInfoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-inspection-infos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-inspection-infos/:id : get the "id" qmsInspectionInfo.
     *
     * @param id the id of the qmsInspectionInfo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsInspectionInfo, or with status 404 (Not Found)
     */
    @GetMapping("/qms-inspection-infos/{id}")
    @Timed
    public ResponseEntity<QmsInspectionInfo> getQmsInspectionInfo(@PathVariable Long id) {
        log.debug("REST request to get QmsInspectionInfo : {}", id);
        Optional<QmsInspectionInfo> qmsInspectionInfo = qmsInspectionInfoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsInspectionInfo);
    }

    /**
     * DELETE  /qms-inspection-infos/:id : delete the "id" qmsInspectionInfo.
     *
     * @param id the id of the qmsInspectionInfo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-inspection-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsInspectionInfo(@PathVariable Long id) {
        log.debug("REST request to delete QmsInspectionInfo : {}", id);

        qmsInspectionInfoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
