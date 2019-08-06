package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsOrganizationInfo;
import cn.com.cnc.fcc.repository.QmsOrganizationInfoRepository;
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
 * REST controller for managing QmsOrganizationInfo.
 */
@RestController
@RequestMapping("/api")
public class QmsOrganizationInfoResource {

    private final Logger log = LoggerFactory.getLogger(QmsOrganizationInfoResource.class);

    private static final String ENTITY_NAME = "qmsOrganizationInfo";

    private final QmsOrganizationInfoRepository qmsOrganizationInfoRepository;

    public QmsOrganizationInfoResource(QmsOrganizationInfoRepository qmsOrganizationInfoRepository) {
        this.qmsOrganizationInfoRepository = qmsOrganizationInfoRepository;
    }

    /**
     * POST  /qms-organization-infos : Create a new qmsOrganizationInfo.
     *
     * @param qmsOrganizationInfo the qmsOrganizationInfo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsOrganizationInfo, or with status 400 (Bad Request) if the qmsOrganizationInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-organization-infos")
    @Timed
    public ResponseEntity<QmsOrganizationInfo> createQmsOrganizationInfo(@Valid @RequestBody QmsOrganizationInfo qmsOrganizationInfo) throws URISyntaxException {
        log.debug("REST request to save QmsOrganizationInfo : {}", qmsOrganizationInfo);
        if (qmsOrganizationInfo.getId() != null) {
            throw new BadRequestAlertException("A new qmsOrganizationInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsOrganizationInfo result = qmsOrganizationInfoRepository.save(qmsOrganizationInfo);
        return ResponseEntity.created(new URI("/api/qms-organization-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-organization-infos : Updates an existing qmsOrganizationInfo.
     *
     * @param qmsOrganizationInfo the qmsOrganizationInfo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsOrganizationInfo,
     * or with status 400 (Bad Request) if the qmsOrganizationInfo is not valid,
     * or with status 500 (Internal Server Error) if the qmsOrganizationInfo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-organization-infos")
    @Timed
    public ResponseEntity<QmsOrganizationInfo> updateQmsOrganizationInfo(@Valid @RequestBody QmsOrganizationInfo qmsOrganizationInfo) throws URISyntaxException {
        log.debug("REST request to update QmsOrganizationInfo : {}", qmsOrganizationInfo);
        if (qmsOrganizationInfo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsOrganizationInfo result = qmsOrganizationInfoRepository.save(qmsOrganizationInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsOrganizationInfo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-organization-infos : get all the qmsOrganizationInfos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsOrganizationInfos in body
     */
    @GetMapping("/qms-organization-infos")
    @Timed
    public ResponseEntity<List<QmsOrganizationInfo>> getAllQmsOrganizationInfos(Pageable pageable) {
        log.debug("REST request to get a page of QmsOrganizationInfos");
        Page<QmsOrganizationInfo> page = qmsOrganizationInfoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-organization-infos");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-organization-infos/:id : get the "id" qmsOrganizationInfo.
     *
     * @param id the id of the qmsOrganizationInfo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsOrganizationInfo, or with status 404 (Not Found)
     */
    @GetMapping("/qms-organization-infos/{id}")
    @Timed
    public ResponseEntity<QmsOrganizationInfo> getQmsOrganizationInfo(@PathVariable Long id) {
        log.debug("REST request to get QmsOrganizationInfo : {}", id);
        Optional<QmsOrganizationInfo> qmsOrganizationInfo = qmsOrganizationInfoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsOrganizationInfo);
    }

    /**
     * DELETE  /qms-organization-infos/:id : delete the "id" qmsOrganizationInfo.
     *
     * @param id the id of the qmsOrganizationInfo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-organization-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsOrganizationInfo(@PathVariable Long id) {
        log.debug("REST request to delete QmsOrganizationInfo : {}", id);

        qmsOrganizationInfoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
