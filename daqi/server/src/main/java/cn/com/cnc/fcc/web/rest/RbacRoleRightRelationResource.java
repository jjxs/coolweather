package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.RbacRoleRightRelation;
import cn.com.cnc.fcc.repository.RbacRoleRightRelationRepository;
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
 * REST controller for managing RbacRoleRightRelation.
 */
@RestController
@RequestMapping("/api")
public class RbacRoleRightRelationResource {

    private final Logger log = LoggerFactory.getLogger(RbacRoleRightRelationResource.class);

    private static final String ENTITY_NAME = "rbacRoleRightRelation";

    private final RbacRoleRightRelationRepository rbacRoleRightRelationRepository;

    public RbacRoleRightRelationResource(RbacRoleRightRelationRepository rbacRoleRightRelationRepository) {
        this.rbacRoleRightRelationRepository = rbacRoleRightRelationRepository;
    }

    /**
     * POST  /rbac-role-right-relations : Create a new rbacRoleRightRelation.
     *
     * @param rbacRoleRightRelation the rbacRoleRightRelation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rbacRoleRightRelation, or with status 400 (Bad Request) if the rbacRoleRightRelation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rbac-role-right-relations")
    @Timed
    public ResponseEntity<RbacRoleRightRelation> createRbacRoleRightRelation(@Valid @RequestBody RbacRoleRightRelation rbacRoleRightRelation) throws URISyntaxException {
        log.debug("REST request to save RbacRoleRightRelation : {}", rbacRoleRightRelation);
        if (rbacRoleRightRelation.getId() != null) {
            throw new BadRequestAlertException("A new rbacRoleRightRelation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RbacRoleRightRelation result = rbacRoleRightRelationRepository.save(rbacRoleRightRelation);
        return ResponseEntity.created(new URI("/api/rbac-role-right-relations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rbac-role-right-relations : Updates an existing rbacRoleRightRelation.
     *
     * @param rbacRoleRightRelation the rbacRoleRightRelation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rbacRoleRightRelation,
     * or with status 400 (Bad Request) if the rbacRoleRightRelation is not valid,
     * or with status 500 (Internal Server Error) if the rbacRoleRightRelation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rbac-role-right-relations")
    @Timed
    public ResponseEntity<RbacRoleRightRelation> updateRbacRoleRightRelation(@Valid @RequestBody RbacRoleRightRelation rbacRoleRightRelation) throws URISyntaxException {
        log.debug("REST request to update RbacRoleRightRelation : {}", rbacRoleRightRelation);
        if (rbacRoleRightRelation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RbacRoleRightRelation result = rbacRoleRightRelationRepository.save(rbacRoleRightRelation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rbacRoleRightRelation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rbac-role-right-relations : get all the rbacRoleRightRelations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of rbacRoleRightRelations in body
     */
    @GetMapping("/rbac-role-right-relations")
    @Timed
    public ResponseEntity<List<RbacRoleRightRelation>> getAllRbacRoleRightRelations(Pageable pageable) {
        log.debug("REST request to get a page of RbacRoleRightRelations");
        Page<RbacRoleRightRelation> page = rbacRoleRightRelationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/rbac-role-right-relations");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /rbac-role-right-relations/:id : get the "id" rbacRoleRightRelation.
     *
     * @param id the id of the rbacRoleRightRelation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rbacRoleRightRelation, or with status 404 (Not Found)
     */
    @GetMapping("/rbac-role-right-relations/{id}")
    @Timed
    public ResponseEntity<RbacRoleRightRelation> getRbacRoleRightRelation(@PathVariable Long id) {
        log.debug("REST request to get RbacRoleRightRelation : {}", id);
        Optional<RbacRoleRightRelation> rbacRoleRightRelation = rbacRoleRightRelationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rbacRoleRightRelation);
    }

    /**
     * DELETE  /rbac-role-right-relations/:id : delete the "id" rbacRoleRightRelation.
     *
     * @param id the id of the rbacRoleRightRelation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rbac-role-right-relations/{id}")
    @Timed
    public ResponseEntity<Void> deleteRbacRoleRightRelation(@PathVariable Long id) {
        log.debug("REST request to delete RbacRoleRightRelation : {}", id);

        rbacRoleRightRelationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
