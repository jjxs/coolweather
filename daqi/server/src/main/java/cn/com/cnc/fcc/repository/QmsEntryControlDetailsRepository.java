package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsEntryControlDetails;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsEntryControlDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsEntryControlDetailsRepository extends JpaRepository<QmsEntryControlDetails, Long> {

	List<QmsEntryControlDetails> findByMaterielIdAndInspectionItemAndFlagStatus(Integer materielCd,
			String inspectionItem, String flagStatus);

    /**
     * 根据物料id查询物料进场检验点表
     * @param materielId
     * @param flagStatus
     * @return
     */
	List<QmsEntryControlDetails> findAllByMaterielIdAndFlagStatusAndIsValidOrderByItemNumber(Integer materielId, String flagStatus, String isValid);
}
