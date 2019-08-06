package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsEntryControlCriterion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsEntryControlCriterion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsEntryControlCriterionRepository extends JpaRepository<QmsEntryControlCriterion, Long> {

}
