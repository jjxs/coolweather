package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsEnclosure;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * Spring Data  repository for the QmsEnclosure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsEnclosureRepository extends JpaRepository<QmsEnclosure, Long> {
	@Modifying
	@Transactional
	void deleteByInspectionInfoIdAndInspectionKbnAndEnclosureAddress(Integer inspectionInfoId,String inspectionKbn,String enclosureAddress);

	// 附件列表
	@Query(value="select e.id, e.enclosureAddress from QmsEnclosure e where e.inspectionKbn = 2 AND e.inspectionInfoId = :inspectionInfoId")
	public List<QmsEnclosure> getEnclosureList(@Param("inspectionInfoId")Integer inspectionInfoId);

	/**
	 * 取得附件表信息
	 * 
	 * @param bomTechnologyId 业务ID
	 * @author DL0733
	 * @return
	 */
	List<QmsEnclosure> findByInspectionInfoId(Integer bomTechnologyId);
	@Transactional
	Integer deleteByInspectionInfoId(Integer valueOf);


	/**
     * 取得附件表信息
     *
     * @param inspectionInfoId 业务ID
     * @author DL0777
     * @return
     */
    // 获取附件列表
    List<QmsEnclosure> findAllByInspectionInfoIdAndInspectionKbn(Integer inspectionInfoId, String inpectionKbn);

	List<QmsEnclosure> findByInspectionInfoIdIn(List groutId);
}
