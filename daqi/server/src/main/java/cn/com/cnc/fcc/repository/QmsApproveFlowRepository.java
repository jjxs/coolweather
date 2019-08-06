package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsApproveFlow;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsApproveFlow entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsApproveFlowRepository extends JpaRepository<QmsApproveFlow, Long> {

}
