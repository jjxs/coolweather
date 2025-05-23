package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsNrvTelation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsNrvTelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsNrvTelationRepository extends JpaRepository<QmsNrvTelation, Long> {

}
