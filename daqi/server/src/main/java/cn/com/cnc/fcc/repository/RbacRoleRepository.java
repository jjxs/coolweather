package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.RbacRole;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RbacRole entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RbacRoleRepository extends JpaRepository<RbacRole, Long> {

	@Query(value = "select r from RbacRole r where delFlag = 0 and roleName like %:roleName% ")
			
	Page<RbacRole> getRoleInfo(Pageable pageable, @Param("roleName") String roleName);
	
	List<RbacRole> findByDelFlag(Integer delFlag);

    List<RbacRole> findByRoleCode(String s);

    @Query(value = "select r from RbacRole r where delFlag = 0 and roleName like %:roleName% and roleCode like %:roleCode% ")

	Page<RbacRole> getRoleInfoForCodeName(Pageable pageable, @Param("roleName") String roleName, @Param("roleCode") String roleCode);

    List<RbacRole> findByIdAndDelFlag(Long id,Integer flag);

}
