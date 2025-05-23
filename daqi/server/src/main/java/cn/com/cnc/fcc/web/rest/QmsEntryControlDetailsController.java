package cn.com.cnc.fcc.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import cn.com.cnc.fcc.domain.QmsMaterielEntry;
import cn.com.cnc.fcc.service.util.PageUtil;
import cn.com.cnc.fcc.web.rest.util.PaginationUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import io.swagger.models.auth.In;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.codahale.metrics.annotation.Timed;

import cn.com.cnc.fcc.domain.QmsEntryControlDetails;
import cn.com.cnc.fcc.domain.QmsEntryInspectionResult;
import cn.com.cnc.fcc.domain.QmsMateriel;
import cn.com.cnc.fcc.repository.QmsEntryControlDetailsRepository;
import cn.com.cnc.fcc.repository.QmsEntryInspectionResultRepository;
import cn.com.cnc.fcc.repository.QmsMaterielEntryRepository;
import cn.com.cnc.fcc.repository.QmsMaterielRepository;
import cn.com.cnc.fcc.service.QmsEntryControlDetailsService;
import cn.com.cnc.fcc.service.dto.QmsEntryControlDetailsDTO;
import cn.com.cnc.fcc.service.util.DateUtil;
import cn.com.cnc.fcc.web.rest.errors.BadRequestAlertException;
import cn.com.cnc.fcc.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import springfox.documentation.spring.web.json.Json;

@RestController
@RequestMapping("/api")
public class QmsEntryControlDetailsController {

    private Logger log = LoggerFactory.getLogger(QmsEntryControlDetailsController.class);

    @Resource
    private DateUtil dateUtil;
    @Resource
    private PageUtil pageUtil;

    private static final String ENTITY_NAME = "qmsEntryControlDetails";
    @Autowired
    private QmsEntryControlDetailsService qmsEntryControlDetailsService;

    private final QmsEntryControlDetailsRepository qmsEntryControlDetailsRepository;
    private final QmsEntryInspectionResultRepository qmsEntryInspectionResultRepository;
    private final QmsMaterielRepository qmsMaterielRepository;
    private final QmsMaterielEntryRepository qmsMaterielEntryRepository;
    public QmsEntryControlDetailsController(QmsEntryControlDetailsRepository qmsEntryControlDetailsRepository, QmsMaterielRepository qmsMaterielRepository, QmsEntryInspectionResultRepository qmsEntryInspectionResultRepository, QmsMaterielEntryRepository qmsMaterielEntryRepository) {
        this.qmsEntryControlDetailsRepository = qmsEntryControlDetailsRepository;
        this.qmsMaterielRepository = qmsMaterielRepository;
        this.qmsEntryInspectionResultRepository = qmsEntryInspectionResultRepository;
        this.qmsMaterielEntryRepository = qmsMaterielEntryRepository;
    }

    /**
     * 入厂检验一览数据取得
     *
     * @param request
     * @param pageable
     * @return
     */
    @RequestMapping("/entry-control-detailsInfo/getAllInfos")
    public HashMap<String, Object> getAllQmsEntryControlDetails(@RequestBody HashMap<String, Object> param) {
        log.debug("REST request to get a page of QmsEntryControlDetails");

        HashMap<String, Object> data = new HashMap<String, Object>();

        // 取得所有数据
        List<QmsEntryControlDetailsDTO> page = qmsEntryControlDetailsService.selectAllInfo(param);
        if (page.size() != 0) {
            // 取得总条数
            List<QmsEntryControlDetailsDTO> countInfo = qmsEntryControlDetailsService.getAllInfoNumber(param);
            page.get(0).setNumberCount(countInfo.get(0).getNumberCount());
        }

        data.put("entryControlDtailsInfo", page);
        return data;
    }

