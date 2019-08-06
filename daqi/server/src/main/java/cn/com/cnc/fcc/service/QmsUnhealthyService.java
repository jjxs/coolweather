package cn.com.cnc.fcc.service;

import java.util.List;

import org.springframework.stereotype.Service;

import cn.com.cnc.fcc.domain.QmsUnhealthy;
import cn.com.cnc.fcc.service.dto.QmsOrganizationInfoDTO;

@Service
public interface QmsUnhealthyService {

	/**
	 * 取得父级数据
	 * 
	 * @param organizationCd
	 * @param organizationName
	 * @return
	 */
	List<QmsOrganizationInfoDTO> getParentNodeListInfo(String organizationCd, String organizationName);

	/**
	 * 取得所有数据
	 * 
	 */
	List<QmsOrganizationInfoDTO> organListInfo();

	/**
	 * 删除选中树数据
	 * 
	 * @param id
	 * @return
	 */
	Integer deleteNodeInfos(String id);

	List<QmsUnhealthy> getCheckIsUser(String id);

}
