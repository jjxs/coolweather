package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsCarRecordbookDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsCarRecordbookDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsCarRecordbookDetailsRepository extends JpaRepository<QmsCarRecordbookDetails, Long> {

}
