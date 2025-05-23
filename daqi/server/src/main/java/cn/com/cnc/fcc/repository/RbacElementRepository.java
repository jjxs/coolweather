package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.RbacElement;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RbacElement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RbacElementRepository extends JpaRepository<RbacElement, Long> {

}
