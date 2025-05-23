package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsInspectionDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsInspectionDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsInspectionDetailsRepository extends JpaRepository<QmsInspectionDetails, Long> {

}
