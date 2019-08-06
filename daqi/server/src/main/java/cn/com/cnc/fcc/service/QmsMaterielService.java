package cn.com.cnc.fcc.service;

import cn.com.cnc.fcc.domain.QmsMateriel;
import cn.com.cnc.fcc.service.dto.MaterielPopDto;
import com.alibaba.fastjson.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface QmsMaterielService {

    /**
     * 物料数据查询
     *
     * @param bianMa 模糊查询字段单位编码id
     * @param gongName 模糊查询字段单位名称
     * @param pageable 分页排序信息
     * @return
     * @author yanlgin
     */

    Page<QmsMateriel> qmsMaterielFindAll(String bianMa, String gongName, String tuhao,String guige,String shengValue,String shuxingValue,Pageable pageable);

    /**
     * 读取Excel
     * @param files
     * @return
     */
    JSONObject uploadData(MultipartFile files);

    /**
     * 物料数据查询
     *
     * @param materielCd 物料编码
     * @param materielName 物料名称
     * @param supplier 供应商
     * @param figureNumber 图号
     * @param type 型号
     * @return
     * @author DL0777
     */

    List<MaterielPopDto> qmsMaterielFindAll(String materielCd, String materielName, String supplier, String figureNumber, String type, String supplierId);
}
