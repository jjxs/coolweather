package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.RbacRole;
import cn.com.cnc.fcc.repository.RbacRoleRepository;
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
 * REST controller for managing RbacRole.
 */
@RestController
@RequestMapping("/api")
public class RbacRoleResource {

    private final Logger log = LoggerFactory.getLogger(RbacRoleResource.class);

    private static final String ENTITY_NAME = "rbacRole";

    private final RbacRoleRepository rbacRoleRepository;

    public RbacRoleResource(RbacRoleRepository rbacRoleRepository) {
        this.rbacRoleRepository = rbacRoleRepository;
    }

    /**
     * POST  /rbac-roles : Create a new rbacRole.
     *
     * @param rbacRole the rbacRole to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rbacRole, or with status 400 (Bad Request) if the rbacRole has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rbac-roles")
    @Timed
    public ResponseEntity<RbacRole> createRbacRole(@Valid @RequestBody RbacRole rbacRole) throws URISyntaxException {
        log.debug("REST request to save RbacRole : {}", rbacRole);
        if (rbacRole.getId() != null) {
            throw new BadRequestAlertException("A new rbacRole cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RbacRole result = rbacRoleRepository.save(rbacRole);
        return ResponseEntity.created(new URI("/api/rbac-roles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rbac-roles : Updates an existing rbacRole.
     *
     * @param rbacRole the rbacRole to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rbacRole,
     * or with status 400 (Bad Request) if the rbacRole is not valid,
     * or with status 500 (Internal Server Error) if the rbacRole couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rbac-roles")
    @Timed
    public ResponseEntity<RbacRole> updateRbacRole(@Valid @RequestBody RbacRole rbacRole) throws URISyntaxException {
        log.debug("REST request to update RbacRole : {}", rbacRole);
        if (rbacRole.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RbacRole result = rbacRoleRepository.save(rbacRole);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rbacRole.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rbac-roles : get all the rbacRoles.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of rbacRoles in body
     */
    @GetMapping("/rbac-roles")
    @Timed
    public ResponseEntity<List<RbacRole>> getAllRbacRoles(Pageable pageable) {
        log.debug("REST request to get a page of RbacRoles");
        Page<RbacRole> page = rbacRoleRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/rbac-roles");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /rbac-roles/:id : get the "id" rbacRole.
     *
     * @param id the id of the rbacRole to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rbacRole, or with status 404 (Not Found)
     */
    @GetMapping("/rbac-roles/{id}")
    @Timed
    public ResponseEntity<RbacRole> getRbacRole(@PathVariable Long id) {
        log.debug("REST request to get RbacRole : {}", id);
        Optional<RbacRole> rbacRole = rbacRoleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rbacRole);
    }

    /**
     * DELETE  /rbac-roles/:id : delete the "id" rbacRole.
     *
     * @param id the id of the rbacRole to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rbac-roles/{id}")
    @Timed
    public ResponseEntity<Void> deleteRbacRole(@PathVariable Long id) {
        log.debug("REST request to delete RbacRole : {}", id);

        rbacRoleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
