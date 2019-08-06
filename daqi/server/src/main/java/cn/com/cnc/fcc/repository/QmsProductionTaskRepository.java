package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsProductionTask;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsProductionTask entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsProductionTaskRepository extends JpaRepository<QmsProductionTask, Long> {

}
