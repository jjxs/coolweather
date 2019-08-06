package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsProductionTask;
import cn.com.cnc.fcc.repository.QmsProductionTaskRepository;
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
 * REST controller for managing QmsProductionTask.
 */
@RestController
@RequestMapping("/api")
public class QmsProductionTaskResource {

    private final Logger log = LoggerFactory.getLogger(QmsProductionTaskResource.class);

    private static final String ENTITY_NAME = "qmsProductionTask";

    private final QmsProductionTaskRepository qmsProductionTaskRepository;

    public QmsProductionTaskResource(QmsProductionTaskRepository qmsProductionTaskRepository) {
        this.qmsProductionTaskRepository = qmsProductionTaskRepository;
    }

    /**
     * POST  /qms-production-tasks : Create a new qmsProductionTask.
     *
     * @param qmsProductionTask the qmsProductionTask to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsProductionTask, or with status 400 (Bad Request) if the qmsProductionTask has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-production-tasks")
    @Timed
    public ResponseEntity<QmsProductionTask> createQmsProductionTask(@Valid @RequestBody QmsProductionTask qmsProductionTask) throws URISyntaxException {
        log.debug("REST request to save QmsProductionTask : {}", qmsProductionTask);
        if (qmsProductionTask.getId() != null) {
            throw new BadRequestAlertException("A new qmsProductionTask cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsProductionTask result = qmsProductionTaskRepository.save(qmsProductionTask);
        return ResponseEntity.created(new URI("/api/qms-production-tasks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-production-tasks : Updates an existing qmsProductionTask.
     *
     * @param qmsProductionTask the qmsProductionTask to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsProductionTask,
     * or with status 400 (Bad Request) if the qmsProductionTask is not valid,
     * or with status 500 (Internal Server Error) if the qmsProductionTask couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-production-tasks")
    @Timed
    public ResponseEntity<QmsProductionTask> updateQmsProductionTask(@Valid @RequestBody QmsProductionTask qmsProductionTask) throws URISyntaxException {
        log.debug("REST request to update QmsProductionTask : {}", qmsProductionTask);
        if (qmsProductionTask.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsProductionTask result = qmsProductionTaskRepository.save(qmsProductionTask);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsProductionTask.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-production-tasks : get all the qmsProductionTasks.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsProductionTasks in body
     */
    @GetMapping("/qms-production-tasks")
    @Timed
    public ResponseEntity<List<QmsProductionTask>> getAllQmsProductionTasks(Pageable pageable) {
        log.debug("REST request to get a page of QmsProductionTasks");
        Page<QmsProductionTask> page = qmsProductionTaskRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-production-tasks");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-production-tasks/:id : get the "id" qmsProductionTask.
     *
     * @param id the id of the qmsProductionTask to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsProductionTask, or with status 404 (Not Found)
     */
    @GetMapping("/qms-production-tasks/{id}")
    @Timed
    public ResponseEntity<QmsProductionTask> getQmsProductionTask(@PathVariable Long id) {
        log.debug("REST request to get QmsProductionTask : {}", id);
        Optional<QmsProductionTask> qmsProductionTask = qmsProductionTaskRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsProductionTask);
    }

    /**
     * DELETE  /qms-production-tasks/:id : delete the "id" qmsProductionTask.
     *
     * @param id the id of the qmsProductionTask to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-production-tasks/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsProductionTask(@PathVariable Long id) {
        log.debug("REST request to delete QmsProductionTask : {}", id);

        qmsProductionTaskRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
