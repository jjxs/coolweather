package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.HstServerInfo;
import cn.com.cnc.fcc.domain.HstServerInfoDetails;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HstServerInfoDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HstServerInfoDetailsRepository extends JpaRepository<HstServerInfoDetails, Long> {

	@Query(value="select * from hst_server_info_details where info_id = :infoId and del_flag = 0 and stop_flag = 0", nativeQuery = true)
	public List<HstServerInfoDetails> getServerInfoDetails(@Param("infoId")Long infoId);
}
