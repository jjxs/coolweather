package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.HstServerInfoDetails;
import cn.com.cnc.fcc.repository.HstServerInfoDetailsRepository;
import cn.com.cnc.fcc.web.rest.errors.BadRequestAlertException;
import cn.com.cnc.fcc.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing HstServerInfoDetails.
 */
@RestController
@RequestMapping("/api")
public class HstServerInfoDetailsResource {

    private final Logger log = LoggerFactory.getLogger(HstServerInfoDetailsResource.class);

    private static final String ENTITY_NAME = "hstServerInfoDetails";

    private final HstServerInfoDetailsRepository hstServerInfoDetailsRepository;

    public HstServerInfoDetailsResource(HstServerInfoDetailsRepository hstServerInfoDetailsRepository) {
        this.hstServerInfoDetailsRepository = hstServerInfoDetailsRepository;
    }

    /**
     * POST  /hst-server-info-details : Create a new hstServerInfoDetails.
     *
     * @param hstServerInfoDetails the hstServerInfoDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hstServerInfoDetails, or with status 400 (Bad Request) if the hstServerInfoDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hst-server-info-details")
    @Timed
    public ResponseEntity<HstServerInfoDetails> createHstServerInfoDetails(@Valid @RequestBody HstServerInfoDetails hstServerInfoDetails) throws URISyntaxException {
        log.debug("REST request to save HstServerInfoDetails : {}", hstServerInfoDetails);
        if (hstServerInfoDetails.getId() != null) {
            throw new BadRequestAlertException("A new hstServerInfoDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HstServerInfoDetails result = hstServerInfoDetailsRepository.save(hstServerInfoDetails);
        return ResponseEntity.created(new URI("/api/hst-server-info-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hst-server-info-details : Updates an existing hstServerInfoDetails.
     *
     * @param hstServerInfoDetails the hstServerInfoDetails to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hstServerInfoDetails,
     * or with status 400 (Bad Request) if the hstServerInfoDetails is not valid,
     * or with status 500 (Internal Server Error) if the hstServerInfoDetails couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hst-server-info-details")
    @Timed
    public ResponseEntity<HstServerInfoDetails> updateHstServerInfoDetails(@Valid @RequestBody HstServerInfoDetails hstServerInfoDetails) throws URISyntaxException {
        log.debug("REST request to update HstServerInfoDetails : {}", hstServerInfoDetails);
        if (hstServerInfoDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HstServerInfoDetails result = hstServerInfoDetailsRepository.save(hstServerInfoDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hstServerInfoDetails.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hst-server-info-details : get all the hstServerInfoDetails.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hstServerInfoDetails in body
     */
    @GetMapping("/hst-server-info-details")
    @Timed
    public List<HstServerInfoDetails> getAllHstServerInfoDetails() {
        log.debug("REST request to get all HstServerInfoDetails");
        return hstServerInfoDetailsRepository.findAll();
    }

    /**
     * GET  /hst-server-info-details/:id : get the "id" hstServerInfoDetails.
     *
     * @param id the id of the hstServerInfoDetails to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hstServerInfoDetails, or with status 404 (Not Found)
     */
    @GetMapping("/hst-server-info-details/{id}")
    @Timed
    public ResponseEntity<HstServerInfoDetails> getHstServerInfoDetails(@PathVariable Long id) {
        log.debug("REST request to get HstServerInfoDetails : {}", id);
        Optional<HstServerInfoDetails> hstServerInfoDetails = hstServerInfoDetailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(hstServerInfoDetails);
    }

    /**
     * DELETE  /hst-server-info-details/:id : delete the "id" hstServerInfoDetails.
     *
     * @param id the id of the hstServerInfoDetails to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hst-server-info-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteHstServerInfoDetails(@PathVariable Long id) {
        log.debug("REST request to delete HstServerInfoDetails : {}", id);

        hstServerInfoDetailsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
