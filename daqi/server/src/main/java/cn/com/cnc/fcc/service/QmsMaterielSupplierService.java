package cn.com.cnc.fcc.service;
import cn.com.cnc.fcc.service.dto.QmsMaterielSupplierDto;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public interface QmsMaterielSupplierService {

    /**
     * 物料供应商信息数据查询
     *
     * @param materielCd 模糊查询字段编码id
     * @param materielName 模糊查询字段物料名称
     * @return List<QmsMaterielSupplierDto>
     * @author DL0777
     */
    List<QmsMaterielSupplierDto> qmsMaterielSupplierFindAll(String materielCd, String materielName, String supplierCd, String supplierName);

    /**
     * 物料供应商信息数据查询
     *
     * @param id 模糊查询字段编码id
     * @return QmsMaterielSupplierDto
     * @author DL0777
     */
    QmsMaterielSupplierDto findById(Long id);
}
