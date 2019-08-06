package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.PapiToken;
import cn.com.cnc.fcc.repository.PapiTokenRepository;
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
 * REST controller for managing PapiToken.
 */
@RestController
@RequestMapping("/api")
public class PapiTokenResource {

    private final Logger log = LoggerFactory.getLogger(PapiTokenResource.class);

    private static final String ENTITY_NAME = "papiToken";

    private final PapiTokenRepository papiTokenRepository;

    public PapiTokenResource(PapiTokenRepository papiTokenRepository) {
        this.papiTokenRepository = papiTokenRepository;
    }

    /**
     * POST  /papi-tokens : Create a new papiToken.
     *
     * @param papiToken the papiToken to create
     * @return the ResponseEntity with status 201 (Created) and with body the new papiToken, or with status 400 (Bad Request) if the papiToken has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/papi-tokens")
    @Timed
    public ResponseEntity<PapiToken> createPapiToken(@Valid @RequestBody PapiToken papiToken) throws URISyntaxException {
        log.debug("REST request to save PapiToken : {}", papiToken);
        if (papiToken.getId() != null) {
            throw new BadRequestAlertException("A new papiToken cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PapiToken result = papiTokenRepository.save(papiToken);
        return ResponseEntity.created(new URI("/api/papi-tokens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /papi-tokens : Updates an existing papiToken.
     *
     * @param papiToken the papiToken to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated papiToken,
     * or with status 400 (Bad Request) if the papiToken is not valid,
     * or with status 500 (Internal Server Error) if the papiToken couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/papi-tokens")
    @Timed
    public ResponseEntity<PapiToken> updatePapiToken(@Valid @RequestBody PapiToken papiToken) throws URISyntaxException {
        log.debug("REST request to update PapiToken : {}", papiToken);
        if (papiToken.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PapiToken result = papiTokenRepository.save(papiToken);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, papiToken.getId().toString()))
            .body(result);
    }

    /**
     * GET  /papi-tokens : get all the papiTokens.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of papiTokens in body
     */
    @GetMapping("/papi-tokens")
    @Timed
    public List<PapiToken> getAllPapiTokens() {
        log.debug("REST request to get all PapiTokens");
        return papiTokenRepository.findAll();
    }

    /**
     * GET  /papi-tokens/:id : get the "id" papiToken.
     *
     * @param id the id of the papiToken to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the papiToken, or with status 404 (Not Found)
     */
    @GetMapping("/papi-tokens/{id}")
    @Timed
    public ResponseEntity<PapiToken> getPapiToken(@PathVariable Long id) {
        log.debug("REST request to get PapiToken : {}", id);
        Optional<PapiToken> papiToken = papiTokenRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(papiToken);
    }

    /**
     * DELETE  /papi-tokens/:id : delete the "id" papiToken.
     *
     * @param id the id of the papiToken to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/papi-tokens/{id}")
    @Timed
    public ResponseEntity<Void> deletePapiToken(@PathVariable Long id) {
        log.debug("REST request to delete PapiToken : {}", id);

        papiTokenRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
