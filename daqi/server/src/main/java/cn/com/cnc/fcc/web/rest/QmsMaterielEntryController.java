package cn.com.cnc.fcc.web.rest;

import cn.com.cnc.fcc.domain.*;
import cn.com.cnc.fcc.repository.*;
import cn.com.cnc.fcc.service.QmsMaterielEntryService;
import cn.com.cnc.fcc.service.dto.QmsMaterielEntryDto;
import cn.com.cnc.fcc.service.util.DateUtil;
import cn.com.cnc.fcc.service.util.PageUtil;
import cn.com.cnc.fcc.web.rest.errors.BadRequestAlertException;
import cn.com.cnc.fcc.web.rest.util.HeaderUtil;
import cn.com.cnc.fcc.web.rest.util.PaginationUtil;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing QmsMaterielEntry.
 */
@RestController
@RequestMapping("/api")
public class QmsMaterielEntryController {

    private final Logger log = LoggerFactory.getLogger(QmsMaterielEntryController.class);

    private static final String ENTITY_NAME = "qmsMaterielEntry";
    @Resource
    private PageUtil pageUtil;
    @Resource
    private DateUtil dateUtil;
    private final QmsMaterielEntryRepository qmsMaterielEntryRepository;
    private final QmsMaterielDetailsRepository qmsMaterielDetailsRepository;
    private final QmsEnclosureRepository qmsEnclosureRepository;
    private final QmsMaterielEntryService qmsMaterielEntryService;
    private final RbacUserRightRelationRepository rbacUserRightRelationRepository;
    private final RbacRoleRepository rbacRoleRepository;
    public QmsMaterielEntryController(QmsMaterielEntryRepository qmsMaterielEntryRepository, QmsMaterielEntryService qmsMaterielEntryService, QmsMaterielDetailsRepository qmsMaterielDetailsRepository, QmsEnclosureRepository qmsEnclosureRepository, RbacUserRightRelationRepository rbacUserRightRelationRepository, RbacRoleRepository rbacRoleRepository) {
        this.qmsMaterielEntryRepository = qmsMaterielEntryRepository;
        this.qmsMaterielEntryService = qmsMaterielEntryService;
        this.qmsMaterielDetailsRepository = qmsMaterielDetailsRepository;
        this.qmsEnclosureRepository = qmsEnclosureRepository;
        this.rbacUserRightRelationRepository = rbacUserRightRelationRepository;
        this.rbacRoleRepository = rbacRoleRepository;
    }

