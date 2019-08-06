package cn.com.cnc.fcc.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;

import cn.com.cnc.fcc.service.dto.QmsEntryControlDetailsDTO;

@Service
public interface QmsEntryControlDetailsService {
	
	/**
	 * 入厂检验一览数据获取
	 * 
	 * @param pageable 分页排序信息
	 * @param materielCdVague 物料编码
	 * @param materielNameVague 物料名称
	 * @param inspectionItemVague 检查项目
	 * @author DL0733
	 * @return
	 */
	List<QmsEntryControlDetailsDTO> selectAllInfo(HashMap<String, Object> param);
	/**
	 * 取得总条数
	 * 
	 * @param param
	 * @author DL0733
	 * @return
	 */
	List<QmsEntryControlDetailsDTO> getAllInfoNumber(HashMap<String, Object> param);
	/**
	 * 获取上传文件
	 * 
	 * @param logo
	 * @param request
	 * @return
	 */
	JSONObject uploadUserDepart(MultipartFile files);

    /**
     * 读取Excel
     * @param files
     * @return
     */
    JSONObject uploadData(MultipartFile files);
}
