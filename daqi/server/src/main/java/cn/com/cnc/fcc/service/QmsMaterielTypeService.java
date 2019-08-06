package cn.com.cnc.fcc.service;

import java.util.List;

import cn.com.cnc.fcc.domain.materialTypeSelectionDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;

import cn.com.cnc.fcc.service.dto.QmsOrganizationInfoDTO;

@Service
public interface QmsMaterielTypeService {

	/**
	 * 物料分类父级数据
	 * 
	 * @param materielTypeCd 模糊禅熏物料分类编码
	 * @param materielTypeName 模糊查询物料分类名称
	 * @return
	 */
	List<QmsOrganizationInfoDTO> getParentNodeListInfo(String materielTypeCd, String materielTypeName);

	/**
	 * 物料分类取得所有数据
	 * 
	 * @return
	 */
	List<QmsOrganizationInfoDTO> organListInfo();

	/**
	 * 删除选中节点及其以下的所有数据
	 * 
	 * @param id 选中节点ID
	 * @return
	 */
	Integer deleteNodeInfos(String id);

	/**
	 * 物料分类文件导入数据获取
	 * 
	 * @param files
	 * @return
	 */
	JSONObject uploadUserDepart(MultipartFile files);

    /**
     * 取得物料分类pupop画面一览数据
     *
     * @param bianMa
     * @param gongName
     * @return
     * @author DL0761
     */
    List<materialTypeSelectionDto> qmsMaterialTypeFindAll(String bianMa, String gongName);

}
