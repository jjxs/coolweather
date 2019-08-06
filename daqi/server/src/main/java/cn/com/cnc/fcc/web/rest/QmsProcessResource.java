package cn.com.cnc.fcc.web.rest;

import cn.com.cnc.fcc.service.util.DateUtil;
import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsProcess;
import cn.com.cnc.fcc.repository.QmsProcessRepository;
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
 * REST controller for managing QmsProcess.
 */
@RestController
@RequestMapping("/api")
public class QmsProcessResource {

    private final Logger log = LoggerFactory.getLogger(QmsProcessResource.class);

    private static final String ENTITY_NAME = "qmsProcess";

    private final QmsProcessRepository qmsProcessRepository;
    @Resource
    private DateUtil dateUtil;
    public QmsProcessResource(QmsProcessRepository qmsProcessRepository) {
        this.qmsProcessRepository = qmsProcessRepository;
    }

    /**
     * POST  /qms-processes : Create a new qmsProcess.
     *
     * @param qmsProcess the qmsProcess to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsProcess, or with status 400 (Bad Request) if the qmsProcess has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-processes")
    @Timed
    public ResponseEntity<QmsProcess> createQmsProcess(@Valid @RequestBody QmsProcess qmsProcess) throws URISyntaxException {
        log.debug("REST request to save QmsProcess : {}", qmsProcess);
        if (qmsProcess.getId() != null) {
            throw new BadRequestAlertException("A new qmsProcess cannot already have an ID", ENTITY_NAME, "idexists");
        }
        //如果传过来的值为null，则应该改为""
        if(qmsProcess.getProcessName()==null){
            qmsProcess.setProcessName("");
        }
        if(qmsProcess.getCompPkid()==null){
            qmsProcess.setCompPkid("");
        }
        if(qmsProcess.getRemark()==null){
            qmsProcess.setRemark("");
        }
        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 取得用户信息
        UserDetails user = (UserDetails) authentication.getPrincipal();
        qmsProcess.setMakeUser(user.getUsername());
        qmsProcess.setModifyUser(user.getUsername());
        qmsProcess.setMakeTime(dateUtil.getDBNowDate());
        qmsProcess.setModifyTime(dateUtil.getDBNowDate());
        QmsProcess result = qmsProcessRepository.save(qmsProcess);
        return ResponseEntity.created(new URI("/api/qms-processes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-processes : Updates an existing qmsProcess.
     *
     * @param qmsProcess the qmsProcess to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsProcess,
     * or with status 400 (Bad Request) if the qmsProcess is not valid,
     * or with status 500 (Internal Server Error) if the qmsProcess couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-processes")
    @Timed
    public ResponseEntity<QmsProcess> updateQmsProcess(@Valid @RequestBody QmsProcess qmsProcess) throws URISyntaxException {
        log.debug("REST request to update QmsProcess : {}", qmsProcess);
        if (qmsProcess.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 取得用户信息
        UserDetails user = (UserDetails) authentication.getPrincipal();
        qmsProcess.setModifyUser(user.getUsername());
        qmsProcess.setModifyTime(dateUtil.getDBNowDate());
        QmsProcess result = qmsProcessRepository.save(qmsProcess);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsProcess.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-processes : get all the qmsProcesses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsProcesses in body
     */
    @GetMapping("/qms-processes")
    @Timed
    public ResponseEntity<List<QmsProcess>> getAllQmsProcesses(Pageable pageable) {
        log.debug("REST request to get a page of QmsProcesses");
        Page<QmsProcess> page = qmsProcessRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-processes");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-processes/:id : get the "id" qmsProcess.
     *
     * @param id the id of the qmsProcess to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsProcess, or with status 404 (Not Found)
     */
    @GetMapping("/qms-processes/{id}")
    @Timed
    public ResponseEntity<QmsProcess> getQmsProcess(@PathVariable Long id) {
        log.debug("REST request to get QmsProcess : {}", id);
        Optional<QmsProcess> qmsProcess = qmsProcessRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsProcess);
    }

    /**
     * DELETE  /qms-processes/:id : delete the "id" qmsProcess.
     *
     * @param id the id of the qmsProcess to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-processes/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsProcess(@PathVariable Long id) {
        log.debug("REST request to delete QmsProcess : {}", id);

        qmsProcessRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
