package cn.com.cnc.fcc.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import cn.com.cnc.fcc.service.dto.BomTechnologGroupDTO;
import cn.com.cnc.fcc.service.dto.DropDowmValueDTO;
import cn.com.cnc.fcc.service.dto.ProcessInfomationsRightListDTO;
import cn.com.cnc.fcc.service.dto.QmsOrganizationInfoDTO;
import cn.com.cnc.fcc.service.dto.QmsPartsAssemblyRelationOwnerDTO;

@Service
public interface QmsProcessInformationsService {

	/**
	 * 取得父级信息
	 * 
	 * @param materielCd
	 * @param materielName
	 * @return
	 */
	List<QmsOrganizationInfoDTO> getParentNodeListInfo(String materielCd, String materielName);

	/**
	 * 取得所有信息
	 * 
	 * @return
	 */
	List<QmsOrganizationInfoDTO> organListInfo();

	List<ProcessInfomationsRightListDTO> selectAllInfo(HashMap<String, Object> param);

	List<ProcessInfomationsRightListDTO> getAllInfoNumber(HashMap<String, Object> param);
	/**
	 * 取得专检角色和互检角色列表数据
	 * 
	 * @return
	 */
	List<DropDowmValueDTO> getCarTypeInfo();
	/**
	 * 取得隶属单位列表数据
	 * 
	 * @return
	 */
	List<DropDowmValueDTO> getSubordinateUnitsInfo();
	/**
	 * 取得作业班组列表数据
	 * 
	 * @return
	 */
	List<DropDowmValueDTO> getWorkTeamInfo();
	/**
	 * 取得工艺下拉表数据
	 * 
	 * @return
	 */
	List<DropDowmValueDTO> getAllTechnology(String masterCd);

	/**
	 * 数据新增
	 * 
	 * @param pomTechnologGroupDTO
	 * @return
	 */
	Integer createInfo(BomTechnologGroupDTO bomTechnologGroupDTO);

	/**
	 * 附件表数据添加
	 * @param inspectionInfoId
	 * @param inspectionKbn
	 * @param enclosureAddress
	 * @return
	 */
	Boolean uploadEnclosure(Integer inspectionInfoId, String inspectionKbn, String enclosureAddress);

	/**
	 * 取得工序装配信息
	 * 
	 * @param string
	 * @param valueOf
	 * @return
	 */
	List<QmsPartsAssemblyRelationOwnerDTO> getFlagStatusAndBomTechnologyId(String FlagStatus, Integer BomTechnologyId);
	/**
	 * 数据更新
	 * 
	 * @param pomTechnologGroupDTO
	 * @return
	 */
	Integer updateInfo(BomTechnologGroupDTO bomTechnologGroupDTO);

	Boolean deleteEnclosure(Integer inspectionInfoId, String inspectionKbn, String enclosureAddress);

	/**
	 * 默认工艺
	 * 
	 * @param hiddenRightMaterielId
	 * @param technologyCd
	 * @return
	 */
	Integer updateDefaultProcessInfo(Integer hiddenRightMaterielId, String technologyCd);

	/**
	 * 复制工艺
	 * 
	 * @param hiddenRightMaterielId 物料id
	 * @param technologyCd 新工艺编码
	 * @param technologyName 新工艺名称
	 * @param copyTechnologyCd 被复制工艺编码
	 * @return
	 */
	HashMap<String,Object> createCopyProcessInfo(Integer hiddenRightMaterielId, String technologyCd, String technologyName, String copyTechnologyCd);

}
