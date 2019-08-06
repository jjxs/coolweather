package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsProcessRoute;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsProcessRoute entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsProcessRouteRepository extends JpaRepository<QmsProcessRoute, Long> {

}
