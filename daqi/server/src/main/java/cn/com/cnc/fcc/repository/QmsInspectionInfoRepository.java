package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsInspectionInfo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsInspectionInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsInspectionInfoRepository extends JpaRepository<QmsInspectionInfo, Long> {

}
