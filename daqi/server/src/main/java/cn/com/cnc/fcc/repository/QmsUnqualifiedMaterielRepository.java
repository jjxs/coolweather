package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsUnqualifiedMateriel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsUnqualifiedMateriel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsUnqualifiedMaterielRepository extends JpaRepository<QmsUnqualifiedMateriel, Long> {

}
