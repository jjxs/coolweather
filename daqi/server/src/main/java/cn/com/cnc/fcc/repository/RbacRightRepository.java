package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.RbacRight;
import cn.com.cnc.fcc.domain.RbacRole;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RbacRight entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RbacRightRepository extends JpaRepository<RbacRight, Long> {
	@Query(value = "select r from RbacRight r where delFlag = 0 and rightName like %:rightName% and rightCode like %:rightCode%")
	
	Page<RbacRight> getRightInfo(Pageable pageable,@Param("rightName") String rightName,@Param("rightCode") String rightCode);
	
	List<RbacRight> findByDelFlag(Integer delFlag);

	List<RbacRight> findByRightCode(String s);
}
