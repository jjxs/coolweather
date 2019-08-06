package cn.com.cnc.fcc.service;

import cn.com.cnc.fcc.domain.QmsVehicleTypeClass;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface QmsVehicTypeClassService {

    /**
     * 车型分类数据查询
     *
     * @param vehicleClass 模糊查询字段车型分类编码
     * @param vehicleClassName 模糊查询字段车型分类名称
     * @param pageable 分页排序信息
     * @return
     * @author fangzheng
     */

    Page<QmsVehicleTypeClass> qmsVtcFindAll(String vehicleClass, String vehicleClassName, Pageable pageable);
}
