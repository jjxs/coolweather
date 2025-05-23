package cn.com.cnc.fcc.web.rest;

import cn.com.cnc.fcc.service.util.DateUtil;
import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsVehicleTypeClass;
import cn.com.cnc.fcc.repository.QmsVehicleTypeClassRepository;
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
 * REST controller for managing QmsVehicleTypeClass.
 */
@RestController
@RequestMapping("/api")
public class QmsVehicleTypeClassResource {

    private final Logger log = LoggerFactory.getLogger(QmsVehicleTypeClassResource.class);

    private static final String ENTITY_NAME = "qmsVehicleTypeClass";

    private final QmsVehicleTypeClassRepository qmsVehicleTypeClassRepository;

    public QmsVehicleTypeClassResource(QmsVehicleTypeClassRepository qmsVehicleTypeClassRepository) {
        this.qmsVehicleTypeClassRepository = qmsVehicleTypeClassRepository;
    }
    @Resource
    private DateUtil dateUtil;
    /**
     * POST  /qms-vehicle-type-classes : Create a new qmsVehicleTypeClass.
     *
     * @param qmsVehicleTypeClass the qmsVehicleTypeClass to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsVehicleTypeClass, or with status 400 (Bad Request) if the qmsVehicleTypeClass has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-vehicle-type-classes")
    @Timed
    public ResponseEntity<QmsVehicleTypeClass> createQmsVehicleTypeClass(@Valid @RequestBody QmsVehicleTypeClass qmsVehicleTypeClass) throws URISyntaxException {
        log.debug("REST request to save QmsVehicleTypeClass : {}", qmsVehicleTypeClass);
        if (qmsVehicleTypeClass.getId() != null) {
            throw new BadRequestAlertException("A new qmsVehicleTypeClass cannot already have an ID", ENTITY_NAME, "idexists");
        }

        //如果传过来的值为null，则应该改为""
        if(qmsVehicleTypeClass.getVehicleClass()==null){
            qmsVehicleTypeClass.setVehicleClass("");
        }
        if(qmsVehicleTypeClass.getVehicleClassName()==null){
            qmsVehicleTypeClass.setVehicleClassName("");
        }
        if(qmsVehicleTypeClass.getRemark()==null){
            qmsVehicleTypeClass.setRemark("");
        }
        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 取得用户信息
        UserDetails user = (UserDetails) authentication.getPrincipal();
        qmsVehicleTypeClass.setMakeUser(user.getUsername());
        qmsVehicleTypeClass.setModifyUser(user.getUsername());
        qmsVehicleTypeClass.setMakeTime(dateUtil.getDBNowDate());
        qmsVehicleTypeClass.setModifyTime(dateUtil.getDBNowDate());

        QmsVehicleTypeClass result = qmsVehicleTypeClassRepository.save(qmsVehicleTypeClass);
        return ResponseEntity.created(new URI("/api/qms-vehicle-type-classes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-vehicle-type-classes : Updates an existing qmsVehicleTypeClass.
     *
     * @param qmsVehicleTypeClass the qmsVehicleTypeClass to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsVehicleTypeClass,
     * or with status 400 (Bad Request) if the qmsVehicleTypeClass is not valid,
     * or with status 500 (Internal Server Error) if the qmsVehicleTypeClass couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-vehicle-type-classes")
    @Timed
    public ResponseEntity<QmsVehicleTypeClass> updateQmsVehicleTypeClass(@Valid @RequestBody QmsVehicleTypeClass qmsVehicleTypeClass) throws URISyntaxException {
        log.debug("REST request to update QmsVehicleTypeClass : {}", qmsVehicleTypeClass);
        if (qmsVehicleTypeClass.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 取得用户信息
        UserDetails user = (UserDetails) authentication.getPrincipal();
        qmsVehicleTypeClass.setModifyUser(user.getUsername());
        qmsVehicleTypeClass.setModifyTime(dateUtil.getDBNowDate());
        QmsVehicleTypeClass result = qmsVehicleTypeClassRepository.save(qmsVehicleTypeClass);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsVehicleTypeClass.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-vehicle-type-classes : get all the qmsVehicleTypeClasses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsVehicleTypeClasses in body
     */
    @GetMapping("/qms-vehicle-type-classes")
    @Timed
    public ResponseEntity<List<QmsVehicleTypeClass>> getAllQmsVehicleTypeClasses(Pageable pageable) {
        log.debug("REST request to get a page of QmsVehicleTypeClasses");
        Page<QmsVehicleTypeClass> page = qmsVehicleTypeClassRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-vehicle-type-classes");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-vehicle-type-classes/:id : get the "id" qmsVehicleTypeClass.
     *
     * @param id the id of the qmsVehicleTypeClass to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsVehicleTypeClass, or with status 404 (Not Found)
     */
    @GetMapping("/qms-vehicle-type-classes/{id}")
    @Timed
    public ResponseEntity<QmsVehicleTypeClass> getQmsVehicleTypeClass(@PathVariable Long id) {
        log.debug("REST request to get QmsVehicleTypeClass : {}", id);
        Optional<QmsVehicleTypeClass> qmsVehicleTypeClass = qmsVehicleTypeClassRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsVehicleTypeClass);
    }

    /**
     * DELETE  /qms-vehicle-type-classes/:id : delete the "id" qmsVehicleTypeClass.
     *
     * @param id the id of the qmsVehicleTypeClass to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-vehicle-type-classes/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsVehicleTypeClass(@PathVariable Long id) {
        log.debug("REST request to delete QmsVehicleTypeClass : {}", id);

        qmsVehicleTypeClassRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
