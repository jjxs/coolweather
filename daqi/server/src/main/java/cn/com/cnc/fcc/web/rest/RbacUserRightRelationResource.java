package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.RbacUserRightRelation;
import cn.com.cnc.fcc.repository.RbacUserRightRelationRepository;
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
 * REST controller for managing RbacUserRightRelation.
 */
@RestController
@RequestMapping("/api")
public class RbacUserRightRelationResource {

    private final Logger log = LoggerFactory.getLogger(RbacUserRightRelationResource.class);

    private static final String ENTITY_NAME = "rbacUserRightRelation";

    private final RbacUserRightRelationRepository rbacUserRightRelationRepository;

    public RbacUserRightRelationResource(RbacUserRightRelationRepository rbacUserRightRelationRepository) {
        this.rbacUserRightRelationRepository = rbacUserRightRelationRepository;
    }

    /**
     * POST  /rbac-user-right-relations : Create a new rbacUserRightRelation.
     *
     * @param rbacUserRightRelation the rbacUserRightRelation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rbacUserRightRelation, or with status 400 (Bad Request) if the rbacUserRightRelation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rbac-user-right-relations")
    @Timed
    public ResponseEntity<RbacUserRightRelation> createRbacUserRightRelation(@Valid @RequestBody RbacUserRightRelation rbacUserRightRelation) throws URISyntaxException {
        log.debug("REST request to save RbacUserRightRelation : {}", rbacUserRightRelation);
        if (rbacUserRightRelation.getId() != null) {
            throw new BadRequestAlertException("A new rbacUserRightRelation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RbacUserRightRelation result = rbacUserRightRelationRepository.save(rbacUserRightRelation);
        return ResponseEntity.created(new URI("/api/rbac-user-right-relations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rbac-user-right-relations : Updates an existing rbacUserRightRelation.
     *
     * @param rbacUserRightRelation the rbacUserRightRelation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rbacUserRightRelation,
     * or with status 400 (Bad Request) if the rbacUserRightRelation is not valid,
     * or with status 500 (Internal Server Error) if the rbacUserRightRelation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rbac-user-right-relations")
    @Timed
    public ResponseEntity<RbacUserRightRelation> updateRbacUserRightRelation(@Valid @RequestBody RbacUserRightRelation rbacUserRightRelation) throws URISyntaxException {
        log.debug("REST request to update RbacUserRightRelation : {}", rbacUserRightRelation);
        if (rbacUserRightRelation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RbacUserRightRelation result = rbacUserRightRelationRepository.save(rbacUserRightRelation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rbacUserRightRelation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rbac-user-right-relations : get all the rbacUserRightRelations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of rbacUserRightRelations in body
     */
    @GetMapping("/rbac-user-right-relations")
    @Timed
    public ResponseEntity<List<RbacUserRightRelation>> getAllRbacUserRightRelations(Pageable pageable) {
        log.debug("REST request to get a page of RbacUserRightRelations");
        Page<RbacUserRightRelation> page = rbacUserRightRelationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/rbac-user-right-relations");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /rbac-user-right-relations/:id : get the "id" rbacUserRightRelation.
     *
     * @param id the id of the rbacUserRightRelation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rbacUserRightRelation, or with status 404 (Not Found)
     */
    @GetMapping("/rbac-user-right-relations/{id}")
    @Timed
    public ResponseEntity<RbacUserRightRelation> getRbacUserRightRelation(@PathVariable Long id) {
        log.debug("REST request to get RbacUserRightRelation : {}", id);
        Optional<RbacUserRightRelation> rbacUserRightRelation = rbacUserRightRelationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rbacUserRightRelation);
    }

    /**
     * DELETE  /rbac-user-right-relations/:id : delete the "id" rbacUserRightRelation.
     *
     * @param id the id of the rbacUserRightRelation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rbac-user-right-relations/{id}")
    @Timed
    public ResponseEntity<Void> deleteRbacUserRightRelation(@PathVariable Long id) {
        log.debug("REST request to delete RbacUserRightRelation : {}", id);

        rbacUserRightRelationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
