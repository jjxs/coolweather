package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.RbacRight;
import cn.com.cnc.fcc.repository.RbacRightRepository;
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
 * REST controller for managing RbacRight.
 */
@RestController
@RequestMapping("/api")
public class RbacRightResource {

    private final Logger log = LoggerFactory.getLogger(RbacRightResource.class);

    private static final String ENTITY_NAME = "rbacRight";

    private final RbacRightRepository rbacRightRepository;

    public RbacRightResource(RbacRightRepository rbacRightRepository) {
        this.rbacRightRepository = rbacRightRepository;
    }

    /**
     * POST  /rbac-rights : Create a new rbacRight.
     *
     * @param rbacRight the rbacRight to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rbacRight, or with status 400 (Bad Request) if the rbacRight has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rbac-rights")
    @Timed
    public ResponseEntity<RbacRight> createRbacRight(@Valid @RequestBody RbacRight rbacRight) throws URISyntaxException {
        log.debug("REST request to save RbacRight : {}", rbacRight);
        if (rbacRight.getId() != null) {
            throw new BadRequestAlertException("A new rbacRight cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RbacRight result = rbacRightRepository.save(rbacRight);
        return ResponseEntity.created(new URI("/api/rbac-rights/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rbac-rights : Updates an existing rbacRight.
     *
     * @param rbacRight the rbacRight to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rbacRight,
     * or with status 400 (Bad Request) if the rbacRight is not valid,
     * or with status 500 (Internal Server Error) if the rbacRight couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rbac-rights")
    @Timed
    public ResponseEntity<RbacRight> updateRbacRight(@Valid @RequestBody RbacRight rbacRight) throws URISyntaxException {
        log.debug("REST request to update RbacRight : {}", rbacRight);
        if (rbacRight.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RbacRight result = rbacRightRepository.save(rbacRight);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rbacRight.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rbac-rights : get all the rbacRights.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of rbacRights in body
     */
    @GetMapping("/rbac-rights")
    @Timed
    public ResponseEntity<List<RbacRight>> getAllRbacRights(Pageable pageable) {
        log.debug("REST request to get a page of RbacRights");
        Page<RbacRight> page = rbacRightRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/rbac-rights");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /rbac-rights/:id : get the "id" rbacRight.
     *
     * @param id the id of the rbacRight to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rbacRight, or with status 404 (Not Found)
     */
    @GetMapping("/rbac-rights/{id}")
    @Timed
    public ResponseEntity<RbacRight> getRbacRight(@PathVariable Long id) {
        log.debug("REST request to get RbacRight : {}", id);
        Optional<RbacRight> rbacRight = rbacRightRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rbacRight);
    }

    /**
     * DELETE  /rbac-rights/:id : delete the "id" rbacRight.
     *
     * @param id the id of the rbacRight to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rbac-rights/{id}")
    @Timed
    public ResponseEntity<Void> deleteRbacRight(@PathVariable Long id) {
        log.debug("REST request to delete RbacRight : {}", id);

        rbacRightRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
