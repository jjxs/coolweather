package cn.com.cnc.fcc.service;

import cn.com.cnc.fcc.domain.QmsProcess;
import com.alibaba.fastjson.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface QmsProcessService {

    /**
     * 工序数据查询
     *
     * @param bianMa 模糊查询字段工序编码id
     * @param gongName 模糊查询字段工序名称
     * @param pageable 分页排序信息
     * @return
     * @author yanlgin
     */

    Page<QmsProcess> qmsProcessFindAll(String bianMa, String gongName, Pageable pageable);

    /**
     * 读取Excel
     * @param files
     * @return
     */
    JSONObject uploadData(MultipartFile files);
}
