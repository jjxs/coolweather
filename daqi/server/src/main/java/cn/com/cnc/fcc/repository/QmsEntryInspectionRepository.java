package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsEntryInspection;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsEntryInspection entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsEntryInspectionRepository extends JpaRepository<QmsEntryInspection, Long> {

}
