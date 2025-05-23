package cn.com.cnc.fcc.web.rest;

import cn.com.cnc.fcc.domain.QmsControlDetails;
import cn.com.cnc.fcc.domain.QmsEntryControlDetails;
import cn.com.cnc.fcc.domain.QmsUnit;
import cn.com.cnc.fcc.repository.QmsControlDetailsRepository;
import cn.com.cnc.fcc.service.QmsControlDetailsService;
import cn.com.cnc.fcc.service.QmsUnitService;
import cn.com.cnc.fcc.web.rest.util.PaginationUtil;
import com.alibaba.fastjson.JSONObject;
import com.codahale.metrics.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api")
public class QmsControlDetailsControl {

    private final Logger log = LoggerFactory.getLogger(QmsControlDetailsControl.class);

    private static final String ENTITY_NAME = "qmsControlDetailsController";

    private static final String dataFormat = "yyyy-MM-dd HH:mm:ss";
    @Autowired
    private QmsControlDetailsService qmsControlDetailsService;
    @Autowired
    private QmsControlDetailsRepository qmsControlDetailsRepository;
    /**
     * 单位信息
     *
     * @param pageable
     * @return
     */
    @GetMapping("/qms-control-details/index")
    @Timed
    public ResponseEntity<List<QmsControlDetails>> getAllQmsUnit(HttpServletRequest request, Pageable pageable) {

        log.debug("REST request to get a page of getAllQmsUnit");
        // 模糊查询检查项目
        String xiangmu = request.getParameter("xiangmu");
        // 取得一览数据
        Page<QmsControlDetails> page = qmsControlDetailsService.qmsControlDetailsFindAll(xiangmu,pageable);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-control-details-infos");

        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * 相同主键Check
     *
     * @param
     * @return
     */
    @GetMapping("/qms-control-details/sameCheck")
    @Timed
    @SuppressWarnings("unchecked")
    public Integer sameCheck(HttpServletRequest request){
        Integer resultNumber = 0;
        //得到传过来的值
        String cd = request.getParameter("samecheck");
        //如果这个值在数据库里找到了，则返回1
        List<QmsControlDetails> list = qmsControlDetailsRepository.findByInspectionCd(cd);
        if(list.size()!= 0){
            resultNumber = 1;
        }else{
            resultNumber = 0;
        }
        return resultNumber;
    }

    /**
     * 获取上传文件
     *
     * @param logo
     * @param request
     * @return
     */
    @RequestMapping("/qms-control-details/upload")
    public JSONObject upload(@RequestPart MultipartFile files){
        // 返回值设置
        JSONObject returnData = new JSONObject();

        returnData = qmsControlDetailsService.uploadData(files);

        return returnData;
    }

    /**
     * GET  /control-detailsInfo/search : get qmsControlDetails.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of qmsControlDetails in body
     * @author DL0777
     */
    @GetMapping("/control-details/search")
    @Timed
    public ResponseEntity<List<QmsControlDetails>> getControlDetails(HttpServletRequest request, Pageable pageable) {
        log.debug("REST request to get a page of qmsControlDetails");
        String itemCd = request.getParameter("itemCd");
        String inspectionItem = request.getParameter("inspectionItem");
        Page<QmsControlDetails> page = qmsControlDetailsRepository.findAllByInspectionCdContainingAndInspectionItemContainingAndFlagStatus(itemCd, inspectionItem, "0", pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/qms-materiels/search");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
