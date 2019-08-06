package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.RbacMenuRightRelation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


/**
 * Spring Data  repository for the RbacMenuRightRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RbacMenuRightRelationRepository extends JpaRepository<RbacMenuRightRelation, Long> {
	@Query(value = "delete from RbacMenuRightRelation where rightId= ?1")
	@Modifying
	int deleteByRightId(Integer rightId);
	
	@Query(value = "update RbacMenuRightRelation set delFlag = 1  where rightId= ?1")
	@Modifying
	int updateByRightId(Integer rightId);
}
