package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.RbacMenuRightRelation;
import cn.com.cnc.fcc.repository.RbacMenuRightRelationRepository;
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
 * REST controller for managing RbacMenuRightRelation.
 */
@RestController
@RequestMapping("/api")
public class RbacMenuRightRelationResource {

    private final Logger log = LoggerFactory.getLogger(RbacMenuRightRelationResource.class);

    private static final String ENTITY_NAME = "rbacMenuRightRelation";

    private final RbacMenuRightRelationRepository rbacMenuRightRelationRepository;

    public RbacMenuRightRelationResource(RbacMenuRightRelationRepository rbacMenuRightRelationRepository) {
        this.rbacMenuRightRelationRepository = rbacMenuRightRelationRepository;
    }

    /**
     * POST  /rbac-menu-right-relations : Create a new rbacMenuRightRelation.
     *
     * @param rbacMenuRightRelation the rbacMenuRightRelation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rbacMenuRightRelation, or with status 400 (Bad Request) if the rbacMenuRightRelation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rbac-menu-right-relations")
    @Timed
    public ResponseEntity<RbacMenuRightRelation> createRbacMenuRightRelation(@Valid @RequestBody RbacMenuRightRelation rbacMenuRightRelation) throws URISyntaxException {
        log.debug("REST request to save RbacMenuRightRelation : {}", rbacMenuRightRelation);
        if (rbacMenuRightRelation.getId() != null) {
            throw new BadRequestAlertException("A new rbacMenuRightRelation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RbacMenuRightRelation result = rbacMenuRightRelationRepository.save(rbacMenuRightRelation);
        return ResponseEntity.created(new URI("/api/rbac-menu-right-relations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rbac-menu-right-relations : Updates an existing rbacMenuRightRelation.
     *
     * @param rbacMenuRightRelation the rbacMenuRightRelation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rbacMenuRightRelation,
     * or with status 400 (Bad Request) if the rbacMenuRightRelation is not valid,
     * or with status 500 (Internal Server Error) if the rbacMenuRightRelation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rbac-menu-right-relations")
    @Timed
    public ResponseEntity<RbacMenuRightRelation> updateRbacMenuRightRelation(@Valid @RequestBody RbacMenuRightRelation rbacMenuRightRelation) throws URISyntaxException {
        log.debug("REST request to update RbacMenuRightRelation : {}", rbacMenuRightRelation);
        if (rbacMenuRightRelation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RbacMenuRightRelation result = rbacMenuRightRelationRepository.save(rbacMenuRightRelation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rbacMenuRightRelation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rbac-menu-right-relations : get all the rbacMenuRightRelations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of rbacMenuRightRelations in body
     */
    @GetMapping("/rbac-menu-right-relations")
    @Timed
    public ResponseEntity<List<RbacMenuRightRelation>> getAllRbacMenuRightRelations(Pageable pageable) {
        log.debug("REST request to get a page of RbacMenuRightRelations");
        Page<RbacMenuRightRelation> page = rbacMenuRightRelationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/rbac-menu-right-relations");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /rbac-menu-right-relations/:id : get the "id" rbacMenuRightRelation.
     *
     * @param id the id of the rbacMenuRightRelation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rbacMenuRightRelation, or with status 404 (Not Found)
     */
    @GetMapping("/rbac-menu-right-relations/{id}")
    @Timed
    public ResponseEntity<RbacMenuRightRelation> getRbacMenuRightRelation(@PathVariable Long id) {
        log.debug("REST request to get RbacMenuRightRelation : {}", id);
        Optional<RbacMenuRightRelation> rbacMenuRightRelation = rbacMenuRightRelationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rbacMenuRightRelation);
    }

    /**
     * DELETE  /rbac-menu-right-relations/:id : delete the "id" rbacMenuRightRelation.
     *
     * @param id the id of the rbacMenuRightRelation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rbac-menu-right-relations/{id}")
    @Timed
    public ResponseEntity<Void> deleteRbacMenuRightRelation(@PathVariable Long id) {
        log.debug("REST request to delete RbacMenuRightRelation : {}", id);

        rbacMenuRightRelationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