    /**
     * 创建入厂检验数据
     *
     * @param qmsEntryControlDetails
     * @return
     * @throws URISyntaxException
     */
    @PostMapping("/entry-control-detailsInfo/createInfo")
    @Timed
    public ResponseEntity<QmsEntryControlDetails> createQmsEntryControlDetails(@Valid @RequestBody QmsEntryControlDetails qmsEntryControlDetails) throws URISyntaxException {
        log.debug("REST request to save QmsEntryControlDetails : {}", qmsEntryControlDetails);
        if (qmsEntryControlDetails.getId() != null) {
            throw new BadRequestAlertException("A new qmsEntryControlDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 取得用户信息
        UserDetails user = (UserDetails) authentication.getPrincipal();

        // 实例化结果集
        List<QmsEntryControlDetails> entryControlDetails = new ArrayList<QmsEntryControlDetails>();

        // 取得物料编码和检查项目是否有数据
        entryControlDetails = qmsEntryControlDetailsRepository.findByMaterielIdAndInspectionItemAndFlagStatus(qmsEntryControlDetails.getMaterielId(), qmsEntryControlDetails.getInspectionItem(), qmsEntryControlDetails.getFlagStatus());

        // 判断是否已存在
        if (entryControlDetails.size() != 0) {

            // 返回错误信息
            throw new BadRequestAlertException("DataAlreadyExists", ENTITY_NAME, "idexists");
        }

        // 创建人重新赋值
        qmsEntryControlDetails.setMakeUser(user.getUsername());

        // 创建时间重新赋值
        qmsEntryControlDetails.setMakeTime(dateUtil.getDBNowDate());

        // 更新人重复值
        qmsEntryControlDetails.setModifyUser(user.getUsername());

        // 更新时间重新赋值
        qmsEntryControlDetails.setModifyTime(dateUtil.getDBNowDate());

        // 是否删除标志赋值：0 未删除 、1 删除
        qmsEntryControlDetails.setFlagStatus("0");

        QmsEntryControlDetails result = qmsEntryControlDetailsRepository.save(qmsEntryControlDetails);
        return ResponseEntity.created(new URI("/api/qms-entry-control-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * 更新入厂检验数据
     *
     * @param qmsEntryControlDetails
     * @return
     * @throws URISyntaxException
     */
    @PutMapping("/entry-control-detailsInfo/updateInfo")
    @Timed
    public ResponseEntity<QmsEntryControlDetails> updateQmsEntryControlDetails(@Valid @RequestBody QmsEntryControlDetails qmsEntryControlDetails) throws URISyntaxException {
        log.debug("REST request to update QmsEntryControlDetails : {}", qmsEntryControlDetails);
        if (qmsEntryControlDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        // session取得用户信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 取得用户信息
        UserDetails user = (UserDetails) authentication.getPrincipal();
        // 实例化结果集
        List<QmsEntryControlDetails> entryControlDetails = new ArrayList<QmsEntryControlDetails>();

        // 取得物料编码和检查项目是否有数据
        entryControlDetails = qmsEntryControlDetailsRepository.findByMaterielIdAndInspectionItemAndFlagStatus(qmsEntryControlDetails.getMaterielId(), qmsEntryControlDetails.getInspectionItem(), qmsEntryControlDetails.getFlagStatus());

        if (entryControlDetails.size() != 0) {

        }
        // 更新人重复值
        qmsEntryControlDetails.setModifyUser(user.getUsername());

        // 更新时间重新赋值
        qmsEntryControlDetails.setModifyTime(dateUtil.getDBNowDate());

        // 是否删除标志赋值：0 未删除 、1 删除
        qmsEntryControlDetails.setFlagStatus("0");


        QmsEntryControlDetails result = qmsEntryControlDetailsRepository.save(qmsEntryControlDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, qmsEntryControlDetails.getId().toString()))
            .body(result);
    }

    /**
     * 入厂检验详细数据获取
     *
     * @param id
     * @return
     */
    @GetMapping("/entry-control-detailsInfo/detailInfo/{id}")
    @Timed
    public ResponseEntity<QmsEntryControlDetails> getQmsEntryControlDetails(@PathVariable Long id) {
        log.debug("REST request to get QmsEntryControlDetails : {}", id);
        Optional<QmsEntryControlDetails> qmsEntryControlDetails = qmsEntryControlDetailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qmsEntryControlDetails);
    }

    /**
     * 入厂检验数据删除
     *
     * @param id
     * @return
     */
    @PostMapping("/entry-control-detailsInfo/deleteInfo")
    @Timed
    public Integer deleteQmsEntryControlDetails(@RequestBody Long id) {

        log.debug("REST request to delete QmsEntryControlDetails : {}", id);
        Integer resultInfo = 0;
        // 实例化结果集
        List<QmsEntryInspectionResult> qmsEntryInspectionResult = new ArrayList<QmsEntryInspectionResult>();
        try {
            // 取得采购检验结果表中是否有
            qmsEntryInspectionResult = qmsEntryInspectionResultRepository.findByIdAndFlagStatus(id, "0");
            // 判断是够可以删除
            if (qmsEntryInspectionResult.size() == 0) {
                qmsEntryControlDetailsRepository.deleteById(id);
            } else {
                // 返回错误信息
                resultInfo = 1;
            }
        } catch (Exception e) {
            resultInfo = 2;
        }


        return resultInfo;
    }

    /**
     * 取得物料名称
     *
     * @param id
     * @return
     */
    @GetMapping("/entry-control-detailsInfo/materielName/{materielCd}")
    @Timed
    public ResponseEntity<QmsMateriel> getQmsMateriel(@PathVariable String materielCd) {
        log.debug("REST request to get QmsMateriel : {}", materielCd);
        // 取得物料信息
        List<QmsMateriel> qmsMaterielList = qmsMaterielRepository.findByIdAndFlagStatus(Long.valueOf(materielCd), "0");
        // 实例化结果集
        QmsMateriel qmsMaterielInfo = new QmsMateriel();
        // 判断是否物料信息
        if (qmsMaterielList.size() != 0) {
            // 赋值
            qmsMaterielInfo = qmsMaterielList.get(0);
        }
        // 赋值
        Optional<QmsMateriel> qmsMateriel = Optional.ofNullable(qmsMaterielInfo);
        // 返回
        return ResponseUtil.wrapOrNotFound(qmsMateriel);
    }

    /**
     * 获取上传文件
     *
     * @param logo
     * @param request
     * @return
     */
    @RequestMapping("/entry-control-detailsInfo/upload")
    public JSONObject upload(@RequestPart MultipartFile files) {
        // 返回值设置
        JSONObject returnData = new JSONObject();

        returnData = qmsEntryControlDetailsService.uploadUserDepart(files);

        // 返回导入结果
        return returnData;
    }

    /**
     * GET  /qms-entry-control-details/search : get all the qmsEntryControlDetails.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsEntryControlDetails in body
     * @author DL0777
     */
    @GetMapping("/qms-entry-control-details/search")
    @Timed
    public List<QmsEntryControlDetails> getAllQmsEntryControlDetailsList(HttpServletRequest request, Pageable pageable) {
        log.debug("REST request to get a page of QmsEntryControlDetails");
        Integer id = Integer.parseInt(request.getParameter("materielId"));
        List<QmsEntryControlDetails> qmsEntryControlDetails = qmsEntryControlDetailsRepository.findAllByMaterielIdAndFlagStatusAndIsValidOrderByItemNumber(id, "0", "1");
        return qmsEntryControlDetails;
    }
    /**
     * POST  /qms-entry-control-details : Create a new qmsEntryControlDetails.
     *
     * @param body the qmsEntryControlDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new qmsEntryControlDetails, or with status 400 (Bad Request) if the qmsEntryControlDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/qms-entry-control-details/add")
    @Timed
    public JSONObject createQmsEntryControlDetails(@RequestBody JSONObject body) throws URISyntaxException {
        log.debug("REST request to save QmsEntryControlDetails : {} qmsEntryControlDetails");
        JSONObject result = new JSONObject();
        try {
            Integer materielId = body.getInteger("materielId");
            JSONArray addList = body.getJSONArray("qmsEntryControlDetails");
            JSONArray deleteList = body.getJSONArray("dQmsEntryControlDetails");
            if(deleteList.size()>0) {
                for (int i = 0; i < deleteList.size(); i++) {
                    JSONObject deleteObj = deleteList.getJSONObject(i);
                    Optional<QmsEntryControlDetails> deleteQmsEntryControlDetails = qmsEntryControlDetailsRepository.findById(deleteObj.getLong("id"));
                    if (deleteQmsEntryControlDetails.isPresent()) {
                        QmsEntryControlDetails qmsEntryControlDetails = deleteQmsEntryControlDetails.get();
                        if(qmsEntryControlDetails.getIsUse().equals("0")) {
                            qmsEntryControlDetailsRepository.deleteById(deleteQmsEntryControlDetails.get().getId());
                        } else if(qmsEntryControlDetails.getIsUse().equals("1")) {
                            qmsEntryControlDetails.setIsValid("0");
                            qmsEntryControlDetails.setLoseTime(dateUtil.getDBNowDate());
                            qmsEntryControlDetailsRepository.save(qmsEntryControlDetails);
                        }
                    }
                }
            }
            if (addList.size() > 0) {
                // session取得用户信息
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                // 取得用户信息
                UserDetails user = (UserDetails) authentication.getPrincipal();
                for (int i = 0; i < addList.size(); i++) {
                    JSONObject addObj = addList.getJSONObject(i);
                    if(addObj.get("id") != null) {
                        System.out.println(addObj.getLong("id"));
                        // 更新
                        QmsEntryControlDetails qmsEntryControlDetails = qmsEntryControlDetailsRepository.findById(addObj.getLong("id")).get();
                        if (qmsEntryControlDetails.getIsUse().equals("0")){
                            qmsEntryControlDetails.setMaterielId(materielId);
                            qmsEntryControlDetails.setInspectionItem(addObj.getString("inspectionItem"));
                            qmsEntryControlDetails.setTechnicalRequirement(addObj.getString("technicalRequirement"));
                            qmsEntryControlDetails.setInspectionInstrument(addObj.getString("inspectionInstrument"));
                            qmsEntryControlDetails.setStandard(addObj.getDouble("standard"));
                            qmsEntryControlDetails.setUpperDeviation(addObj.getDouble("upperDeviation"));
                            qmsEntryControlDetails.setLowerDeviation(addObj.getDouble("lowerDeviation"));
                            qmsEntryControlDetails.setInspectionResultDiff(addObj.getString("inspectionResultDiff"));
                            qmsEntryControlDetails.setFlagStatus("0");
                            qmsEntryControlDetails.setItemNumber(i);
                            qmsEntryControlDetails.setModifyUser(user.getUsername());
                            qmsEntryControlDetails.setModifyTime(dateUtil.getDBNowDate());
                            qmsEntryControlDetailsRepository.save(qmsEntryControlDetails);
                        } else if (qmsEntryControlDetails.getIsUse().equals("1")) {
                            qmsEntryControlDetails.setIsValid("0");
                            qmsEntryControlDetails.setLoseTime(dateUtil.getDBNowDate());
                            qmsEntryControlDetailsRepository.save(qmsEntryControlDetails);
                            QmsEntryControlDetails qmsEntryControlDetailsNew = new QmsEntryControlDetails();
                            qmsEntryControlDetailsNew.setMaterielId(materielId);
                            qmsEntryControlDetailsNew.setInspectionItem(addObj.getString("inspectionItem"));
                            qmsEntryControlDetailsNew.setTechnicalRequirement(addObj.getString("technicalRequirement"));
                            qmsEntryControlDetailsNew.setInspectionInstrument(addObj.getString("inspectionInstrument"));
                            qmsEntryControlDetailsNew.setStandard(addObj.getDouble("standard"));
                            qmsEntryControlDetailsNew.setUpperDeviation(addObj.getDouble("upperDeviation"));
                            qmsEntryControlDetailsNew.setLowerDeviation(addObj.getDouble("lowerDeviation"));
                            qmsEntryControlDetailsNew.setInspectionResultDiff(addObj.getString("inspectionResultDiff"));
                            qmsEntryControlDetailsNew.setIsValid("1");
                            qmsEntryControlDetailsNew.setIsUse("0");
                            qmsEntryControlDetailsNew.setFlagStatus("0");
                            qmsEntryControlDetailsNew.setItemNumber(i);
                            qmsEntryControlDetailsNew.setMakeUser(user.getUsername());
                            qmsEntryControlDetailsNew.setModifyUser(user.getUsername());
                            qmsEntryControlDetailsNew.setMakeTime(dateUtil.getDBNowDate());
                            qmsEntryControlDetailsNew.setModifyTime(dateUtil.getDBNowDate());
                            qmsEntryControlDetailsRepository.save(qmsEntryControlDetailsNew);
                        }
                    } else {
                        // 新增
                        QmsEntryControlDetails qmsEntryControlDetails = new QmsEntryControlDetails();
                        qmsEntryControlDetails.setMaterielId(materielId);
                        qmsEntryControlDetails.setInspectionItem(addObj.getString("inspectionItem"));
                        qmsEntryControlDetails.setTechnicalRequirement(addObj.getString("technicalRequirement"));
                        qmsEntryControlDetails.setInspectionInstrument(addObj.getString("inspectionInstrument"));
                        qmsEntryControlDetails.setStandard(addObj.getDouble("standard"));
                        qmsEntryControlDetails.setUpperDeviation(addObj.getDouble("upperDeviation"));
                        qmsEntryControlDetails.setLowerDeviation(addObj.getDouble("lowerDeviation"));
                        qmsEntryControlDetails.setInspectionResultDiff(addObj.getString("inspectionResultDiff"));
                        qmsEntryControlDetails.setIsValid("1");
                        qmsEntryControlDetails.setIsUse("0");
                        qmsEntryControlDetails.setFlagStatus("0");
                        qmsEntryControlDetails.setItemNumber(i);
                        qmsEntryControlDetails.setMakeUser(user.getUsername());
                        qmsEntryControlDetails.setModifyUser(user.getUsername());
                        qmsEntryControlDetails.setMakeTime(dateUtil.getDBNowDate());
                        qmsEntryControlDetails.setModifyTime(dateUtil.getDBNowDate());
                        qmsEntryControlDetailsRepository.save(qmsEntryControlDetails);
                    }
                }
            }
            result.put("status", "1");
        } catch (Exception e) {
            System.out.println(e);
            result.put("status", "2");
        } finally {
            return result;
        }
    }


    /**
     * 获取上传文件
     *
     * @param logo
     * @param request
     * @return
     */
    @RequestMapping("/qms-entry-control-details/upload")
    public JSONObject uploadInfo(@RequestPart MultipartFile files){
        // 返回值设置
        JSONObject returnData = new JSONObject();

        returnData = qmsEntryControlDetailsService.uploadData(files);

        return returnData;
    }

    /**
     * GET  /qms-entry-control-details/deleteCheck : get deleteStatus.
     * 删除数据检验
     * @return the status in body
     * @author DL0777
     */
    @GetMapping("/qms-entry-control-details/deleteCheck")
    @Timed
    public JSONObject getDeleteStatus(HttpServletRequest request) {
        log.debug("REST request to get a deleteStatus");
        JSONObject info = new JSONObject();
        List<QmsMaterielEntry> qmsMaterielEntry = new ArrayList<QmsMaterielEntry>();
        if (request.getParameter("materielId") != null) {
            Integer id = Integer.parseInt(request.getParameter("materielId"));
            qmsMaterielEntry = qmsMaterielEntryRepository.findByMaterielIdAndFlagStatus(id, "0");
            if(qmsMaterielEntry.size()>0) {
                for(int i = 0; i < qmsMaterielEntry.size(); i ++) {
                    if (qmsMaterielEntry.get(i).getInspectionUserId() != null) {
                        info.put("status", "2");
                        return info;
                    } else {
                        info.put("status", "1");
                    }
                }
            } else {
                info.put("status", "1");
            }
        }
        return info;
    }
}
