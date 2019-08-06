package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsMaterielSupplier;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the QmsMaterielSupplier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsMaterielSupplierRepository extends JpaRepository<QmsMaterielSupplier, Long> {
    List<QmsMaterielSupplier> findBySupplierId(Integer s);
    List<QmsMaterielSupplier> findByMaterielId(Integer s);
    Optional<QmsMaterielSupplier> findByMaterielIdAndSupplierIdAndIdNot(Integer materielId, Integer supplierId, Long id);
}
