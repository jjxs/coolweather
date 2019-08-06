package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsVehicleTypeInfo;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data repository for the QmsVehicleTypeInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsVehicleTypeInfoRepository
		extends JpaRepository<QmsVehicleTypeInfo, Long>, JpaSpecificationExecutor<QmsVehicleTypeInfo> {

    /*
    * 判断是否存在车型分类编号
    * */
    List<QmsVehicleTypeInfo> findByVehicleClassId(Integer s);

    // 根据车型和车型名称查询
	@Query(value = "select q from QmsVehicleTypeInfo q  where q.flagStatus = 0 and q.vehicleType like %:vehicleType% and q.vehicleTypeName like %:vehicleTypeName%")
	List<QmsVehicleTypeInfo> getVehicleTypeInfo(@Param("vehicleType") String vehicleType,
			@Param("vehicleTypeName") String vehicleTypeName);

    List<QmsVehicleTypeInfo> findAllByFlagStatusOrderByIdDesc(String FlagStatus);
	/**
	 * 根据车型ID和更新时间做更新排他
	 * 
	 * @param id
	 * @param modifyTime
	 * @return
	 */
	List<QmsVehicleTypeInfo> findByIdAndFlagStatus(Long id, String FlagStatus);

	/**
	 * 删除车型信息
	 * 
	 * @param 车型ID
	 * @param 更新时间modifyTime
	 * @return
	 */
	@Modifying()
	@Query(value = "DELETE FROM  QmsVehicleTypeInfo where vehicleType= ?1 ")
	public Integer updateIdModifyTime(String VehicleType, String Username, ZonedDateTime modifyTime);

	/**
	 * 判断车型是否已存在
	 * 
	 * @param vehicleType 车型ID
	 * @param string      是否被删除
	 * @return
	 */
	QmsVehicleTypeInfo findByVehicleTypeAndFlagStatus(String vehicleType, String flagStatus);

	List<QmsVehicleTypeInfo> findByFlagStatusOrderById(String flagStatus);

	/**
	 * bom信息显示取得和车型cd和车型名称
	 * 
	 * @param string
	 * @param vehicleId
	 * @return
	 */
	List<QmsVehicleTypeInfo> findByFlagStatusAndId(String flagStatus, Long vehicleId);

	List<QmsVehicleTypeInfo> findByFlagStatusAndVehicleType(String string, String string2);

	Optional<QmsVehicleTypeInfo> findByFlagStatusAndVehicleTypeOrderById(String id, String string);

	List<QmsVehicleTypeInfo> findByVehicleTypeAndFlagStatusOrderById(String string, String id);
}