    /**
     * GET  /qms-materiel-entries : get all the qmsMaterielEntries.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsMaterielEntries in body
     */
    @GetMapping("/qms-materiel-entries/search")
    @Timed
    public ResponseEntity<List<QmsMaterielEntryDto>> getAllQmsMaterielEntries(HttpServletRequest request, Pageable pageable) {
        log.debug("REST request to get a page of QmsMaterielEntries");
//        qmsMaterielEntryService.qmsMaterielFindAll();
        String materielCd = request.getParameter("materielCd");
        String materielName = request.getParameter("materielName");
        String figureNumber = request.getParameter("figureNumber");
        String supplierCd = request.getParameter("supplierCd");
        String supplierName = request.getParameter("supplierName");
        String specificationType = request.getParameter("specificationType");
        String purchaseOrderNumber = request.getParameter("purchaseOrderNumber");
        String flagInspect = request.getParameter("flagInspect");
        String enclosure = request.getParameter("enclosure");
        List<QmsMaterielEntryDto> qmsMaterielEntryDtos = qmsMaterielEntryService.qmsMaterielEntryFindAll(materielCd, materielName, figureNumber, supplierCd, supplierName, specificationType, purchaseOrderNumber, flagInspect, enclosure);
        Page<QmsMaterielEntryDto> page = pageUtil.listToPage(qmsMaterielEntryDtos, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-materiel-entries/search");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

//    /**
//     * GET  /qms-materiel-entries/:id : get the "id" qmsMaterielEntry.
//     *
//     * @param id the id of the qmsMaterielEntry to retrieve
//     * @return the ResponseEntity with status 200 (OK) and with body the qmsMaterielEntry, or with status 404 (Not Found)
//     */
//    @GetMapping("/qms-materiel-entries/{id}")
//    @Timed
//    public ResponseEntity<QmsMaterielEntry> getQmsMaterielEntry(@PathVariable Long id) {
//        log.debug("REST request to get QmsMaterielEntry : {}", id);
//        Optional<QmsMaterielEntry> qmsMaterielEntry = qmsMaterielEntryRepository.findById(id);
//        return ResponseUtil.wrapOrNotFound(qmsMaterielEntry);
//    }
//
//    /**
//     * DELETE  /qms-materiel-entries/:id : delete the "id" qmsMaterielEntry.
//     *
//     * @param id the id of the qmsMaterielEntry to delete
//     * @return the ResponseEntity with status 200 (OK)
//     */
//    @DeleteMapping("/qms-materiel-entries/{id}")
//    @Timed
//    public ResponseEntity<Void> deleteQmsMaterielEntry(@PathVariable Long id) {
//        log.debug("REST request to delete QmsMaterielEntry : {}", id);
//
//        qmsMaterielEntryRepository.deleteById(id);
//        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
//    }


    /**
     * GET  /qms-materiel-entries/deletFlag : get all the qmsMaterielEntries.
     *
     * @param request the HttpRequest
     * @return the ResponseEntity with status 200 (OK) and the list of qmsMaterielEntries in body
     */
    @GetMapping("/qms-materiel-entries/deletFlag")
    @Timed
    public JSONObject getDeleteCheck(HttpServletRequest request) {
        log.debug("REST request to get a page of QmsMaterielEntries");
        JSONObject info = new JSONObject();
        Long id = Long.parseLong(request.getParameter("id"));
        Optional<QmsMaterielEntry> qmsMaterielEntryDto = qmsMaterielEntryRepository.findById(id);
        if(qmsMaterielEntryDto.isPresent()) {
            QmsMaterielEntry qmsMaterielEntry = qmsMaterielEntryDto.get();
            if (qmsMaterielEntry.getInspectionUserId() == null) {
                info.put("status", "1");
            } else {
                info.put("status", "2");
            }
        } else {
            info.put("status", "3");
        }
        return info;
    }

    /**
     * DELETE  /qms-materiel-entries/:id/delete : delete the "id" qmsMaterielEntry.
     *
     * @param id the id of the qmsMaterielEntry to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/qms-materiel-entries/{id}/delete")
    @Timed
    public ResponseEntity<Void> deleteQmsMaterielEntry(@PathVariable Long id) {
        log.debug("REST request to delete QmsMaterielEntry : {}", id);
        qmsMaterielDetailsRepository.deleteByEntryId(id.intValue());
        qmsMaterielEntryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * 获取上传文件
     *
     * @param logo
     * @param request
     * @return
     */
    @RequestMapping("/qms-materiel-entries/upload")
    public JSONObject uploadInfo(@RequestPart MultipartFile files){
        // 返回值设置
        JSONObject returnData = new JSONObject();

        returnData = qmsMaterielEntryService.uploadData(files);

        return returnData;
    }
    /**
     * GET  /qms-materiel-entries : get all the qmsMaterielEntries.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsMaterielEntries in body
     */
    @GetMapping("/qms-materiel-entries/editHeaderSearch")
    @Timed
    public JSONObject getEditLoad(HttpServletRequest request, Pageable pageable) {
        log.debug("REST request to get a page of QmsMaterielEntries");
        JSONObject info = new JSONObject();
        String id = request.getParameter("id");
        info = qmsMaterielEntryService.getEditHeader(id);
        return info;
    }

    /**
     * GET  /qms-materiel-entries : get all the qmsMaterielEntries.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsMaterielEntries in body
     */
    @GetMapping("/qms-materiel-entries/editDetailsSearch")
    @Timed
    public List<QmsMaterielDetails> getDetailsLoad(HttpServletRequest request, Pageable pageable) {
        log.debug("REST request to get a page of QmsMaterielEntries");
        String id = request.getParameter("id");
        List<QmsMaterielDetails> qmsMaterielDetails = qmsMaterielDetailsRepository.findAllByEntryIdAndFlagStatus(Integer.parseInt(id), "0");
        return qmsMaterielDetails;
    }

    /**
     * GET  /qms-materiel-entries : get all the qmsMaterielEntries.
     *
     * @param request the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsMaterielEntries in body
     */
    @GetMapping("/qms-materiel-entries/enclosureLoad")
    @Timed
    public List<QmsEnclosure> getEnclosureLoad(HttpServletRequest request) {
        log.debug("REST request to get a page of QmsMaterielEntries");
        String id = request.getParameter("id");
        List<QmsEnclosure> qmsEnclosures = qmsEnclosureRepository.findAllByInspectionInfoIdAndInspectionKbn(Integer.parseInt(id), "1");
        return qmsEnclosures;
    }

    /**
     * POST  /qms-entry-control-details : Create a new qmsEntryControlDetails.
     *
     * @param body the qmsEntryControlDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsEntryControlDetails, or with status 400 (Bad Request) if the qmsEntryControlDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-materiel-entries/add")
    @Timed
    public JSONObject createQmsEntryControlDetails(@RequestBody  JSONObject body) throws URISyntaxException {
        log.debug("REST request to save QmsEntryControlDetails : {} qmsEntryControlDetails");
        JSONObject result = new JSONObject();
        result.put("status", "1");
        try {
            result.put("status", "1");
            result = qmsMaterielEntryService.saveData(body);
        } catch (Exception e) {
            System.out.println(e);
            result.put("status", "2");
        } finally {
            return result;
        }
    }

    /**
     * POST  /qms-materiel-entries/send : Create a new qmsEntryControlDetails.
     *
     * @param request the qmsEntryControlDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsEntryControlDetails, or with status 400 (Bad Request) if the qmsEntryControlDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @GetMapping("/qms-materiel-entries/send")
    @Timed
    public JSONObject createQmsMaterielEntrySend(HttpServletRequest request) throws URISyntaxException {
        log.debug("REST request to save QmsEntryControlDetails : {} qmsEntryControlDetails");
        JSONObject result = new JSONObject();
        String id  = request.getParameter("id");
        String userId  = request.getParameter("userId");
        String userName = request.getParameter("userName");
        result.put("status", "1");
        try {
            Optional<QmsMaterielEntry> qmsMaterielEntry = qmsMaterielEntryRepository.findById(Long.parseLong(id));
            if(qmsMaterielEntry.isPresent()) {
                QmsMaterielEntry qmsMaterielEntryUpdate = qmsMaterielEntry.get();
                qmsMaterielEntryUpdate.setInspectionUserId(Integer.parseInt(userId));
                qmsMaterielEntryUpdate.setInspectionTime(dateUtil.getDBNowDate());
                qmsMaterielEntryRepository.save(qmsMaterielEntryUpdate);
            }
            QmsNotice qmsNotice = new QmsNotice();
            qmsNotice.setNoticeType("0");
            Optional<RbacUserRightRelation> rbacUserRightRelation = rbacUserRightRelationRepository.findByUserId(Integer.parseInt(userId));
            RbacUserRightRelation rbacUserRightRelationSearch;
            if(rbacUserRightRelation.isPresent()) {
                rbacUserRightRelationSearch = rbacUserRightRelation.get();
                Optional<RbacRole> rbacRole = rbacRoleRepository.findById(rbacUserRightRelationSearch.getRoleId().longValue());
                if(rbacRole.isPresent()) {
                    RbacRole rbacRoleSearch = rbacRole.get();
                    qmsNotice.setNoticeRole(rbacRoleSearch.getRoleName());
                }
            }
            qmsNotice.setNoticeUser(userName);
            qmsNotice.setNoticeInfo("");
            qmsNotice.setReserveFirst("入场报检");
        } catch (Exception e) {
            System.out.println(e);
            result.put("status", "2");
        } finally {
            return result;
        }
    }
}
