package cn.com.cnc.fcc.web.rest;

import cn.com.cnc.fcc.domain.*;
import cn.com.cnc.fcc.repository.*;
import cn.com.cnc.fcc.service.QmsQualityControlDetailsService;
import cn.com.cnc.fcc.service.dto.ProductProcessCheckDTO;
import cn.com.cnc.fcc.service.dto.QmsPartsAssemblyRelationDto;
import cn.com.cnc.fcc.service.dto.QmsQualityControlDetailsDto;
import cn.com.cnc.fcc.service.util.DateUtil;
import cn.com.cnc.fcc.service.util.PageUtil;
import cn.com.cnc.fcc.web.rest.util.PaginationUtil;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.codahale.metrics.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing QmsQualityControlDetails.
 */
@RestController
@RequestMapping("/api")
public class QmsQualityControlDetailsController {

    private final Logger log = LoggerFactory.getLogger(QmsQualityControlDetailsController.class);

    private static final String ENTITY_NAME = "qmsQualityControlDetails";

    @Resource
    private QmsEnclosureRepository qmsEnclosureRepository;
    @Resource
    private QmsQualityControlDetailsService qmsQualityControlDetailsService;

    @Resource
    private PageUtil pageUtil;

    private final QmsProductionInspectionResultRepository qmsProductionInspectionResultRepository;

    private final RbacUserRepository rbacUserRepository;

    @Resource
    private QmsProductionInspectionValueRepository qmsProductionInspectionValueRepository;
    @Resource
    private DateUtil dateUtil;

    public QmsQualityControlDetailsController(QmsProductionInspectionResultRepository qmsProductionInspectionResultRepository,
                                              RbacUserRepository rbacUserRepository) {
        this.rbacUserRepository = rbacUserRepository;
        this.qmsProductionInspectionResultRepository = qmsProductionInspectionResultRepository;
    }

    /**
     * DL0769
     * 通过工艺id获取结果表数据
     *
     * @param
     * @return
     */
    @GetMapping("/productProcessSelfCheck/control_details")
    @Timed
    @SuppressWarnings("unchecked")
    public List<QmsQualityControlDetailsDto> findQmsQualityControlDetailsByTechId(HttpServletRequest request){

        //得到传过来的值
        String pid = request.getParameter("pid");
        // 是否是查看画面
        String isDetails = request.getParameter("isDetails");

        List<QmsQualityControlDetailsDto> result = qmsQualityControlDetailsService.findByBomTechnologyId(Integer.valueOf(pid), isDetails);

        // session取得用户信息
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        // 取得用户信息
//        UserDetails user = (UserDetails) authentication.getPrincipal();
//        List<RbacUser> userList = rbacUserRepository.findByUserCode(user.getUsername());

//        if (result.size()>0) {
//            result.get(0).setMakeUser(userList.get(0).getUserName());
//        }
        return result;
    }

    /**
     * DL0769
     * 通过工艺id获取结果表数据
     *
     * @param
     * @return
     */
    @GetMapping("/productProcessSelfCheck/assembly_relation")
    @Timed
    @SuppressWarnings("unchecked")
    public List<QmsPartsAssemblyRelationDto> findAssemblyRelationByTechId(HttpServletRequest request){

        //得到传过来的值
        String pid = request.getParameter("pid");

        List<QmsPartsAssemblyRelationDto> result = qmsQualityControlDetailsService.findAssemblyRelationByPid(Integer.valueOf(pid));

//        // session取得用户信息
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        // 取得用户信息
//        UserDetails user = (UserDetails) authentication.getPrincipal();
//
//        if (result.size()>0) {
//            result.get(0).setMakeUser(user.getUsername());
//        }
        return result;
    }

    /**
     * DL0769
     * 新增生产检验项点结果表
     *
     * @param
     * @return
     */
    @PostMapping("/productProcessSelfCheck/createQmsProductionInspectionResult")
    @Timed
    @SuppressWarnings("unchecked")
    public JSONObject createQmsProductionInspectionResult(@RequestBody JSONObject jsonObject){
        JSONObject returnData = new JSONObject();

        String code = qmsQualityControlDetailsService.checkProductionRelation(jsonObject);

        returnData.put("result", code);
        return returnData;
    }

    /**
     * DL0769
     * 更新生产检验项结果表
     * @param
     * @return
     */
    @PostMapping("/productProcessSelfCheck/updateQmsProductionInspectionValues")
    @Timed
    @SuppressWarnings("unchecked")
    public JSONObject updateQmsProductionInspectionValues(@RequestBody JSONObject jsonObject){
        JSONObject returnData = new JSONObject();

        // 生产检验Id
        String inspectionId = jsonObject.getString("inspectionId");
        // 合格区分
        String isOk = jsonObject.getString("isOk");
        // 互检专区
        String inspectionDiff = jsonObject.getString("inspectionDiff");
        // 检验编号
        String checkNumber = jsonObject.getString("checkNumber");

        String result = qmsQualityControlDetailsService.updateQmsProductionInspectionValues(inspectionId, checkNumber, isOk, inspectionDiff);
        returnData.put("result", result);
        return returnData;
    }

