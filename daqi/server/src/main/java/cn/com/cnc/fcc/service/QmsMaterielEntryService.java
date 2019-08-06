package cn.com.cnc.fcc.service;

import cn.com.cnc.fcc.domain.QmsMateriel;
import cn.com.cnc.fcc.service.dto.MaterielPopDto;
import cn.com.cnc.fcc.service.dto.QmsMaterielEntryDto;
import cn.com.cnc.fcc.service.dto.QmsMaterielEntryEditDto;
import com.alibaba.fastjson.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface QmsMaterielEntryService {

    /**
     * 物料数据查询
     *
     * @return List<QmsMaterielEntryDto>
     * @author DL0777
     */

    List<QmsMaterielEntryDto> qmsMaterielEntryFindAll(String materielCd, String materielName, String figureNumber, String supplierCd, String supplierName, String specificationType, String purchaseOrderNumber, String flagInspect, String enclosure);

    /**
     * 读取Excel
     * @param files
     * @author DL0777
     * @return
     */
    JSONObject uploadData(MultipartFile files);

    /**
     * 获取采购管理头部
     * @param Id
     * @author DL0777
     * @return
     */
    JSONObject getEditHeader(String Id);

    /**
     * 保存事件处理
     * @param body
     * @author DL0777
     * @return
     */
    JSONObject saveData(JSONObject body);
}
