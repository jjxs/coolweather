package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsBreathingSafetyTest;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsBreathingSafetyTest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsBreathingSafetyTestRepository extends JpaRepository<QmsBreathingSafetyTest, Long> {

}
