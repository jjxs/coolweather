package cn.com.cnc.fcc.service;

import cn.com.cnc.fcc.domain.QmsBomTechnology;
import cn.com.cnc.fcc.domain.QmsProductionInspection;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public interface QmsProductionInspectionService {

    /**
     * DL0769
     * 生产过程批量生成
     */
    @Transactional
    String doBatchGeneration(QmsProductionInspection qmsProductionInspection, List<QmsBomTechnology> list);

    /**
     * DL0769
     * 检测上工序是否合格
     * @param bomTechnologyId
     * @param serialNumber
     * @return
     */
    JSONObject chackPreProcess(String bomTechnologyId, String serialNumber);
}
