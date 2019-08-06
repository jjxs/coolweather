package cn.com.cnc.fcc.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import cn.com.cnc.fcc.domain.QmsVehicleTypeInfo;

@Service
public interface QmsVehicleTypeInfoService {
	
	/**
	 * 车型列表数据查询
	 * 
	 * @param carType 模糊查询字段车型id
	 * @param carTypeName 模糊查询字段车型名称
	 * @param pageable 分页排序信息
	 * @return
	 * @author DL0733
	 */
	Page<QmsVehicleTypeInfo> qmsVehicleTypeFindAll(String carType,String carTypeName, Pageable pageable);

	/**
	 * 更新车型删除flag
	 * 
	 * @param qmsVehicleTypeInfo 删除车型信息集合
	 * @return
	 * @author DL0733
	 */
	Integer updateVehicleTypeFlag(QmsVehicleTypeInfo qmsVehicleTypeInfo);

}
