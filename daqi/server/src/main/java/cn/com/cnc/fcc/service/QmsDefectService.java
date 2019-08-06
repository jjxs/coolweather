package cn.com.cnc.fcc.service;

import java.util.List;

import org.springframework.stereotype.Service;

import cn.com.cnc.fcc.domain.QmsDefect;
import cn.com.cnc.fcc.service.dto.QmsOrganizationInfoDTO;

@Service
public interface QmsDefectService {

	/**
	 * 取得父级数据
	 * 
	 * @param defectCd
	 * @param defectName
	 * @return
	 */
	List<QmsOrganizationInfoDTO> getParentNodeListInfo(String defectCd, String defectName);

	/**
	 * 取得所有树数据
	 * 
	 * @return
	 */
	List<QmsOrganizationInfoDTO> organListInfo();

	/**
	 * 删除选中树及其以下数据
	 * 
	 * @param id 
	 * @return
	 */
	Integer deleteNodeInfos(String id);

	List<QmsDefect> getCheckIsUser(String defectCd);

}
