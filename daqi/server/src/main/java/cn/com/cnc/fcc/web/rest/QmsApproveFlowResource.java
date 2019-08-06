package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsApproveFlow;
import cn.com.cnc.fcc.repository.QmsApproveFlowRepository;
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
 * REST controller for managing QmsApproveFlow.
 */
@RestController
@RequestMapping("/api")
public class QmsApproveFlowResource {

    private final Logger log = LoggerFactory.getLogger(QmsApproveFlowResource.class);

    private static final String ENTITY_NAME = "qmsApproveFlow";

    private final QmsApproveFlowRepository qmsApproveFlowRepository;

    public QmsApproveFlowResource(QmsApproveFlowRepository qmsApproveFlowRepository) {
        this.qmsApproveFlowRepository = qmsApproveFlowRepository;
    }

    /**
     * POST  /qms-approve-flows : Create a new qmsApproveFlow.
     *
     * @param qmsApproveFlow the qmsApproveFlow to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsApproveFlow, or with status 400 (Bad Request) if the qmsApproveFlow has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-approve-flows")
    @Timed
    public ResponseEntity<QmsApproveFlow> createQmsApproveFlow(@Valid @RequestBody QmsApproveFlow qmsApproveFlow) throws URISyntaxException {
        log.debug("REST request to save QmsApproveFlow : {}", qmsApproveFlow);
        if (qmsApproveFlow.getId() != null) {
            throw new BadRequestAlertException("A new qmsApproveFlow cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsApproveFlow result = qmsApproveFlowRepository.save(qmsApproveFlow);
        return ResponseEntity.created(new URI("/api/qms-approve-flows/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-approve-flows : Updates an existing qmsApproveFlow.
     *
     * @param qmsApproveFlow the qmsApproveFlow to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsApproveFlow,
     * or with status 400 (Bad Request) if the qmsApproveFlow is not valid,
     * or with status 500 (Internal Server Error) if the qmsApproveFlow couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-approve-flows")
    @Timed
    public ResponseEntity<QmsApproveFlow> updateQmsApproveFlow(@Valid @RequestBody QmsApproveFlow qmsApproveFlow) throws URISyntaxException {
        log.debug("REST request to update QmsApproveFlow : {}", qmsApproveFlow);
        if (qmsApproveFlow.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsApproveFlow result = qmsApproveFlowRepository.save(qmsApproveFlow);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsApproveFlow.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-approve-flows : get all the qmsApproveFlows.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsApproveFlows in body
     */
    @GetMapping("/qms-approve-flows")
    @Timed
    public ResponseEntity<List<QmsApproveFlow>> getAllQmsApproveFlows(Pageable pageable) {
        log.debug("REST request to get a page of QmsApproveFlows");
        Page<QmsApproveFlow> page = qmsApproveFlowRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-approve-flows");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-approve-flows/:id : get the "id" qmsApproveFlow.
     *
     * @param id the id of the qmsApproveFlow to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsApproveFlow, or with status 404 (Not Found)
     */
    @GetMapping("/qms-approve-flows/{id}")
    @Timed
    public ResponseEntity<QmsApproveFlow> getQmsApproveFlow(@PathVariable Long id) {
        log.debug("REST request to get QmsApproveFlow : {}", id);
        Optional<QmsApproveFlow> qmsApproveFlow = qmsApproveFlowRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsApproveFlow);
    }

    /**
     * DELETE  /qms-approve-flows/:id : delete the "id" qmsApproveFlow.
     *
     * @param id the id of the qmsApproveFlow to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-approve-flows/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsApproveFlow(@PathVariable Long id) {
        log.debug("REST request to delete QmsApproveFlow : {}", id);

        qmsApproveFlowRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