    /**
     * DL0769
     * 编辑区分
     * @param
     * @return
     */
    @GetMapping("/productProcessSelfCheck/editDistinguish")
    @Timed
    @SuppressWarnings("unchecked")
    public JSONObject editDistinguish(HttpServletRequest request){
        JSONObject returnData = new JSONObject();
        // 1 新规标识
        returnData.put("code", 1);

        // 生产检验Id
        String inspectionId = request.getParameter("inspectionId");
        // 互检专区
        String inspectionDiff = request.getParameter("inspectionDiff");

        Optional<QmsProductionInspectionValue> qmsProductionInspectionValue= qmsProductionInspectionValueRepository.findByInspectionIdAndInspectionDiff(Integer.valueOf(inspectionId), inspectionDiff);

        // 0 更新标识
        if (qmsProductionInspectionValue.isPresent()) {
            returnData.put("code", 0);
        }
        return returnData;
    }


    /**
     * DL0769
     * 检验装配物料的输入数据是否正确
     * @param
     * @return
     */
    @PostMapping("/productProcessSelfCheck/checkProductionRelation")
    @Timed
    @SuppressWarnings("unchecked")
    public JSONObject checkProductionRelation(@RequestBody JSONObject jsonObject){
        JSONObject returnData = new JSONObject();

        String result = qmsQualityControlDetailsService.checkProductionRelation(jsonObject);
        returnData.put("result", result);
        return returnData;
    }

    /**
     * DL0769
     * 新增生产检验装配关系表
     * @param
     * @return
     */
    @PostMapping("/productProcessSelfCheck/saveAll")
    @Timed
    @SuppressWarnings("unchecked")
    public JSONObject saveAll(@RequestBody JSONObject jsonObject){

        JSONObject result = qmsQualityControlDetailsService.saveAll(jsonObject);
        return result;
    }

    /**
     * DL0769
     * 获取文件列表
     * @param
     * @return
     */
    @GetMapping("/productProcessSelfCheck/obtainFile")
    @Timed
    @SuppressWarnings("unchecked")
    public List<QmsEnclosure> saveAll(HttpServletRequest request){
        // 生产检验表Id
        String qmsProductionInspectionId = request.getParameter("qmsProductionInspectionId");
        List<QmsEnclosure> enclosureList = new ArrayList<>();

        Optional<QmsProductionInspectionValue> valueOptional = qmsProductionInspectionValueRepository.findByInspectionIdAndInspectionDiff(Integer.valueOf(qmsProductionInspectionId), "C");
        if (valueOptional.isPresent()) {
            enclosureList = qmsEnclosureRepository.findAllByInspectionInfoIdAndInspectionKbn(Integer.valueOf(valueOptional.get().getId().toString()), "2");
        }

        return enclosureList;
    }

    /**
     * 生产检验任务自检一览
     *
     * @param pageable
     * @return
     */
    @GetMapping("/productProcessSelfCheck/productProcessSelfFindAll")
    @Timed
    public ResponseEntity<List<ProductProcessCheckDTO>> getAllQmsSelfProcess(HttpServletRequest request, Pageable pageable) {

        // 取得一览数据
        List<ProductProcessCheckDTO> productProcessCheck = qmsQualityControlDetailsService.qmsProductProcessSelfFindAll(request);

        Page<ProductProcessCheckDTO> page = pageUtil.listToPage(productProcessCheck, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/productProcessSelfCheck/productProcessSelfFindAll");

        // 返回值
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * 删除生产检验数据
     * DL0769
     * @return
     */
    @GetMapping("/productProcessSelfCheck/deleteAll")
    @Timed
    public JSONObject deleteAll(HttpServletRequest request) {
        JSONObject result = new JSONObject();

        // 生产检验ID
        String pid = request.getParameter("pid");

        // 取得一览数据
        String code = qmsQualityControlDetailsService.deleteAll(pid);

        result.put("code", code);
        // 返回值
        return result;
    }

    /**
     * DL0769
     * 检验上工序是否合格
     *
     * @param
     */
    @PostMapping ("/productProcessSelfCheck/chackPreProcess")
    @Timed
    @SuppressWarnings("unchecked")
        public JSONObject chackPreProcess(@RequestBody JSONObject jsonObject){

        // 返回0查验成功，返回1检验失败
        JSONObject result = qmsQualityControlDetailsService.chackPreProcess(jsonObject);
        return result;
    }

    @GetMapping("/productProcessSelfCheck/{id}")
    @Timed
    public ResponseEntity<ProductProcessCheckDTO> getQmsProductionInspection(@PathVariable Long id) {
        log.debug("REST request to get QmsProductionInspection : {}", id);
        ProductProcessCheckDTO qmsProductionInspection = qmsQualityControlDetailsService.findById(id);
        Optional<QmsProductionInspectionValue> qmsProductionInspectionValueOptional =  qmsProductionInspectionValueRepository.findByInspectionIdAndInspectionDiff(Integer.valueOf(id.toString()), "C");

        qmsProductionInspection.setCheckNumber(null);

        if (qmsProductionInspectionValueOptional.isPresent()) {
            qmsProductionInspection.setCheckNumber(qmsProductionInspectionValueOptional.get().getCheckNumber());
        }
        return ResponseEntity.ok().body(qmsProductionInspection);
    }

    @GetMapping("/productProcessSelfCheck/deleteCheck")
    @Timed
    public JSONObject deleteCheck(HttpServletRequest request) {
        JSONObject result = new JSONObject();
        String pid = request.getParameter("pid");
        String code = qmsQualityControlDetailsService.deleteCheck(pid);
        result.put("code", code);
        return result;
    }
}
