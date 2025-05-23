package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.RbacUser;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


/**
 * Spring Data  repository for the RbacUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RbacUserRepository extends JpaRepository<RbacUser, Long> {
	@Query(value = "select r from RbacUser r  where r.delFlag = 0 and (r.userCode like %:userCode%  and  r.userName like %:searchUsersMes%)")
	Page<RbacUser> getUserInfo(Pageable pageable, @Param("searchUsersMes") String searchUsersMes,@Param("userCode") String userCode);
	
	List<RbacUser> findByDelFlag(Integer delFlag);

	@Query(value = "UPDATE rbac_user ru LEFT JOIN rbac_user_right_relation rurr ON ru.id = rurr.user_id " + 
					"SET ru.del_date_time = CURRENT_TIMESTAMP (), ru.del_flag = 1, ru.del_oper_cd = 'InitSystem', " + 
					"ru.del_progarm_cd = 'HostSlaveInit--SQL', rurr.del_date_time = CURRENT_TIMESTAMP ()," +
					"rurr.del_flag = 1, rurr.del_oper_cd = 'InitSystem', rurr.del_progarm_cd = 'HostSlaveInit--SQL'" +
					"WHERE (ru.user_code <> 'admin' AND ru.user_code <> '001')", nativeQuery = true)
	@Modifying
	@Transactional
	int deleteUserNonExistDefault();
	
	@Query(value = "select r from RbacUser r  where r.delFlag = 0 and (r.userCode <> 'admin' or r.userCode <> '001')")
	List<RbacUser> findAllNonExistDefault();

	List<RbacUser> findByUserCode(String code);

}
