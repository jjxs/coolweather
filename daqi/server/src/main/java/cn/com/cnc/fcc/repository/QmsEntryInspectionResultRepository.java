package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsEntryInspectionResult;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsEntryInspectionResult entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsEntryInspectionResultRepository extends JpaRepository<QmsEntryInspectionResult, Long> {

	List<QmsEntryInspectionResult> findByIdAndFlagStatus(Long id, String string);

}
