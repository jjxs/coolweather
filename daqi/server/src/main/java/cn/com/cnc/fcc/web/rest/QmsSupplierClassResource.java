package cn.com.cnc.fcc.web.rest;

import cn.com.cnc.fcc.service.util.DateUtil;
import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsSupplierClass;
import cn.com.cnc.fcc.repository.QmsSupplierClassRepository;
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
 * REST controller for managing QmsSupplierClass.
 */
@RestController
@RequestMapping("/api")
public class QmsSupplierClassResource {

    private final Logger log = LoggerFactory.getLogger(QmsSupplierClassResource.class);

    private static final String ENTITY_NAME = "qmsSupplierClass";

    private final QmsSupplierClassRepository qmsSupplierClassRepository;

    @Resource
    private DateUtil dateUtil;

    public QmsSupplierClassResource(QmsSupplierClassRepository qmsSupplierClassRepository) {
        this.qmsSupplierClassRepository = qmsSupplierClassRepository;
    }

    /**
     * POST  /qms-supplier-classes : Create a new qmsSupplierClass.
     *
     * @param qmsSupplierClass the qmsSupplierClass to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsSupplierClass, or with status 400 (Bad Request) if the qmsSupplierClass has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-supplier-classes")
    @Timed
    public ResponseEntity<QmsSupplierClass> createQmsSupplierClass(@Valid @RequestBody QmsSupplierClass qmsSupplierClass) throws URISyntaxException {
        log.debug("REST request to save QmsSupplierClass : {}", qmsSupplierClass);
        if (qmsSupplierClass.getId() != null) {
            throw new BadRequestAlertException("A new qmsSupplierClass cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if(qmsSupplierClass.getSuppkierClassName()==null){
            qmsSupplierClass.setSuppkierClassName("");
        }
        if(qmsSupplierClass.getRemark()==null){
            qmsSupplierClass.setRemark("");
        }
        if(qmsSupplierClass.getCompPkid()==null){
            qmsSupplierClass.setCompPkid("");
        }
        if(qmsSupplierClass.getReserveFirst()==null){
            qmsSupplierClass.setReserveFirst("");
        }
        if(qmsSupplierClass.getReserveSecond()==null){
            qmsSupplierClass.setReserveSecond("");
        }
        if(qmsSupplierClass.getReserveThird()==null){
            qmsSupplierClass.setReserveThird("");
        }
        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 取得用户信息
        UserDetails user = (UserDetails) authentication.getPrincipal();
        qmsSupplierClass.setMakeUser(user.getUsername());
        qmsSupplierClass.setModifyUser(user.getUsername());
        qmsSupplierClass.setMakeTime(dateUtil.getDBNowDate());
        qmsSupplierClass.setModifyTime(dateUtil.getDBNowDate());
        QmsSupplierClass result = qmsSupplierClassRepository.save(qmsSupplierClass);
        return ResponseEntity.created(new URI("/api/qms-supplier-classes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-supplier-classes : Updates an existing qmsSupplierClass.
     *
     * @param qmsSupplierClass the qmsSupplierClass to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsSupplierClass,
     * or with status 400 (Bad Request) if the qmsSupplierClass is not valid,
     * or with status 500 (Internal Server Error) if the qmsSupplierClass couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-supplier-classes")
    @Timed
    public ResponseEntity<QmsSupplierClass> updateQmsSupplierClass(@Valid @RequestBody QmsSupplierClass qmsSupplierClass) throws URISyntaxException {
        log.debug("REST request to update QmsSupplierClass : {}", qmsSupplierClass);
        if (qmsSupplierClass.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 取得用户信息
        UserDetails user = (UserDetails) authentication.getPrincipal();
        qmsSupplierClass.setModifyUser(user.getUsername());
        qmsSupplierClass.setModifyTime(dateUtil.getDBNowDate());
        QmsSupplierClass result = qmsSupplierClassRepository.save(qmsSupplierClass);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsSupplierClass.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-supplier-classes : get all the qmsSupplierClasses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsSupplierClasses in body
     */
    @GetMapping("/qms-supplier-classes")
    @Timed
    public ResponseEntity<List<QmsSupplierClass>> getAllQmsSupplierClasses(Pageable pageable) {
        log.debug("REST request to get a page of QmsSupplierClasses");
        Page<QmsSupplierClass> page = qmsSupplierClassRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-supplier-classes");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-supplier-classes/:id : get the "id" qmsSupplierClass.
     *
     * @param id the id of the qmsSupplierClass to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsSupplierClass, or with status 404 (Not Found)
     */
    @GetMapping("/qms-supplier-classes/{id}")
    @Timed
    public ResponseEntity<QmsSupplierClass> getQmsSupplierClass(@PathVariable Long id) {
        log.debug("REST request to get QmsSupplierClass : {}", id);
        Optional<QmsSupplierClass> qmsSupplierClass = qmsSupplierClassRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsSupplierClass);
    }

    /**
     * DELETE  /qms-supplier-classes/:id : delete the "id" qmsSupplierClass.
     *
     * @param id the id of the qmsSupplierClass to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-supplier-classes/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsSupplierClass(@PathVariable Long id) {
        log.debug("REST request to delete QmsSupplierClass : {}", id);

        qmsSupplierClassRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
