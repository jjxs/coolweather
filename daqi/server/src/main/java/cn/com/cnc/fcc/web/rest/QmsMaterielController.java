package cn.com.cnc.fcc.web.rest;

import cn.com.cnc.fcc.domain.*;
import cn.com.cnc.fcc.repository.*;
import cn.com.cnc.fcc.service.QmsMaterielService;
import cn.com.cnc.fcc.service.dto.LableValueDto;
import cn.com.cnc.fcc.service.dto.MaterielPopDto;
import cn.com.cnc.fcc.service.util.DateUtil;
import cn.com.cnc.fcc.service.util.PageUtil;
import cn.com.cnc.fcc.service.util.RandomUtil;
import cn.com.cnc.fcc.web.rest.errors.InternalServerErrorException;
import cn.com.cnc.fcc.web.rest.util.PaginationUtil;
import com.alibaba.fastjson.JSONObject;
import com.codahale.metrics.annotation.Timed;
import org.hibernate.transform.ResultTransformer;
import org.hibernate.transform.Transformers;
import org.hibernate.type.StandardBasicTypes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class QmsMaterielController {
    private final Logger log = LoggerFactory.getLogger(QmsMaterielController.class);

    private static final String ENTITY_NAME = "qmsProcessController";

    private static final String dataFormat = "yyyy-MM-dd HH:mm:ss";

    private EntityManagerFactory emf;
    public QmsMaterielController(EntityManagerFactory emf) {
        this.emf = emf;
    }

    @Resource
    private DateUtil dateUtil;
    @Resource
    private PageUtil pageUtil;
    @Autowired
    private QmsMaterielService qmsMaterielService;
    @Autowired
    private QmsMaterielRepository qmsMaterielRepository;
    @Autowired
    private QmsSupplierRepository qmsSupplierRepository;
    @Autowired
    private QmsMaterielDetailsRepository qmsMaterielDetailsRepository;
    @Autowired
    private QmsPartsAssemblyRelationRepository qmsPartsAssemblyRelationRepository;
    @Autowired
    private QmsMaterielSupplierRepository qmsMaterielSupplierRepository;
    @Autowired
    private QmsUnitRepository qmsUnitRepository;
    @Autowired
    private RbacRoleRepository rbacRoleRepository;
    @Autowired
    private QmsMaterielTypeRepository qmsMaterielTypeRepository;
    /**
     * 物料信息
     *
     * @param pageable
     * @return
     */
    @GetMapping("/qms-materiels/index")
    @Timed
    public ResponseEntity<List<QmsMateriel>> getAllQmsMateriel(HttpServletRequest request, Pageable pageable) {

        log.debug("REST request to get a page of getAllQmsMateriel");
        // 模糊查询物料编码
        String bianMa = request.getParameter("bianMa");
        // 模糊查询物料名称
        String gongName = request.getParameter("gongName");
        // 模糊查询图号名称
        String tuhao = request.getParameter("tuhao");
        // 模糊查询规格名称
        String guige = request.getParameter("guige");
        // 模糊查询生产方式
        String shengValue = request.getParameter("shengValue");
        // 模糊查询物料属性
        String shuxingValue = request.getParameter("shuxingValue");
        // 取得一览数据
        Page<QmsMateriel> page = qmsMaterielService.qmsMaterielFindAll(bianMa,gongName,tuhao,guige,shengValue,shuxingValue,pageable);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-materiels-infos");

        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * 技术数据下拉框
     *
     * @param
     * @return
     */
    @GetMapping("/qms-materiels/master")
    @Timed
    @SuppressWarnings("unchecked")
    public List<LableValueDto> getMasterList(HttpServletRequest request){
        EntityManager em = emf.createEntityManager();
        String kbnCd = request.getParameter("kbnCd");

        List<LableValueDto> supplier = new ArrayList<LableValueDto>();
        try{
            Query query = em.createNativeQuery("SELECT a.prj_cd as value,a.prj_name as label\n" +
                "from qms_master a\n" +
                "where a.kbn_cd = '" + kbnCd + "' ");
            ResultTransformer transformer = Transformers.aliasToBean(LableValueDto.class);

            supplier = query.unwrap( org.hibernate.query.NativeQuery.class )
                .addScalar("label", StandardBasicTypes.STRING)
                .addScalar("value", StandardBasicTypes.STRING)
                .setResultTransformer(transformer)
                .getResultList();
            query = null;

        }catch(Exception e){
            // 异常信息
            log.info(e.getMessage());
            throw new InternalServerErrorException("qmsEntryInspection could not be found");
        }finally{
            em.close();
        }

        // 返回值
        return supplier;
    }

    /**
     * 供应商下拉框
     *
     * @param
     * @return
     */
    @GetMapping("/qms-materiels/supplier")
    @Timed
    @SuppressWarnings("unchecked")
    public List<LableValueDto> getSupplierList(){
        EntityManager em = emf.createEntityManager();

        List<LableValueDto> supplier = new ArrayList<LableValueDto>();
        try{
            Query query = em.createNativeQuery("SELECT sup.supplier_cd AS value, sup.supplier_name AS label from qms_supplier sup");
            ResultTransformer transformer = Transformers.aliasToBean(LableValueDto.class);

            supplier = query.unwrap( org.hibernate.query.NativeQuery.class )
                .addScalar("label", StandardBasicTypes.STRING)
                .addScalar("value", StandardBasicTypes.STRING)
                .setResultTransformer(transformer)
                .getResultList();
            query = null;

        }catch(Exception e){
            // 异常信息
            log.info(e.getMessage());
            throw new InternalServerErrorException("qmsEntryInspection could not be found");
        }finally{
            em.close();
        }

        // 返回值
        return supplier;
    }

    /**
     * 单位下拉框
     *
     * @param
     * @return
     */
    @GetMapping("/qms-materiels/unit")
    @Timed
    @SuppressWarnings("unchecked")
    public List<LableValueDto> getUnitList(){
        EntityManager em = emf.createEntityManager();

        List<LableValueDto> supplier = new ArrayList<LableValueDto>();
        try{
            Query query = em.createNativeQuery("SELECT sup.unit_cd AS value, sup.unit_name AS label from qms_unit sup");
            ResultTransformer transformer = Transformers.aliasToBean(LableValueDto.class);

            supplier = query.unwrap( org.hibernate.query.NativeQuery.class )
                .addScalar("label", StandardBasicTypes.STRING)
                .addScalar("value", StandardBasicTypes.STRING)
                .setResultTransformer(transformer)
                .getResultList();
            query = null;

        }catch(Exception e){
            // 异常信息
            log.info(e.getMessage());
            throw new InternalServerErrorException("qmsEntryInspection could not be found");
        }finally{
            em.close();
        }

        // 返回值
        return supplier;
    }

    /**
     * 角色下拉框
     *
     * @param
     * @return
     */
    @GetMapping("/qms-materiels/role")
    @Timed
    @SuppressWarnings("unchecked")
    public List<LableValueDto> getRoleList(){
        EntityManager em = emf.createEntityManager();

        List<LableValueDto> supplier = new ArrayList<LableValueDto>();
        try{
            Query query = em.createNativeQuery("SELECT sup.role_code AS value, sup.role_name AS label from rbac_role sup");
            ResultTransformer transformer = Transformers.aliasToBean(LableValueDto.class);

            supplier = query.unwrap( org.hibernate.query.NativeQuery.class )
                .addScalar("label", StandardBasicTypes.STRING)
                .addScalar("value", StandardBasicTypes.STRING)
                .setResultTransformer(transformer)
                .getResultList();
            query = null;

        }catch(Exception e){
            // 异常信息
            log.info(e.getMessage());
            throw new InternalServerErrorException("qmsEntryInspection could not be found");
        }finally{
            em.close();
        }

        // 返回值
        return supplier;
    }

    /**
     * 角色下拉框
     *
     * @param
     * @return
     */
    @GetMapping("/qms-materiels/materielType")
    @Timed
    @SuppressWarnings("unchecked")
    public List<LableValueDto> getMaterielTypeList(){
        EntityManager em = emf.createEntityManager();

        List<LableValueDto> supplier = new ArrayList<LableValueDto>();
        try{
            Query query = em.createNativeQuery("SELECT\n" +
                "\tt01.materiel_type_cd as value,t01.materiel_type_name as label\n" +
                "FROM\n" +
                "\tqms_materiel_type t01\n" +
                "WHERE\n" +
                "\tNOT EXISTS (\n" +
                "\t\tSELECT\n" +
                "\t\t\tt02.parent_cd\n" +
                "\t\tFROM\n" +
                "\t\t\tqms_materiel_type t02\n" +
                "\t\tWHERE\n" +
                "\t\t\tt01.materiel_type_cd = t02.parent_cd\n" +
                "\t)");
            ResultTransformer transformer = Transformers.aliasToBean(LableValueDto.class);

            supplier = query.unwrap( org.hibernate.query.NativeQuery.class )
                .addScalar("label", StandardBasicTypes.STRING)
                .addScalar("value", StandardBasicTypes.STRING)
                .setResultTransformer(transformer)
                .getResultList();
            query = null;

        }catch(Exception e){
            // 异常信息
            log.info(e.getMessage());
            throw new InternalServerErrorException("qmsEntryInspection could not be found");
        }finally{
            em.close();
        }

        // 返回值
        return supplier;
    }

    /**
     * 相同主键Check
     *
     * @param
     * @return
     */
    @GetMapping("/qms-materiels/sameCheck")
    @Timed
    @SuppressWarnings("unchecked")
    public Integer sameCheck(HttpServletRequest request){
        Integer resultNumber = 0;
        //得到传过来的值
        String cd = request.getParameter("samecheck");
        //如果这个值在数据库里找到了，则返回1
        List<QmsMateriel> list = qmsMaterielRepository.findByMaterielCd(cd);
        if(list.size()!= 0){
            resultNumber = 1;
        }else{
            resultNumber = 0;
        }
        return resultNumber;
    }

    /**
     * 删除Check
     *
     * @param
     * @return
     */
    @GetMapping("/qms-materiels/deleteCheck")
    @Timed
    @SuppressWarnings("unchecked")
    public Integer deleteCheck(HttpServletRequest request) {
        Integer resultNumber = 0;
        //得到传过来的值
        String cd = request.getParameter("deletecheck");
        Integer it = Integer.valueOf(cd);
        //如果这个值在数据库里找到了，则返回1
        List<QmsMaterielSupplier> list1 = qmsMaterielSupplierRepository.findByMaterielId(it);
//        List<QmsPartsAssemblyRelation> list2 = qmsPartsAssemblyRelationRepository.findByAssemblyMaterielCd(cd);
        if(list1.size()!= 0){
            resultNumber = 1;
        }else{
            resultNumber = 0;
        }
        return resultNumber;
    }

    /**
     * 获取上传文件
     *
     * @param files
     * @param
     * @return
     */
    @RequestMapping("/qms-materiels/upload")
    public JSONObject upload(@RequestPart MultipartFile files){
        // 返回值设置
        JSONObject returnData = new JSONObject();

        returnData = qmsMaterielService.uploadData(files);

        return returnData;
    }

    /**
     * GET  /qms-materiels/search : get all the qmsMateriels.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsMateriels in body
     * @author DL0777
     */
    @GetMapping("/qms-materiels/search")
    @Timed
    public ResponseEntity<List<MaterielPopDto>> getAllQmsMateriels(HttpServletRequest request, Pageable pageable) {
        log.debug("REST request to get a page of QmsMateriels");
        String materielCd = request.getParameter("materielCd");
        String materielName = request.getParameter("materielName");
        String supplier = request.getParameter("supplier");
        String figureNumber= request.getParameter("figureNumber");
        String supplierId = "";
        if(request.getParameter("supplierId") != null) {
            supplierId = request.getParameter("supplierId");
        }
        String type = request.getParameter("type");
        List<MaterielPopDto> qmsMateriels = qmsMaterielService.qmsMaterielFindAll(materielCd, materielName, supplier, figureNumber, type, supplierId);
        Page<MaterielPopDto> page = pageUtil.listToPage(qmsMateriels, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-materiels/search");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /qms-materiels/supplier : get qmsSupplier.
     *
     * @return QmsSupplier
     * @author DL0777
     */
    @GetMapping("/qms-materiel-suppliers/supplier")
    @Timed
    public QmsSupplier getSupplier(HttpServletRequest request) {
        log.debug("REST request to get QmsSupplier");
        String supplierCd = request.getParameter("supplierCd");
        Optional<QmsSupplier> qmsSupplier = qmsSupplierRepository.findQmsSupplierBySupplierCdAndFlagStatus(supplierCd, "0");
        if(qmsSupplier.isPresent()) {
            return qmsSupplier.get();
        } else {
            return null;
        }
    }

    /**
     * GET  /qms-materiels/materiel : get qmsMateriel.
     *
     * @return QmsMateriel
     * @author DL0777
     */
    @GetMapping("/qms-materiel-suppliers/materiel")
    @Timed
    public QmsMateriel getMateriel(HttpServletRequest request) {
        log.debug("REST request to get QmsMateriel");
        String materielCd = request.getParameter("materielCd");
        Optional<QmsMateriel> qmsMateriel = qmsMaterielRepository.findQmsMaterielByMaterielCdAndFlagStatus(materielCd, "0");
        if(qmsMateriel.isPresent()) {
            return qmsMateriel.get();
        } else {
            return null;
        }
    }

    /**
     * 根据单位id得到相应单位的数据
     *
     * @param
     * @return
     */
    @GetMapping("/qms-materiels/unitPopup")
    @Timed
    @SuppressWarnings("unchecked")
    public List<QmsUnit> getThisUnitList(HttpServletRequest request){
        String data = request.getParameter("data");
        Long it = Long.valueOf(data);
        List<QmsUnit> list = qmsUnitRepository.findByIdAndFlagStatus(it ,"0");
        return list;
    }

    /**
     * 根据单位id得到相应单位的数据keyup
     *
     * @param
     * @return
     */
    @GetMapping("/qms-materiels/unitPopupKeyUp")
    @Timed
    @SuppressWarnings("unchecked")
    public List<QmsUnit> getThisKeyUpUnitList(HttpServletRequest request){
        String unitCd = request.getParameter("unitCd");
        List<QmsUnit> list = qmsUnitRepository.findByUnitCd(unitCd);
        return list;
    }

    /**
     * 根据角色id得到相应单位的数据
     *
     * @param
     * @return
     */
    @GetMapping("/qms-materiels/rolePopup")
    @Timed
    @SuppressWarnings("unchecked")
    public List<RbacRole> getThisRoleList(HttpServletRequest request){
        String data = request.getParameter("data");
        Long it = Long.valueOf(data);
        List<RbacRole> list = rbacRoleRepository.findByIdAndDelFlag(it ,0);
        return list;
    }

    /**
     * 根据单位id得到相应单位的数据keyup
     *
     * @param
     * @return
     */
    @GetMapping("/qms-materiels/rolePopupKeyUp")
    @Timed
    @SuppressWarnings("unchecked")
    public List<RbacRole> getThisKeyUpRoleList(HttpServletRequest request){
        String roleCode = request.getParameter("roleCode");
        List<RbacRole> list = rbacRoleRepository.findByRoleCode(roleCode);
        return list;
    }

    /**
     * 根据角色id得到相应单位的数据
     *
     * @param
     * @return
     */
    @GetMapping("/qms-materiels/marPopup")
    @Timed
    @SuppressWarnings("unchecked")
    public List<QmsMaterielType> getThisMarList(HttpServletRequest request){
        String data = request.getParameter("data");
        Long it = Long.valueOf(data);
        List<QmsMaterielType> list = qmsMaterielTypeRepository.findByIdAndFlagStatus(it ,"0");
        return list;
    }

    /**
     * 根据物料分类id得到相应物料的数据keyup
     *
     * @param
     * @return
     */
    @GetMapping("/qms-materiels/marPopupKeyUp")
    @Timed
    @SuppressWarnings("unchecked")
    public List<QmsMaterielType> getThisKeyUpMarList(HttpServletRequest request){
        String materTypeCd = request.getParameter("materTypeCd");
        List<QmsMaterielType> list = qmsMaterielTypeRepository.findByMaterielTypeCdAndFlagStatus(materTypeCd,"0");
        return list;
    }
}
