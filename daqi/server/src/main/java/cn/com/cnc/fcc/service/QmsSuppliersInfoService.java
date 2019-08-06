package cn.com.cnc.fcc.service;

import cn.com.cnc.fcc.service.dto.SupplierPopDto;
import com.alibaba.fastjson.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import cn.com.cnc.fcc.domain.QmsSupplier;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface QmsSuppliersInfoService {
	
	/**
	 * 供应商数据查询
	 * 
	 * @param bianMa 模糊查询字段供应商编码id
	 * @param gongName 模糊查询字段供应商名称
	 * @param pageable 分页排序信息
	 * @return
	 * @author yanlgin
	 */
	
	Page<QmsSupplier> qmsSuppliersInfoFindAll(String bianMa,String gongName, Pageable pageable);

    /**
     * 读取Excel
     * @param files
     * @return
     */
    JSONObject uploadData(MultipartFile files);


    /**
     * 供应商数据查询
     *
     * @param supplierCd 供应商编码模糊查询
     * @param supplierName 供应商名称模糊查询
     * @return
     * @author yanlgin
     */

    List<SupplierPopDto> findBySupplierCdAndSupplierName(String supplierCd, String supplierName, String materielId);
}
