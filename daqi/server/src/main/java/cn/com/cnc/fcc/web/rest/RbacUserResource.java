package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.RbacUser;
import cn.com.cnc.fcc.repository.RbacUserRepository;
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
 * REST controller for managing RbacUser.
 */
@RestController
@RequestMapping("/api")
public class RbacUserResource {

    private final Logger log = LoggerFactory.getLogger(RbacUserResource.class);

    private static final String ENTITY_NAME = "rbacUser";

    private final RbacUserRepository rbacUserRepository;

    public RbacUserResource(RbacUserRepository rbacUserRepository) {
        this.rbacUserRepository = rbacUserRepository;
    }

    /**
     * POST  /rbac-users : Create a new rbacUser.
     *
     * @param rbacUser the rbacUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rbacUser, or with status 400 (Bad Request) if the rbacUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rbac-users")
    @Timed
    public ResponseEntity<RbacUser> createRbacUser(@Valid @RequestBody RbacUser rbacUser) throws URISyntaxException {
        log.debug("REST request to save RbacUser : {}", rbacUser);
        if (rbacUser.getId() != null) {
            throw new BadRequestAlertException("A new rbacUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RbacUser result = rbacUserRepository.save(rbacUser);
        return ResponseEntity.created(new URI("/api/rbac-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rbac-users : Updates an existing rbacUser.
     *
     * @param rbacUser the rbacUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rbacUser,
     * or with status 400 (Bad Request) if the rbacUser is not valid,
     * or with status 500 (Internal Server Error) if the rbacUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rbac-users")
    @Timed
    public ResponseEntity<RbacUser> updateRbacUser(@Valid @RequestBody RbacUser rbacUser) throws URISyntaxException {
        log.debug("REST request to update RbacUser : {}", rbacUser);
        if (rbacUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RbacUser result = rbacUserRepository.save(rbacUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rbacUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rbac-users : get all the rbacUsers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of rbacUsers in body
     */
    @GetMapping("/rbac-users")
    @Timed
    public ResponseEntity<List<RbacUser>> getAllRbacUsers(Pageable pageable) {
        log.debug("REST request to get a page of RbacUsers");
        Page<RbacUser> page = rbacUserRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/rbac-users");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /rbac-users/:id : get the "id" rbacUser.
     *
     * @param id the id of the rbacUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rbacUser, or with status 404 (Not Found)
     */
    @GetMapping("/rbac-users/{id}")
    @Timed
    public ResponseEntity<RbacUser> getRbacUser(@PathVariable Long id) {
        log.debug("REST request to get RbacUser : {}", id);
        Optional<RbacUser> rbacUser = rbacUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rbacUser);
    }

    /**
     * DELETE  /rbac-users/:id : delete the "id" rbacUser.
     *
     * @param id the id of the rbacUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rbac-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteRbacUser(@PathVariable Long id) {
        log.debug("REST request to delete RbacUser : {}", id);

        rbacUserRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
