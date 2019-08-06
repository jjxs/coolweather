package cn.com.cnc.fcc.web.rest;

import cn.com.cnc.fcc.service.util.DateUtil;
import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsUnit;
import cn.com.cnc.fcc.repository.QmsUnitRepository;
import cn.com.cnc.fcc.web.rest.errors.BadRequestAlertException;
import cn.com.cnc.fcc.web.rest.util.HeaderUtil;
import cn.com.cnc.fcc.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
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
 * REST controller for managing QmsUnit.
 */
@RestController
@RequestMapping("/api")
public class QmsUnitResource {

    private final Logger log = LoggerFactory.getLogger(QmsUnitResource.class);

    private static final String ENTITY_NAME = "qmsUnit";

    private final QmsUnitRepository qmsUnitRepository;
    @Resource
    private DateUtil dateUtil;

    public QmsUnitResource(QmsUnitRepository qmsUnitRepository) {
        this.qmsUnitRepository = qmsUnitRepository;
    }

    /**
     * POST  /qms-units : Create a new qmsUnit.
     *
     * @param qmsUnit the qmsUnit to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsUnit, or with status 400 (Bad Request) if the qmsUnit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-units")
    @Timed
    public ResponseEntity<QmsUnit> createQmsUnit(@Valid @RequestBody QmsUnit qmsUnit) throws URISyntaxException {
        log.debug("REST request to save QmsUnit : {}", qmsUnit);
        if (qmsUnit.getId() != null) {
            throw new BadRequestAlertException("A new qmsUnit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        //如果传过来的值为null，则应该改为""
        if(qmsUnit.getUnitName()==null){
            qmsUnit.setUnitName("");
        }
        if(qmsUnit.getCompPkid()==null){
            qmsUnit.setCompPkid("");
        }
        if(qmsUnit.getRemark()==null){
            qmsUnit.setRemark("");
        }
        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 取得用户信息
        UserDetails user = (UserDetails) authentication.getPrincipal();
        qmsUnit.setMakeUser(user.getUsername());
        qmsUnit.setModifyUser(user.getUsername());
        qmsUnit.setMakeTime(dateUtil.getDBNowDate());
        qmsUnit.setModifyTime(dateUtil.getDBNowDate());
        QmsUnit result = qmsUnitRepository.save(qmsUnit);
        return ResponseEntity.created(new URI("/api/qms-units/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-units : Updates an existing qmsUnit.
     *
     * @param qmsUnit the qmsUnit to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsUnit,
     * or with status 400 (Bad Request) if the qmsUnit is not valid,
     * or with status 500 (Internal Server Error) if the qmsUnit couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-units")
    @Timed
    public ResponseEntity<QmsUnit> updateQmsUnit(@Valid @RequestBody QmsUnit qmsUnit) throws URISyntaxException {
        log.debug("REST request to update QmsUnit : {}", qmsUnit);
        if (qmsUnit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 取得用户信息
        UserDetails user = (UserDetails) authentication.getPrincipal();
        qmsUnit.setModifyUser(user.getUsername());
        qmsUnit.setModifyTime(dateUtil.getDBNowDate());
        QmsUnit result = qmsUnitRepository.save(qmsUnit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsUnit.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-units : get all the qmsUnits.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsUnits in body
     */
    @GetMapping("/qms-units")
    @Timed
    public ResponseEntity<List<QmsUnit>> getAllQmsUnits(Pageable pageable) {
        log.debug("REST request to get a page of QmsUnits");
        Page<QmsUnit> page = qmsUnitRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-units");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-units/:id : get the "id" qmsUnit.
     *
     * @param id the id of the qmsUnit to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsUnit, or with status 404 (Not Found)
     */
    @GetMapping("/qms-units/{id}")
    @Timed
    public ResponseEntity<QmsUnit> getQmsUnit(@PathVariable Long id) {
        log.debug("REST request to get QmsUnit : {}", id);
        Optional<QmsUnit> qmsUnit = qmsUnitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsUnit);
    }

    /**
     * DELETE  /qms-units/:id : delete the "id" qmsUnit.
     *
     * @param id the id of the qmsUnit to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-units/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsUnit(@PathVariable Long id) {
        log.debug("REST request to delete QmsUnit : {}", id);

        qmsUnitRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
