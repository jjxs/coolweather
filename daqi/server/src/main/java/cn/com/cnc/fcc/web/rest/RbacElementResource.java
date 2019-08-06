package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.RbacElement;
import cn.com.cnc.fcc.repository.RbacElementRepository;
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
 * REST controller for managing RbacElement.
 */
@RestController
@RequestMapping("/api")
public class RbacElementResource {

    private final Logger log = LoggerFactory.getLogger(RbacElementResource.class);

    private static final String ENTITY_NAME = "rbacElement";

    private final RbacElementRepository rbacElementRepository;

    public RbacElementResource(RbacElementRepository rbacElementRepository) {
        this.rbacElementRepository = rbacElementRepository;
    }

    /**
     * POST  /rbac-elements : Create a new rbacElement.
     *
     * @param rbacElement the rbacElement to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rbacElement, or with status 400 (Bad Request) if the rbacElement has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rbac-elements")
    @Timed
    public ResponseEntity<RbacElement> createRbacElement(@Valid @RequestBody RbacElement rbacElement) throws URISyntaxException {
        log.debug("REST request to save RbacElement : {}", rbacElement);
        if (rbacElement.getId() != null) {
            throw new BadRequestAlertException("A new rbacElement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RbacElement result = rbacElementRepository.save(rbacElement);
        return ResponseEntity.created(new URI("/api/rbac-elements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rbac-elements : Updates an existing rbacElement.
     *
     * @param rbacElement the rbacElement to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rbacElement,
     * or with status 400 (Bad Request) if the rbacElement is not valid,
     * or with status 500 (Internal Server Error) if the rbacElement couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rbac-elements")
    @Timed
    public ResponseEntity<RbacElement> updateRbacElement(@Valid @RequestBody RbacElement rbacElement) throws URISyntaxException {
        log.debug("REST request to update RbacElement : {}", rbacElement);
        if (rbacElement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RbacElement result = rbacElementRepository.save(rbacElement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rbacElement.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rbac-elements : get all the rbacElements.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of rbacElements in body
     */
    @GetMapping("/rbac-elements")
    @Timed
    public ResponseEntity<List<RbacElement>> getAllRbacElements(Pageable pageable) {
        log.debug("REST request to get a page of RbacElements");
        Page<RbacElement> page = rbacElementRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/rbac-elements");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /rbac-elements/:id : get the "id" rbacElement.
     *
     * @param id the id of the rbacElement to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rbacElement, or with status 404 (Not Found)
     */
    @GetMapping("/rbac-elements/{id}")
    @Timed
    public ResponseEntity<RbacElement> getRbacElement(@PathVariable Long id) {
        log.debug("REST request to get RbacElement : {}", id);
        Optional<RbacElement> rbacElement = rbacElementRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rbacElement);
    }

    /**
     * DELETE  /rbac-elements/:id : delete the "id" rbacElement.
     *
     * @param id the id of the rbacElement to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rbac-elements/{id}")
    @Timed
    public ResponseEntity<Void> deleteRbacElement(@PathVariable Long id) {
        log.debug("REST request to delete RbacElement : {}", id);

        rbacElementRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
