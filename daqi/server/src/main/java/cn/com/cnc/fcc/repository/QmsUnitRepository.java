package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsSupplier;
import cn.com.cnc.fcc.domain.QmsUnit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the QmsUnit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsUnitRepository extends JpaRepository<QmsUnit, Long>,JpaSpecificationExecutor<QmsSupplier> {
    List<QmsUnit> findByUnitCd(String s);

    List<QmsUnit> findByIdAndFlagStatus(Long id,String flag);

}
