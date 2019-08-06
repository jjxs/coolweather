package cn.com.cnc.fcc.service;

import cn.com.cnc.fcc.domain.QmsSupplierClass;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface QmsSupplierClassService {
    /**
     * 单位数据查询
     *
     * @param bianMa 模糊查询字段供应商分类编码id
     * @param gongName 模糊查询字段供应商分类名称
     * @param pageable 分页排序信息
     * @return
     * @author yanlgin
     */
    Page<QmsSupplierClass> qmsSupplierClassFindAll(String bianMa, String gongName, Pageable pageable);
}
