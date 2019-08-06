package cn.com.cnc.fcc.web.rest;

import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsUnqualifiedProduct;
import cn.com.cnc.fcc.repository.QmsUnqualifiedProductRepository;
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
 * REST controller for managing QmsUnqualifiedProduct.
 */
@RestController
@RequestMapping("/api")
public class QmsUnqualifiedProductResource {

    private final Logger log = LoggerFactory.getLogger(QmsUnqualifiedProductResource.class);

    private static final String ENTITY_NAME = "qmsUnqualifiedProduct";

    private final QmsUnqualifiedProductRepository qmsUnqualifiedProductRepository;

    public QmsUnqualifiedProductResource(QmsUnqualifiedProductRepository qmsUnqualifiedProductRepository) {
        this.qmsUnqualifiedProductRepository = qmsUnqualifiedProductRepository;
    }

    /**
     * POST  /qms-unqualified-products : Create a new qmsUnqualifiedProduct.
     *
     * @param qmsUnqualifiedProduct the qmsUnqualifiedProduct to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsUnqualifiedProduct, or with status 400 (Bad Request) if the qmsUnqualifiedProduct has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-unqualified-products")
    @Timed
    public ResponseEntity<QmsUnqualifiedProduct> createQmsUnqualifiedProduct(@Valid @RequestBody QmsUnqualifiedProduct qmsUnqualifiedProduct) throws URISyntaxException {
        log.debug("REST request to save QmsUnqualifiedProduct : {}", qmsUnqualifiedProduct);
        if (qmsUnqualifiedProduct.getId() != null) {
            throw new BadRequestAlertException("A new qmsUnqualifiedProduct cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QmsUnqualifiedProduct result = qmsUnqualifiedProductRepository.save(qmsUnqualifiedProduct);
        return ResponseEntity.created(new URI("/api/qms-unqualified-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-unqualified-products : Updates an existing qmsUnqualifiedProduct.
     *
     * @param qmsUnqualifiedProduct the qmsUnqualifiedProduct to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsUnqualifiedProduct,
     * or with status 400 (Bad Request) if the qmsUnqualifiedProduct is not valid,
     * or with status 500 (Internal Server Error) if the qmsUnqualifiedProduct couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-unqualified-products")
    @Timed
    public ResponseEntity<QmsUnqualifiedProduct> updateQmsUnqualifiedProduct(@Valid @RequestBody QmsUnqualifiedProduct qmsUnqualifiedProduct) throws URISyntaxException {
        log.debug("REST request to update QmsUnqualifiedProduct : {}", qmsUnqualifiedProduct);
        if (qmsUnqualifiedProduct.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QmsUnqualifiedProduct result = qmsUnqualifiedProductRepository.save(qmsUnqualifiedProduct);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsUnqualifiedProduct.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-unqualified-products : get all the qmsUnqualifiedProducts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsUnqualifiedProducts in body
     */
    @GetMapping("/qms-unqualified-products")
    @Timed
    public ResponseEntity<List<QmsUnqualifiedProduct>> getAllQmsUnqualifiedProducts(Pageable pageable) {
        log.debug("REST request to get a page of QmsUnqualifiedProducts");
        Page<QmsUnqualifiedProduct> page = qmsUnqualifiedProductRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-unqualified-products");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-unqualified-products/:id : get the "id" qmsUnqualifiedProduct.
     *
     * @param id the id of the qmsUnqualifiedProduct to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsUnqualifiedProduct, or with status 404 (Not Found)
     */
    @GetMapping("/qms-unqualified-products/{id}")
    @Timed
    public ResponseEntity<QmsUnqualifiedProduct> getQmsUnqualifiedProduct(@PathVariable Long id) {
        log.debug("REST request to get QmsUnqualifiedProduct : {}", id);
        Optional<QmsUnqualifiedProduct> qmsUnqualifiedProduct = qmsUnqualifiedProductRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsUnqualifiedProduct);
    }

    /**
     * DELETE  /qms-unqualified-products/:id : delete the "id" qmsUnqualifiedProduct.
     *
     * @param id the id of the qmsUnqualifiedProduct to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-unqualified-products/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsUnqualifiedProduct(@PathVariable Long id) {
        log.debug("REST request to delete QmsUnqualifiedProduct : {}", id);

        qmsUnqualifiedProductRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
