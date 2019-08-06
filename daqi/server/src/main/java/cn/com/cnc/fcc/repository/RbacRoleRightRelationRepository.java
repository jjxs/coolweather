package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.RbacRoleRightRelation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the RbacRoleRightRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RbacRoleRightRelationRepository extends JpaRepository<RbacRoleRightRelation, Long> {
	@Query(value = "delete from RbacRoleRightRelation where roleId= ?1")
	@Modifying
	int deleteByRoleId(Integer RoleId);

	@Query(value = "update RbacRoleRightRelation set delFlag = 1  where roleId= ?1")
	@Modifying
	int updateByRoleId(Integer RoleId);

	List<RbacRoleRightRelation> findByRightId(Integer id);

}
