package cn.com.cnc.fcc.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;

import cn.com.cnc.fcc.service.dto.DropDowmValueDTO;
import cn.com.cnc.fcc.service.dto.QmsOrganizationInfoDTO;

@Service
public interface QmsBomTreeService {

	/**
	 * 取得父级物料编码
	 * 
	 * @param materielCd
	 * @param materielName
	 * @author DL0733
	 * @return
	 */
	List<QmsOrganizationInfoDTO> getParentNodeListInfo(String materielCd, String materielName);

	/**
	 * 取得物料信息
	 * 
	 * @author DL0733
	 * @return
	 */
	List<QmsOrganizationInfoDTO> organListInfo();

	/**
	 * 删除选中树节点及其以下数据
	 * 
	 * @param id
	 * @author DL0733
	 * @param hidVehicleType 
	 * @return
	 */
	Integer deleteNodeInfos(String id, String hidVehicleType);

	/**
	 * 获取上传文件内容
	 * 
	 * @param files
	 * @author DL0733
	 * @return
	 */
	JSONObject uploadUserDepart(MultipartFile files);
	/**
	 * 取得车型列表数据
	 * 
	 * @return
	 */
	List<DropDowmValueDTO> getCarTypeInfo();

}
