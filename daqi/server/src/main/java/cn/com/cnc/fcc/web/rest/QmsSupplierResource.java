package cn.com.cnc.fcc.web.rest;

import cn.com.cnc.fcc.service.util.DateUtil;
import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsSupplier;
import cn.com.cnc.fcc.repository.QmsSupplierRepository;
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
 * REST controller for managing QmsSupplier.
 */
@RestController
@RequestMapping("/api")
public class QmsSupplierResource {

    private final Logger log = LoggerFactory.getLogger(QmsSupplierResource.class);

    private static final String ENTITY_NAME = "qmsSupplier";

    private final QmsSupplierRepository qmsSupplierRepository;
    @Resource
    private DateUtil dateUtil;

    public QmsSupplierResource(QmsSupplierRepository qmsSupplierRepository) {
        this.qmsSupplierRepository = qmsSupplierRepository;
    }

    /**
     * POST  /qms-suppliers : Create a new qmsSupplier.
     *
     * @param qmsSupplier the qmsSupplier to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsSupplier, or with status 400 (Bad Request) if the qmsSupplier has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-suppliers")
    @Timed
    public ResponseEntity<QmsSupplier> createQmsSupplier(@Valid @RequestBody QmsSupplier qmsSupplier) throws URISyntaxException {
        log.debug("REST request to save QmsSupplier : {}", qmsSupplier);
        if (qmsSupplier.getId() != null) {
            throw new BadRequestAlertException("A new qmsSupplier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        //如果传过来的值为null，则应该改为""

        if(qmsSupplier.getSupplierName()==null){
            qmsSupplier.setSupplierName("");
        }
        if(qmsSupplier.getAddress()==null){
            qmsSupplier.setAddress("");
        }
        if(qmsSupplier.getTelNum1()==null){
            qmsSupplier.setTelNum1("");
        }
        if(qmsSupplier.getTelNum2()==null){
            qmsSupplier.setTelNum2("");
        }
        if(qmsSupplier.getFaxNum()==null){
            qmsSupplier.setFaxNum("");
        }
        if(qmsSupplier.getUrlAddress()==null){
            qmsSupplier.setUrlAddress("");
        }
        if(qmsSupplier.getMailAddress()==null){
            qmsSupplier.setMailAddress("");
        }
        if(qmsSupplier.getLinkMan()==null){
            qmsSupplier.setLinkMan("");
        }
        if(qmsSupplier.getDepartment()==null){
            qmsSupplier.setDepartment("");
        }
        if(qmsSupplier.getAssRecord()==null){
            qmsSupplier.setAssRecord("");
        }
        if(qmsSupplier.getCompPkid()==null){
            qmsSupplier.setCompPkid("");
        }
        if(qmsSupplier.getRemark()==null){
            qmsSupplier.setRemark("");
        }
        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 取得用户信息
        UserDetails user = (UserDetails) authentication.getPrincipal();
        qmsSupplier.setMakeUser(user.getUsername());
        qmsSupplier.setModifyUser(user.getUsername());
        qmsSupplier.setMakeTime(dateUtil.getDBNowDate());
        qmsSupplier.setModifyTime(dateUtil.getDBNowDate());
        QmsSupplier result = qmsSupplierRepository.save(qmsSupplier);
        return ResponseEntity.created(new URI("/api/qms-suppliers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-suppliers : Updates an existing qmsSupplier.
     *
     * @param qmsSupplier the qmsSupplier to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsSupplier,
     * or with status 400 (Bad Request) if the qmsSupplier is not valid,
     * or with status 500 (Internal Server Error) if the qmsSupplier couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-suppliers")
    @Timed
    public ResponseEntity<QmsSupplier> updateQmsSupplier(@Valid @RequestBody QmsSupplier qmsSupplier) throws URISyntaxException {
        log.debug("REST request to update QmsSupplier : {}", qmsSupplier);
        if (qmsSupplier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 取得用户信息
        UserDetails user = (UserDetails) authentication.getPrincipal();
        qmsSupplier.setModifyUser(user.getUsername());
        qmsSupplier.setModifyTime(dateUtil.getDBNowDate());
        QmsSupplier result = qmsSupplierRepository.save(qmsSupplier);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsSupplier.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-suppliers : get all the qmsSuppliers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsSuppliers in body
     */
    @GetMapping("/qms-suppliers")
    @Timed
    public ResponseEntity<List<QmsSupplier>> getAllQmsSuppliers(Pageable pageable) {
        log.debug("REST request to get a page of QmsSuppliers");
        Page<QmsSupplier> page = qmsSupplierRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-suppliers");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-suppliers/:id : get the "id" qmsSupplier.
     *
     * @param id the id of the qmsSupplier to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsSupplier, or with status 404 (Not Found)
     */
    @GetMapping("/qms-suppliers/{id}")
    @Timed
    public ResponseEntity<QmsSupplier> getQmsSupplier(@PathVariable Long id) {
        log.debug("REST request to get QmsSupplier : {}", id);
        Optional<QmsSupplier> qmsSupplier = qmsSupplierRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsSupplier);
    }

    /**
     * DELETE  /qms-suppliers/:id : delete the "id" qmsSupplier.
     *
     * @param id the id of the qmsSupplier to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-suppliers/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsSupplier(@PathVariable Long id) {
        log.debug("REST request to delete QmsSupplier : {}", id);

        qmsSupplierRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
