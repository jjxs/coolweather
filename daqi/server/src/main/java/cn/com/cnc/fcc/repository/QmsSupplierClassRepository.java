package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsSupplierClass;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the QmsSupplierClass entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsSupplierClassRepository extends JpaRepository<QmsSupplierClass, Long>,JpaSpecificationExecutor<QmsSupplierClass> {
        List<QmsSupplierClass> findByIdAndFlagStatus(Long id,String flag);
        List<QmsSupplierClass> findBySuppkierClass(String s);
}
