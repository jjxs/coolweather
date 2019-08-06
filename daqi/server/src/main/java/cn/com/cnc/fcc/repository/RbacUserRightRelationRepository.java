package cn.com.cnc.fcc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import cn.com.cnc.fcc.domain.RbacUserRightRelation;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the RbacUserRightRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RbacUserRightRelationRepository extends JpaRepository<RbacUserRightRelation, Long> {
	@Query(value = "delete from RbacUserRightRelation where userId= ?1")
	@Modifying
	int deleteByUserId(Integer userId);

	List<RbacUserRightRelation> findByRoleId(Integer id);

	Optional<RbacUserRightRelation> findByUserId(Integer userId);
}
