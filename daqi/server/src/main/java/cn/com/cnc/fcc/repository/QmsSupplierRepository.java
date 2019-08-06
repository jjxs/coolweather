package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsSupplier;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the QmsSupplier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsSupplierRepository extends JpaRepository<QmsSupplier, Long>,JpaSpecificationExecutor<QmsSupplier> {
    Optional<QmsSupplier> findQmsSupplierBySupplierCdAndFlagStatus(String supplierCd, String flagStatus);
   List<QmsSupplier> findBySupplierCd(String s);
   List<QmsSupplier> findBySupplierClassId(Integer s);
}
