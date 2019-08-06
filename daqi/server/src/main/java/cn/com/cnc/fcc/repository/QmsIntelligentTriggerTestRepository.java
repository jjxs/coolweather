package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsIntelligentTriggerTest;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsIntelligentTriggerTest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsIntelligentTriggerTestRepository extends JpaRepository<QmsIntelligentTriggerTest, Long> {

}
