package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.PapiTokenSlave;
import cn.com.cnc.fcc.repository.PapiTokenSlaveRepository;
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
 * REST controller for managing PapiTokenSlave.
 */
@RestController
@RequestMapping("/api")
public class PapiTokenSlaveResource {

    private final Logger log = LoggerFactory.getLogger(PapiTokenSlaveResource.class);

    private static final String ENTITY_NAME = "papiTokenSlave";

    private final PapiTokenSlaveRepository papiTokenSlaveRepository;

    public PapiTokenSlaveResource(PapiTokenSlaveRepository papiTokenSlaveRepository) {
        this.papiTokenSlaveRepository = papiTokenSlaveRepository;
    }

    /**
     * POST  /papi-token-slaves : Create a new papiTokenSlave.
     *
     * @param papiTokenSlave the papiTokenSlave to create
     * @return the ResponseEntity with status 201 (Created) and with body the new papiTokenSlave, or with status 400 (Bad Request) if the papiTokenSlave has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/papi-token-slaves")
    @Timed
    public ResponseEntity<PapiTokenSlave> createPapiTokenSlave(@Valid @RequestBody PapiTokenSlave papiTokenSlave) throws URISyntaxException {
        log.debug("REST request to save PapiTokenSlave : {}", papiTokenSlave);
        if (papiTokenSlave.getId() != null) {
            throw new BadRequestAlertException("A new papiTokenSlave cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PapiTokenSlave result = papiTokenSlaveRepository.save(papiTokenSlave);
        return ResponseEntity.created(new URI("/api/papi-token-slaves/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /papi-token-slaves : Updates an existing papiTokenSlave.
     *
     * @param papiTokenSlave the papiTokenSlave to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated papiTokenSlave,
     * or with status 400 (Bad Request) if the papiTokenSlave is not valid,
     * or with status 500 (Internal Server Error) if the papiTokenSlave couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/papi-token-slaves")
    @Timed
    public ResponseEntity<PapiTokenSlave> updatePapiTokenSlave(@Valid @RequestBody PapiTokenSlave papiTokenSlave) throws URISyntaxException {
        log.debug("REST request to update PapiTokenSlave : {}", papiTokenSlave);
        if (papiTokenSlave.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PapiTokenSlave result = papiTokenSlaveRepository.save(papiTokenSlave);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, papiTokenSlave.getId().toString()))
            .body(result);
    }

    /**
     * GET  /papi-token-slaves : get all the papiTokenSlaves.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of papiTokenSlaves in body
     */
    @GetMapping("/papi-token-slaves")
    @Timed
    public List<PapiTokenSlave> getAllPapiTokenSlaves() {
        log.debug("REST request to get all PapiTokenSlaves");
        return papiTokenSlaveRepository.findAll();
    }

    /**
     * GET  /papi-token-slaves/:id : get the "id" papiTokenSlave.
     *
     * @param id the id of the papiTokenSlave to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the papiTokenSlave, or with status 404 (Not Found)
     */
    @GetMapping("/papi-token-slaves/{id}")
    @Timed
    public ResponseEntity<PapiTokenSlave> getPapiTokenSlave(@PathVariable Long id) {
        log.debug("REST request to get PapiTokenSlave : {}", id);
        Optional<PapiTokenSlave> papiTokenSlave = papiTokenSlaveRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(papiTokenSlave);
    }

    /**
     * DELETE  /papi-token-slaves/:id : delete the "id" papiTokenSlave.
     *
     * @param id the id of the papiTokenSlave to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/papi-token-slaves/{id}")
    @Timed
    public ResponseEntity<Void> deletePapiTokenSlave(@PathVariable Long id) {
        log.debug("REST request to delete PapiTokenSlave : {}", id);

        papiTokenSlaveRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
