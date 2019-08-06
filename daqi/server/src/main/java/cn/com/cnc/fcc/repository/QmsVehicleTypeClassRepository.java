package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsVehicleTypeClass;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the QmsVehicleTypeClass entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsVehicleTypeClassRepository extends JpaRepository<QmsVehicleTypeClass, Long>,JpaSpecificationExecutor<QmsVehicleTypeClass> {
    List<QmsVehicleTypeClass> findByVehicleClass(String s);

	Optional<QmsVehicleTypeClass> findByVehicleClassAndFlagStatus(String id, String string);

	List<QmsVehicleTypeClass> findByFlagStatusAndVehicleClass(String string, String id);
}
