package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsProcessRoute;
import cn.com.cnc.fcc.repository.QmsProcessRouteRepository;
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
 * REST controller for managing QmsProcessRoute.
 */
@RestController
@RequestMapping("/api")
public class QmsProcessRouteResource {

    private final Logger log = LoggerFactory.getLogger(QmsProcessRouteResource.class);

    private static final String ENTITY_NAME = "qmsProcessRoute";

    private final QmsProcessRouteRepository qmsProcessRouteRepository;

    public QmsProcessRouteResource(QmsProcessRouteRepository qmsProcessRouteRepository) {
        this.qmsProcessRouteRepository = qmsProcessRouteRepository;
    }

    /**
     * POST  /qms-process-routes : Create a new qmsProcessRoute.
     *
     * @param qmsProcessRoute the qmsProcessRoute to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsProcessRoute, or with status 400 (Bad Request) if the qmsProcessRoute has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-process-routes")
    @Timed
    public ResponseEntity<QmsProcessRoute> createQmsProcessRoute(@Valid @RequestBody QmsProcessRoute qmsProcessRoute) throws URISyntaxException {
        log.debug("REST request to save QmsProcessRoute : {}", qmsProcessRoute);
        if (qmsProcessRoute.getId() != null) {
            throw new BadRequestAlertException("A new qmsProcessRoute cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsProcessRoute result = qmsProcessRouteRepository.save(qmsProcessRoute);
        return ResponseEntity.created(new URI("/api/qms-process-routes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-process-routes : Updates an existing qmsProcessRoute.
     *
     * @param qmsProcessRoute the qmsProcessRoute to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsProcessRoute,
     * or with status 400 (Bad Request) if the qmsProcessRoute is not valid,
     * or with status 500 (Internal Server Error) if the qmsProcessRoute couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-process-routes")
    @Timed
    public ResponseEntity<QmsProcessRoute> updateQmsProcessRoute(@Valid @RequestBody QmsProcessRoute qmsProcessRoute) throws URISyntaxException {
        log.debug("REST request to update QmsProcessRoute : {}", qmsProcessRoute);
        if (qmsProcessRoute.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsProcessRoute result = qmsProcessRouteRepository.save(qmsProcessRoute);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsProcessRoute.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-process-routes : get all the qmsProcessRoutes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsProcessRoutes in body
     */
    @GetMapping("/qms-process-routes")
    @Timed
    public ResponseEntity<List<QmsProcessRoute>> getAllQmsProcessRoutes(Pageable pageable) {
        log.debug("REST request to get a page of QmsProcessRoutes");
        Page<QmsProcessRoute> page = qmsProcessRouteRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-process-routes");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-process-routes/:id : get the "id" qmsProcessRoute.
     *
     * @param id the id of the qmsProcessRoute to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsProcessRoute, or with status 404 (Not Found)
     */
    @GetMapping("/qms-process-routes/{id}")
    @Timed
    public ResponseEntity<QmsProcessRoute> getQmsProcessRoute(@PathVariable Long id) {
        log.debug("REST request to get QmsProcessRoute : {}", id);
        Optional<QmsProcessRoute> qmsProcessRoute = qmsProcessRouteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsProcessRoute);
    }

    /**
     * DELETE  /qms-process-routes/:id : delete the "id" qmsProcessRoute.
     *
     * @param id the id of the qmsProcessRoute to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-process-routes/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsProcessRoute(@PathVariable Long id) {
        log.debug("REST request to delete QmsProcessRoute : {}", id);

        qmsProcessRouteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
