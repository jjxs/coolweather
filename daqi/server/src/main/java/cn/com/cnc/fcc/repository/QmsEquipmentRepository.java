package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsEquipment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsEquipment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsEquipmentRepository extends JpaRepository<QmsEquipment, Long> {

}
