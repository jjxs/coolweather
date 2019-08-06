package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsUnqualifiedProductDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsUnqualifiedProductDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsUnqualifiedProductDetailsRepository extends JpaRepository<QmsUnqualifiedProductDetails, Long> {

}
