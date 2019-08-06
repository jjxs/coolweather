package cn.com.cnc.fcc.web.rest;

import cn.com.cnc.fcc.service.util.DateUtil;
import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsProductionInspection;
import cn.com.cnc.fcc.repository.QmsProductionInspectionRepository;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import javax.validation.constraints.Null;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing QmsProductionInspection.
 */
@RestController
@RequestMapping("/api")
public class QmsProductionInspectionResource {

    private final Logger log = LoggerFactory.getLogger(QmsProductionInspectionResource.class);

    private static final String ENTITY_NAME = "qmsProductionInspection";

    private final QmsProductionInspectionRepository qmsProductionInspectionRepository;

    @Resource
    private DateUtil dateUtil;

    public QmsProductionInspectionResource(QmsProductionInspectionRepository qmsProductionInspectionRepository) {
        this.qmsProductionInspectionRepository = qmsProductionInspectionRepository;
    }

    /**
     * POST  /qms-production-inspections : Create a new qmsProductionInspection.
     *
     * @param qmsProductionInspection the qmsProductionInspection to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsProductionInspection, or with status 400 (Bad Request) if the qmsProductionInspection has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-production-inspections")
    @Timed
    public ResponseEntity<QmsProductionInspection> createQmsProductionInspection(@Valid @RequestBody QmsProductionInspection qmsProductionInspection) throws URISyntaxException {
        log.debug("REST request to save QmsProductionInspection : {}", qmsProductionInspection);
        if (qmsProductionInspection.getId() != null) {
            throw new BadRequestAlertException("A new qmsProductionInspection cannot already have an ID", ENTITY_NAME, "idexists");
        }

        // 赋初始
        if (qmsProductionInspection.getRemark() == null) {
            qmsProductionInspection.setRemark("");
        }
        if (qmsProductionInspection.getFurnace() == null) {
            qmsProductionInspection.setFurnace("");
        }

        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 取得用户信息

        UserDetails user = (UserDetails) authentication.getPrincipal();
        qmsProductionInspection.setIsOk("0");
        qmsProductionInspection.setMakeUser(user.getUsername());
        qmsProductionInspection.setModifyUser(user.getUsername());
        qmsProductionInspection.setMakeTime(dateUtil.getDBNowDate());
        qmsProductionInspection.setModifyTime(dateUtil.getDBNowDate());
        QmsProductionInspection result = qmsProductionInspectionRepository.save(qmsProductionInspection);
        return ResponseEntity.created(new URI("/api/qms-production-inspections/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-production-inspections : Updates an existing qmsProductionInspection.
     *
     * @param qmsProductionInspection the qmsProductionInspection to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsProductionInspection,
     * or with status 400 (Bad Request) if the qmsProductionInspection is not valid,
     * or with status 500 (Internal Server Error) if the qmsProductionInspection couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-production-inspections")
    @Timed
    public ResponseEntity<QmsProductionInspection> updateQmsProductionInspection(@Valid @RequestBody QmsProductionInspection qmsProductionInspection) throws URISyntaxException {
        log.debug("REST request to update QmsProductionInspection : {}", qmsProductionInspection);
        if (qmsProductionInspection.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 取得用户信息
        UserDetails user = (UserDetails) authentication.getPrincipal();

        QmsProductionInspection mypi = qmsProductionInspectionRepository.findById(qmsProductionInspection.getId()).get();
        mypi.setSerialNumber(qmsProductionInspection.getSerialNumber());
        mypi.setBomTechnologyId(qmsProductionInspection.getBomTechnologyId());
        mypi.setMaterielId(qmsProductionInspection.getMaterielId());
        mypi.setFurnace(qmsProductionInspection.getFurnace());
        mypi.setRemark(qmsProductionInspection.getRemark());
        mypi.setModifyUser(user.getUsername());
        mypi.setModifyTime(dateUtil.getDBNowDate());

        QmsProductionInspection result = qmsProductionInspectionRepository.save(mypi);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsProductionInspection.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-production-inspections : get all the qmsProductionInspections.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsProductionInspections in body
     */
    @GetMapping("/qms-production-inspections")
    @Timed
    public ResponseEntity<List<QmsProductionInspection>> getAllQmsProductionInspections(Pageable pageable) {
        log.debug("REST request to get a page of QmsProductionInspections");
        Page<QmsProductionInspection> page = qmsProductionInspectionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-production-inspections");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-production-inspections/:id : get the "id" qmsProductionInspection.
     *
     * @param id the id of the qmsProductionInspection to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsProductionInspection, or with status 404 (Not Found)
     */
    @GetMapping("/qms-production-inspections/{id}")
    @Timed
    public ResponseEntity<QmsProductionInspection> getQmsProductionInspection(@PathVariable Long id) {
        log.debug("REST request to get QmsProductionInspection : {}", id);
        Optional<QmsProductionInspection> qmsProductionInspection = qmsProductionInspectionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsProductionInspection);
    }

    /**
     * DELETE  /qms-production-inspections/:id : delete the "id" qmsProductionInspection.
     *
     * @param id the id of the qmsProductionInspection to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-production-inspections/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsProductionInspection(@PathVariable Long id) {
        log.debug("REST request to delete QmsProductionInspection : {}", id);

        qmsProductionInspectionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
