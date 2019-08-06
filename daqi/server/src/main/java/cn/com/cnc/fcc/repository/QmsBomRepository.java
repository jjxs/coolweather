package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsBom;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsBom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsBomRepository extends JpaRepository<QmsBom, Long> {
	/**
	 * 查询车型在BOM表中是否存在
	 * 
	 * @param 车型
	 * @param 删除标志
	 * @return
	 * @author DL0733
	 */
	List<QmsBom> findByVehicleIdAndFlagStatus(Integer vehicleType, String flagStatus);
















































    /**
     * 查询bom树形数据
     *
     * @param vehicleType 车型
     * @param vehicleTypeName 车型名称
     * @param FlagStatus 使用标识
     * @return List<QmsBom> bom数据
     * @author DL0777
     */
//    List<QmsBom> findAllByVehicleTypeLikeOrVehicleTypeLikeAndFlagStatus(String vehicleType, String vehicleTypeName, String FlagStatus);

    // 取出根节点
    @Query(value = "select r from QmsBom r where flagStatus = :flagStatus and (vehicleType = :vehicleType or vehicleType like %:vehicleTypeName%) and (parentMaterielCd is null or trim(parentMaterielCd)='') ")
    List<QmsBom> getVehicleTypeAndVehicleTypeName(@Param("vehicleType") String vehicleType, @Param("vehicleTypeName")String vehicleTypeName,  @Param("flagStatus")String FlagStatus);
















































    /**
     * 取得物料编码是否存在
     * 
     * @param materielCd
     * @param flagStatus
     * @author DL0733
     * @return
     */
//	List<QmsBom> findByVehicleIdAndMaterielIdAndFlagStatus(Integer materielCd, String flagStatus);















































	/**
	 * 判断上级物料信息
	 * 
	 * @param parentMaterielCd
	 * @param flagStatus
	 * @author DL0733
	 * @return
	 */
	List<QmsBom> findByVehicleIdAndMaterielIdAndFlagStatus(Integer vehicleType,Integer parentMaterielCd, String flagStatus);
















































	/**
	 * 取得车型和上级物料和物料编码数据
	 * 
	 * @param vehicleType
	 * @param parentMaterielCd
	 * @param materielCd
	 * @param flagStatus
	 * @return
	 */
	List<QmsBom> findByVehicleIdAndParentMaterielIDAndMaterielIdAndFlagStatus(Integer vehicleType, Integer parentMaterielCd,
			Integer materielCd, String flagStatus);
















































//	List<QmsBom> findByVehicleIdAndMaterielIdAndFlagStatusAndIdNot(Integer vehicleId, Integer materielId, String string,
//			Long id);
















































	List<QmsBom> findByVehicleIdAndMaterielIdAndParentMaterielIDAndFlagStatus(Integer vehicleId, Integer materielId,
			Integer parentMaterielID, String FlagStatus);
















































	List<QmsBom> findByVehicleIdAndParentMaterielIDAndMaterielIdAndFlagStatusAndIdNot(Integer vehicleId,
			Integer ParentMaterielID, Integer materielId, String FlagStatus, Long id);
}
