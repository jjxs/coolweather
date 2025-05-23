package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsApproveResult;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsApproveResult entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsApproveResultRepository extends JpaRepository<QmsApproveResult, Long> {

}
