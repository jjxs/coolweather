package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.HstServerInfo;
import cn.com.cnc.fcc.repository.HstServerInfoRepository;
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
 * REST controller for managing HstServerInfo.
 */
@RestController
@RequestMapping("/api")
public class HstServerInfoResource {

    private final Logger log = LoggerFactory.getLogger(HstServerInfoResource.class);

    private static final String ENTITY_NAME = "hstServerInfo";

    private final HstServerInfoRepository hstServerInfoRepository;

    public HstServerInfoResource(HstServerInfoRepository hstServerInfoRepository) {
        this.hstServerInfoRepository = hstServerInfoRepository;
    }

    /**
     * POST  /hst-server-infos : Create a new hstServerInfo.
     *
     * @param hstServerInfo the hstServerInfo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hstServerInfo, or with status 400 (Bad Request) if the hstServerInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hst-server-infos")
    @Timed
    public ResponseEntity<HstServerInfo> createHstServerInfo(@Valid @RequestBody HstServerInfo hstServerInfo) throws URISyntaxException {
        log.debug("REST request to save HstServerInfo : {}", hstServerInfo);
        if (hstServerInfo.getId() != null) {
            throw new BadRequestAlertException("A new hstServerInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HstServerInfo result = hstServerInfoRepository.save(hstServerInfo);
        return ResponseEntity.created(new URI("/api/hst-server-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hst-server-infos : Updates an existing hstServerInfo.
     *
     * @param hstServerInfo the hstServerInfo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hstServerInfo,
     * or with status 400 (Bad Request) if the hstServerInfo is not valid,
     * or with status 500 (Internal Server Error) if the hstServerInfo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hst-server-infos")
    @Timed
    public ResponseEntity<HstServerInfo> updateHstServerInfo(@Valid @RequestBody HstServerInfo hstServerInfo) throws URISyntaxException {
        log.debug("REST request to update HstServerInfo : {}", hstServerInfo);
        if (hstServerInfo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HstServerInfo result = hstServerInfoRepository.save(hstServerInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hstServerInfo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hst-server-infos : get all the hstServerInfos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hstServerInfos in body
     */
    @GetMapping("/hst-server-infos")
    @Timed
    public List<HstServerInfo> getAllHstServerInfos() {
        log.debug("REST request to get all HstServerInfos");
        return hstServerInfoRepository.findAll();
    }

    /**
     * GET  /hst-server-infos/:id : get the "id" hstServerInfo.
     *
     * @param id the id of the hstServerInfo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hstServerInfo, or with status 404 (Not Found)
     */
    @GetMapping("/hst-server-infos/{id}")
    @Timed
    public ResponseEntity<HstServerInfo> getHstServerInfo(@PathVariable Long id) {
        log.debug("REST request to get HstServerInfo : {}", id);
        Optional<HstServerInfo> hstServerInfo = hstServerInfoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(hstServerInfo);
    }

    /**
     * DELETE  /hst-server-infos/:id : delete the "id" hstServerInfo.
     *
     * @param id the id of the hstServerInfo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hst-server-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteHstServerInfo(@PathVariable Long id) {
        log.debug("REST request to delete HstServerInfo : {}", id);

        hstServerInfoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
