package cn.com.cnc.fcc.web.rest;

import cn.com.cnc.fcc.service.util.DateUtil;
import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsProductionInspectionValue;
import cn.com.cnc.fcc.repository.QmsProductionInspectionValueRepository;
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
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing QmsProductionInspectionValue.
 */
@RestController
@RequestMapping("/api")
public class QmsProductionInspectionValueResource {

    private final Logger log = LoggerFactory.getLogger(QmsProductionInspectionValueResource.class);

    private static final String ENTITY_NAME = "qmsProductionInspectionValue";

    private final QmsProductionInspectionValueRepository qmsProductionInspectionValueRepository;

    @Resource
    private DateUtil dateUtil;

    public QmsProductionInspectionValueResource(QmsProductionInspectionValueRepository qmsProductionInspectionValueRepository) {
        this.qmsProductionInspectionValueRepository = qmsProductionInspectionValueRepository;
    }

    /**
     * POST  /qms-production-inspection-values : Create a new qmsProductionInspectionValue.
     *
     * @param qmsProductionInspectionValue the qmsProductionInspectionValue to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsProductionInspectionValue, or with status 400 (Bad Request) if the qmsProductionInspectionValue has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-production-inspection-values")
    @Timed
    public ResponseEntity<QmsProductionInspectionValue> createQmsProductionInspectionValue(@Valid @RequestBody QmsProductionInspectionValue qmsProductionInspectionValue) throws URISyntaxException {
        log.debug("REST request to save QmsProductionInspectionValue : {}", qmsProductionInspectionValue);
        if (qmsProductionInspectionValue.getId() != null) {
            throw new BadRequestAlertException("A new qmsProductionInspectionValue cannot already have an ID", ENTITY_NAME, "idexists");
        }

        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 取得用户信息
        UserDetails user = (UserDetails) authentication.getPrincipal();

        qmsProductionInspectionValue.setMakeUser(user.getUsername());
        qmsProductionInspectionValue.setModifyUser(user.getUsername());
        qmsProductionInspectionValue.setMakeTime(dateUtil.getDBNowDate());
        qmsProductionInspectionValue.setModifyTime(dateUtil.getDBNowDate());

        QmsProductionInspectionValue result = qmsProductionInspectionValueRepository.save(qmsProductionInspectionValue);
        return ResponseEntity.created(new URI("/api/qms-production-inspection-values/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-production-inspection-values : Updates an existing qmsProductionInspectionValue.
     *
     * @param qmsProductionInspectionValue the qmsProductionInspectionValue to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsProductionInspectionValue,
     * or with status 400 (Bad Request) if the qmsProductionInspectionValue is not valid,
     * or with status 500 (Internal Server Error) if the qmsProductionInspectionValue couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-production-inspection-values")
    @Timed
    public ResponseEntity<QmsProductionInspectionValue> updateQmsProductionInspectionValue(@Valid @RequestBody QmsProductionInspectionValue qmsProductionInspectionValue) throws URISyntaxException {
        log.debug("REST request to update QmsProductionInspectionValue : {}", qmsProductionInspectionValue);
        if (qmsProductionInspectionValue.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsProductionInspectionValue result = qmsProductionInspectionValueRepository.save(qmsProductionInspectionValue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsProductionInspectionValue.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-production-inspection-values : get all the qmsProductionInspectionValues.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsProductionInspectionValues in body
     */
    @GetMapping("/qms-production-inspection-values")
    @Timed
    public ResponseEntity<List<QmsProductionInspectionValue>> getAllQmsProductionInspectionValues(Pageable pageable) {
        log.debug("REST request to get a page of QmsProductionInspectionValues");
        Page<QmsProductionInspectionValue> page = qmsProductionInspectionValueRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-production-inspection-values");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-production-inspection-values/:id : get the "id" qmsProductionInspectionValue.
     *
     * @param id the id of the qmsProductionInspectionValue to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsProductionInspectionValue, or with status 404 (Not Found)
     */
    @GetMapping("/qms-production-inspection-values/{id}")
    @Timed
    public ResponseEntity<QmsProductionInspectionValue> getQmsProductionInspectionValue(@PathVariable Long id) {
        log.debug("REST request to get QmsProductionInspectionValue : {}", id);
        Optional<QmsProductionInspectionValue> qmsProductionInspectionValue = qmsProductionInspectionValueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsProductionInspectionValue);
    }

    /**
     * DELETE  /qms-production-inspection-values/:id : delete the "id" qmsProductionInspectionValue.
     *
     * @param id the id of the qmsProductionInspectionValue to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-production-inspection-values/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsProductionInspectionValue(@PathVariable Long id) {
        log.debug("REST request to delete QmsProductionInspectionValue : {}", id);

        qmsProductionInspectionValueRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
