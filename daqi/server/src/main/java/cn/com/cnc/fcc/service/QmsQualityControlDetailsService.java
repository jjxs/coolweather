package cn.com.cnc.fcc.service;

import cn.com.cnc.fcc.domain.QmsQualityControlDetails;
import cn.com.cnc.fcc.service.dto.ProductDTO;
import cn.com.cnc.fcc.service.dto.ProductProcessCheckDTO;
import cn.com.cnc.fcc.service.dto.QmsPartsAssemblyRelationDto;
import cn.com.cnc.fcc.service.dto.QmsQualityControlDetailsDto;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public interface QmsQualityControlDetailsService {

    List<QmsPartsAssemblyRelationDto> findAssemblyRelationByPid(Integer bid);

    // 自检数据一览
    List<QmsQualityControlDetailsDto> findByBomTechnologyId(Integer pId, String isDetails);

    // 更新生产检验结果表
    String updateQmsProductionInspectionValues(String inspectionId, String checkNumber, String isOk, String inspectionDiff);

    // 检验装配数据是否输入合格
    String checkProductionRelation(JSONObject jsonObject);

    // 保存全部
    JSONObject saveAll(JSONObject jsonObject);

    // 自检一栏
    List<ProductProcessCheckDTO> qmsProductProcessSelfFindAll(HttpServletRequest request);

    //删除全部数据
    String deleteAll(String pid);

    // 检验check
    JSONObject chackPreProcess(JSONObject jsonObject);

    // 编辑查看画面查询
    ProductProcessCheckDTO findById(Long id);

    // 删除Check
    String deleteCheck(String pid);
}
