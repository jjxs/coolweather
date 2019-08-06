package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsBomTechnology;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the QmsBomTechnology entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsBomTechnologyRepository extends JpaRepository<QmsBomTechnology, Long> {
	//    // 车型物料cd查询工艺
	//    @Query(value = "select q from QmsBomTechnology q  where q.flagStatus = :flagStatus and q.vehicleType = :vehicleType and  q.materielCd = :materielCd")
	//    Page<QmsBomTechnology> getQmsBomTechnologies(Pageable pageable, @Param("vehicleType") String vehicleType, @Param("materielCd") String materielCd, @Param("flagStatus") String flagStatus);
	// 车型为空物料cd查询工艺
	//    @Query(value = "select q from QmsBomTechnology q  where q.flagStatus = :flagStatus and q.vehicleType is null and  q.materielCd = :materielCd")
	//    Page<QmsBomTechnology> getQmsBomTechnologiesByVehicleTypeIsNull(Pageable pageable, @Param("materielCd") String materielCd, @Param("flagStatus") String flagStatus);
	//    Optional<QmsBomTechnology> findByIdAndModifyTimeAndFlagStatus(Long id, ZonedDateTime modifyTime, String flagStatus);
	//    Optional<QmsBomTechnology> findByIdAndFlagStatus(Long id, String flagStatus);

	//    Optional<QmsBomTechnology> findByTechnologyCdAndMaterielCdAndVehicleTypeAndFlagStatus(String technologyCd, String materiel, String vehicleType, String flagStatus);

	List<QmsBomTechnology> findByProcessId(Integer s);

	List<QmsBomTechnology> findByMaterielId(Integer s);

	/**
	 * 根据物料ID和工艺编码取值
	 * 
	 * @param materielId 物料ID
	 * @param technologyCd 工艺编码
	 * @param flagStatus 删除标志
	 * @author DL0733
	 * @return
	 */
	List<QmsBomTechnology> findByMaterielIdAndTechnologyCdAndFlagStatus(Integer materielId, String technologyCd,
			String flagStatus);
	/**
	 * 根据物料ID取值
	 * 
	 * @param materielId 物料ID
	 * @param flagStatus 删除标志
	 * @author DL0733
	 * @return
	 */
	List<QmsBomTechnology> findByMaterielIdAndIsDefaultAndFlagStatus(Integer materielId,String isDefault, String flagStatus);

	/**
	 * 根据物料ID和工艺编码和工序ID取值
	 * 
	 * @param materielId 物料ID
	 * @param technologyCd 工艺ID
	 * @param processId 工序ID
	 * @param string
	 * @author DL0733
	 * @return
	 */
	List<QmsBomTechnology> findByMaterielIdAndTechnologyCdAndOrderNoAndFlagStatus(Integer materielId,
			String technologyCd, Integer processId, String flagStatus);

	/**
	 * 编辑取得bom-technology信息
	 * 
	 * @param id
	 * @param string
	 * @author DL0733
	 * @return
	 */
	QmsBomTechnology findByIdAndFlagStatus(Long id, String flagStatus);

	List<QmsBomTechnology> findByMaterielIdAndTechnologyCdAndOrderNoAndFlagStatusAndIdNot(Integer materielId,
			String technologyCd, Integer processId, String string, Long long1);

	/**
	 * 默认工艺修改
	 * 
	 * @param hiddenRightMaterielId
	 * @return
	 */
	@Query(value = "update QmsBomTechnology set isDefault = 0  where materielId = ?1")
	@Modifying
	Integer updatehiddenRightMaterielId(Integer hiddenRightMaterielId);
	/**
	 * 默认工艺修改
	 * 
	 * @param hiddenRightMaterielId
	 * @return
	 */
	@Query(value = "update QmsBomTechnology set isDefault = 1  where materielId = ?1 and technologyCd = ?2")
	@Modifying
	Integer updateMaterielIdTechnologyCd(Integer hiddenRightMaterielId, String technologyCd);

	List<QmsBomTechnology> findByMaterielIdAndTechnologyCdAndIsDefaultAndFlagStatus(Integer materielId,
			String technologyCd, String string, String string2);


}
