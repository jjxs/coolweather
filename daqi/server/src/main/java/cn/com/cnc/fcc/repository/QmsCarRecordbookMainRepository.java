package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsCarRecordbookMain;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsCarRecordbookMain entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsCarRecordbookMainRepository extends JpaRepository<QmsCarRecordbookMain, Long> {

}
