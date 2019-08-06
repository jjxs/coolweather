package cn.com.cnc.fcc.web.rest;

import cn.com.cnc.fcc.service.util.DateUtil;
import com.codahale.metrics.annotation.Timed;
import cn.com.cnc.fcc.domain.QmsProduct;
import cn.com.cnc.fcc.repository.QmsProductRepository;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing QmsProduct.
 */
@RestController
@RequestMapping("/api")
public class QmsProductResource {

    private final Logger log = LoggerFactory.getLogger(QmsProductResource.class);

    private static final String ENTITY_NAME = "qmsProduct";

    private final QmsProductRepository qmsProductRepository;
    @Resource
    private DateUtil dateUtil;

    public QmsProductResource(QmsProductRepository qmsProductRepository) {
        this.qmsProductRepository = qmsProductRepository;
    }

    /**
     * POST  /qms-products : Create a new qmsProduct.
     *
     * @param qmsProduct the qmsProduct to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsProduct, or with status 400 (Bad Request) if the qmsProduct has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-products")
    @Timed
    public ResponseEntity<QmsProduct> createQmsProduct(@Valid @RequestBody QmsProduct qmsProduct) throws URISyntaxException {
        log.debug("REST request to save QmsProduct : {}", qmsProduct);
        if (qmsProduct.getId() != null) {
            throw new BadRequestAlertException("A new qmsProduct cannot already have an ID", ENTITY_NAME, "idexists");
        }
        //如果传过来的值为null，则应该改为""
        if(qmsProduct.getCompPkid()==null){
            qmsProduct.setCompPkid("");
        }
        if(qmsProduct.getRemark()==null){
            qmsProduct.setRemark("");
        }
        if(qmsProduct.getReserveFirst()==null){
            qmsProduct.setReserveFirst("");
        }
        if(qmsProduct.getReserveSecond()==null){
            qmsProduct.setReserveSecond("");
        }
        if(qmsProduct.getReserveThird()==null){
            qmsProduct.setReserveThird("");
        }
        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 取得用户信息
        UserDetails user = (UserDetails) authentication.getPrincipal();
        qmsProduct.setMakeUser(user.getUsername());
        qmsProduct.setModifyUser(user.getUsername());
        qmsProduct.setMakeTime(dateUtil.getDBNowDate());
        qmsProduct.setModifyTime(dateUtil.getDBNowDate());
        QmsProduct result = qmsProductRepository.save(qmsProduct);
        return ResponseEntity.created(new URI("/api/qms-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /qms-products : Updates an existing qmsProduct.
     *
     * @param qmsProduct the qmsProduct to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated qmsProduct,
     * or with status 400 (Bad Request) if the qmsProduct is not valid,
     * or with status 500 (Internal Server Error) if the qmsProduct couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/qms-products")
    @Timed
    public ResponseEntity<QmsProduct> updateQmsProduct(@Valid @RequestBody QmsProduct qmsProduct) throws URISyntaxException {
        log.debug("REST request to update QmsProduct : {}", qmsProduct);
        if (qmsProduct.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 取得用户信息
        UserDetails user = (UserDetails) authentication.getPrincipal();
        qmsProduct.setModifyUser(user.getUsername());
        qmsProduct.setModifyTime(dateUtil.getDBNowDate());
        QmsProduct result = qmsProductRepository.save(qmsProduct);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsProduct.getId().toString()))
            .body(result);
    }

    /**
     * GET  /qms-products : get all the qmsProducts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsProducts in body
     */
    @GetMapping("/qms-products")
    @Timed
    public ResponseEntity<List<QmsProduct>> getAllQmsProducts(Pageable pageable) {
        log.debug("REST request to get a page of QmsProducts");
        Page<QmsProduct> page = qmsProductRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-products");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-products/:id : get the "id" qmsProduct.
     *
     * @param id the id of the qmsProduct to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsProduct, or with status 404 (Not Found)
     */
    @GetMapping("/qms-products/{id}")
    @Timed
    public ResponseEntity<QmsProduct> getQmsProduct(@PathVariable Long id) {
        log.debug("REST request to get QmsProduct : {}", id);
        Optional<QmsProduct> qmsProduct = qmsProductRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsProduct);
    }

    /**
     * DELETE  /qms-products/:id : delete the "id" qmsProduct.
     *
     * @param id the id of the qmsProduct to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-products/{id}")
    @Timed
    public ResponseEntity<Void> deleteQmsProduct(@PathVariable Long id) {
        log.debug("REST request to delete QmsProduct : {}", id);

        qmsProductRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
