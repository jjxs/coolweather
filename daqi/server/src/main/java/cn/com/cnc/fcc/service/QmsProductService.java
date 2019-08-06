package cn.com.cnc.fcc.service;

import cn.com.cnc.fcc.domain.QmsProductRelationTabDTO;
import cn.com.cnc.fcc.domain.QmsProductRelationTabThreeDTO;
import cn.com.cnc.fcc.domain.QmsProductRelationTabTwoDTO;
import cn.com.cnc.fcc.service.dto.ProductDTO;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface QmsProductService {
    /**
     * 取得产品信息画面一览数据
     *
     * @param productNumIn
     * @param materielCdIn
     * @param materielNameIn
     * @return
     * @author DL0761
     */
    List<ProductDTO> qmsProductFindAll(String productNumIn,String materielCdIn,String materielNameIn,String productBatchIn,String materielId,String sp);

    /**
     * 读取Excel
     * @param files
     * @return
     */
    JSONObject uploadData(MultipartFile files);

    /**
     * 取得产品正向追溯信息画面一览数据
     *
     * @param productRelation
     * @param
     * @param
     * @return
     * @author DL0761
     */
    List<QmsProductRelationTabDTO> qmsProductFindTabData(String productRelation);

    /**
     * 取得生产正向追溯信息画面一览数据
     *
     * @param productRelation
     * @param
     * @param
     * @return
     * @author DL0761
     */
    List<QmsProductRelationTabTwoDTO> qmsProductFindTabDataTwo(String productRelation);

    /**
     * 取得生产正向追溯信息画面一览数据
     *
     * @param productRelation
     * @param
     * @param
     * @return
     * @author DL0761
     */
    List<QmsProductRelationTabThreeDTO> qmsProductFindTabDataThree(String productRelation);
}
