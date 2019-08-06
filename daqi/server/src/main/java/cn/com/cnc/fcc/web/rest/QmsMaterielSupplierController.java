package cn.com.cnc.fcc.web.rest;

import cn.com.cnc.fcc.domain.QmsMaterielSupplier;
import cn.com.cnc.fcc.repository.QmsMaterielSupplierRepository;
import cn.com.cnc.fcc.service.QmsMaterielSupplierService;
import cn.com.cnc.fcc.service.dto.QmsMaterielSupplierDto;
import cn.com.cnc.fcc.service.util.DateUtil;
import cn.com.cnc.fcc.service.util.PageUtil;
import cn.com.cnc.fcc.web.rest.util.PaginationUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;
import javax.persistence.EntityManagerFactory;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class QmsMaterielSupplierController {
    private final Logger log = LoggerFactory.getLogger(QmsMaterielSupplierController.class);

    private static final String ENTITY_NAME = "qmsProcessController";

    private static final String dataFormat = "yyyy-MM-dd HH:mm:ss";

    private EntityManagerFactory emf;
    public QmsMaterielSupplierController(EntityManagerFactory emf) {
        this.emf = emf;
    }

    @Resource
    private DateUtil dateUtil;
    @Resource
    private PageUtil pageUtil;
    @Autowired
    private QmsMaterielSupplierService qmsMaterielSupplierService;
    @Autowired
    private QmsMaterielSupplierRepository qmsMaterielSupplierRepository;
    /**
     * GET  /qms-materiel-suppliers/search : get all the qmsMaterielSuppliers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsMaterielSuppliers in body
     */
    @GetMapping("/qms-materiel-suppliers/search")
    @Timed
    public ResponseEntity<List<QmsMaterielSupplierDto>> getAllQmsMaterielSuppliers(HttpServletRequest request, Pageable pageable) {
        log.debug("REST request to get a page of QmsMaterielSuppliers");
        String materielCd = request.getParameter("materielCd");
        String materielName = request.getParameter("materielName");
        String supplierCd = request.getParameter("supplierCd");
        String supplierName= request.getParameter("supplierName");
        List<QmsMaterielSupplierDto> qmsMaterielSupplierDtos = qmsMaterielSupplierService.qmsMaterielSupplierFindAll(materielCd, materielName, supplierCd, supplierName);
        Page<QmsMaterielSupplierDto> page = pageUtil.listToPage(qmsMaterielSupplierDtos, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-materiel-suppliers/search");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-materiel-suppliers/:id : get the "id" qmsMaterielSupplier.
     *
     * @param id the id of the qmsMaterielSupplier to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the qmsMaterielSupplier, or with status 404 (Not Found)
     */
    @GetMapping("/qms-materiel-suppliers/view/{id}")
    @Timed
    public QmsMaterielSupplierDto getQmsMaterielSupplier(@PathVariable Long id) {
        log.debug("REST request to get QmsMaterielSupplier : {}", id);
        QmsMaterielSupplierDto qmsMaterielSupplier = qmsMaterielSupplierService.findById(id);
        return qmsMaterielSupplier;
    }

    /**
     * 更新物料供应商关联信息
     *
     * @param request
     * @return JSONObject info
     */
    @GetMapping("/qms-materiel-suppliers/update")
    @Timed
    public JSONObject updateQmsMaterielSupplier(HttpServletRequest request) {
        log.debug("REST request to get UpdateQmsMaterielSupplier");
        JSONObject info = new JSONObject();
        Integer supplierId = Integer.parseInt(request.getParameter("supplierId"));
        Integer materielId = Integer.parseInt(request.getParameter("materielId"));
        Long id = Long.parseLong(request.getParameter("id"));
        String remark = request.getParameter("remark");
        Optional<QmsMaterielSupplier> check = qmsMaterielSupplierRepository.findByMaterielIdAndSupplierIdAndIdNot(materielId, supplierId, id);
        if(check.isPresent()) {
            info.put("status", "2");
        } else {
            // session取得用户信息
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // 取得用户信息
            UserDetails user = (UserDetails) authentication.getPrincipal();
            QmsMaterielSupplier qmsMaterielSupplier = qmsMaterielSupplierRepository.findById(id).get();
            qmsMaterielSupplier.setId(id);
            qmsMaterielSupplier.setMaterielId(materielId);
            qmsMaterielSupplier.setSupplierId(supplierId);
            qmsMaterielSupplier.setRemark(remark);
            qmsMaterielSupplier.setModifyUser(user.getUsername());
            qmsMaterielSupplier.setModifyTime(dateUtil.getDBNowDate());
            qmsMaterielSupplierRepository.save(qmsMaterielSupplier);
            info.put("status", "1");
        }
        return info;
    }

    /**
     * 新增物料供应商关联信息
     *
     * @param request
     * @return JSONObject info
     */
    @GetMapping("/qms-materiel-suppliers/create")
    @Timed
    public JSONObject createQmsMaterielSupplier(HttpServletRequest request) {
        log.debug("REST request to get UpdateQmsMaterielSupplier");
        JSONObject info = new JSONObject();
        Integer supplierId = Integer.parseInt(request.getParameter("supplierId"));
        Integer materielId = Integer.parseInt(request.getParameter("materielId"));
        String remark = request.getParameter("remark");
        Optional<QmsMaterielSupplier> check = qmsMaterielSupplierRepository.findByMaterielIdAndSupplierIdAndIdNot(materielId, supplierId, 0l);
        if(check.isPresent()) {
            info.put("status", "2");
        } else {
            // session取得用户信息
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            // 取得用户信息
            UserDetails user = (UserDetails) authentication.getPrincipal();
            QmsMaterielSupplier qmsMaterielSupplier = new QmsMaterielSupplier();
            qmsMaterielSupplier.setMaterielId(materielId);
            qmsMaterielSupplier.setSupplierId(supplierId);
            qmsMaterielSupplier.setFlagStatus("0");
            qmsMaterielSupplier.setRemark(remark);
            qmsMaterielSupplier.setModifyUser(user.getUsername());
            qmsMaterielSupplier.setModifyTime(dateUtil.getDBNowDate());
            qmsMaterielSupplier.setMakeUser(user.getUsername());
            qmsMaterielSupplier.setMakeTime(dateUtil.getDBNowDate());
            qmsMaterielSupplierRepository.save(qmsMaterielSupplier);
            info.put("status", "1");
        }
        return info;
    }
}
