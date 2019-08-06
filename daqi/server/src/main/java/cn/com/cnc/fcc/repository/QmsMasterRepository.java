package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsMaster;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsMaster entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsMasterRepository extends JpaRepository<QmsMaster, Long> {

}
