package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsOrganizationInfo;
import cn.com.cnc.fcc.service.dto.QmsOrganizationInfoDTO;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsOrganizationInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsOrganizationInfoRepository extends JpaRepository<QmsOrganizationInfo, Long> {

	/**
	 * 新增组织信息取得当前组织编码是否已存在
	 * 
	 * @param organizationCd 组织编码
	 * @param flagStatus 删除标志
	 * @return
	 * @author DL0733
	 */
	List<QmsOrganizationInfo> findByOrganizationCdAndFlagStatus(String organizationCd, String flagStatus);
	

}
