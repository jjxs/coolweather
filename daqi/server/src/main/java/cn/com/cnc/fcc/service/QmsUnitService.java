package cn.com.cnc.fcc.service;

import cn.com.cnc.fcc.domain.QmsUnit;
import com.alibaba.fastjson.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface QmsUnitService {

    /**
     * 单位数据查询
     *
     * @param bianMa 模糊查询字段单位编码id
     * @param gongName 模糊查询字段单位名称
     * @param pageable 分页排序信息
     * @return
     * @author yanlgin
     */

    Page<QmsUnit> qmsUnitFindAll(String bianMa, String gongName, Pageable pageable);

    /**
     * 读取Excel
     * @param files
     * @return
     */
    JSONObject uploadData(MultipartFile files);
}
