package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.HstServer;
import cn.com.cnc.fcc.domain.HstServerInfo;
import cn.com.cnc.fcc.domain.PapiToken;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HstServerInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HstServerInfoRepository extends JpaRepository<HstServerInfo, Long> {

	@Query(value="select * from hst_server_info where (node_id = :nodeId) and del_flag = 0 and stop_flag = 0", nativeQuery = true)
	public List<HstServerInfo> findByNodeId(@Param("nodeId")String nodeId);
	
	@Query(value="SELECT LAST_INSERT_ID()", nativeQuery = true)
	public Long getHostInfoMaxId();
	
//	@Query(value="select hsi.id, hsi.host_slave_flag, " + 
//			"hsi.node_id, hsi.p_node_id, hsi.node_url, hsi.node_join_time, " +
//			"hsid.host_name, hsid.ip_address, hsid.os_user, hsid.os_name, " +
//			"hsid.os_version, hsid.os_arch from hst_server_info hsi inner join " +
//			"hst_server_info_details hsid on hsi.id = hsid.info_id and hsi.stop_flag = 0 and " +
//			"hsi.del_flag = 0 and hsid.stop_flag = 0 and hsid.del_flag = 0", nativeQuery = true)
	@Query(value="select new cn.com.cnc.fcc.domain.HstServer(hsi, hsid) from HstServerInfo as hsi, HstServerInfoDetails as hsid " +
			"where hsi.id = hsid.infoId and hsi.delFlag = 0 and hsi.stopFlag = 0 and " +
			"hsid.stopFlag = 0 and hsid.delFlag = 0 and hsi.hostSlaveFlag = :hostSlaveFlag")
	public List<HstServer> findHostServer(@Param("hostSlaveFlag")int hostSlaveFlag);
	
	@Query(value="select new cn.com.cnc.fcc.domain.HstServer(hsi, hsid) from HstServerInfo as hsi, HstServerInfoDetails as hsid " +
			"where hsi.id = hsid.infoId and hsi.delFlag = 0 and hsi.stopFlag = 0 and " +
			"hsid.stopFlag = 0 and hsid.delFlag = 0 and hsi.hostSlaveFlag = :hostSlaveFlag and hsi.nodeId = :nodeId")
	public List<HstServer> findByNodeId(@Param("nodeId")String nodeId, @Param("hostSlaveFlag")int hostSlaveFlag);
}
