package cn.com.cnc.fcc.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;

import cn.com.cnc.fcc.service.dto.QmsOrganizationInfoDTO;

@Service
public interface QmsOrganizationInfoService {

	List<QmsOrganizationInfoDTO> organListInfo();

	/**
	 *  取得父节点
	 * @param organizationCd 组织ID
	 * @param organizationName 组织名称
	 * @return
	 */
	List<QmsOrganizationInfoDTO> getParentNodeListInfo(String organizationCd, String organizationName);

	/**
	 * 删除节点
	 * @param id 组织编码
	 * @return
	 */
	Integer deleteNodeInfos(String id);

	/**
	 * 读取Excel
	 * @param files
	 * @return
	 */
	JSONObject uploadUserDepart(MultipartFile files);

}
