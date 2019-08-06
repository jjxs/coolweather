package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsProcess;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the QmsProcess entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsProcessRepository extends JpaRepository<QmsProcess, Long> ,JpaSpecificationExecutor<QmsProcess>{
    List<QmsProcess> findByProcessCd(String s);

    @Query(value = "select r from QmsProcess r where 1 = 1 and processCd like %:processCd% and processName like %:processName% ")
	Page<QmsProcess> getRoleInfoForCodeName(Pageable pageable, @Param("processCd") String processCd, @Param("processName") String processName);

	List<QmsProcess> findByIdAndFlagStatus(Long id, String string);

	QmsProcess findByFlagStatusAndId(String string, Long valueOf);

	QmsProcess findByProcessCdAndFlagStatus(String processCd, String string);

	List<QmsProcess> findByFlagStatusAndProcessCd(String string, String processCd);
}
