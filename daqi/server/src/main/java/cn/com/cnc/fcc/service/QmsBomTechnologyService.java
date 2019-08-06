package cn.com.cnc.fcc.service;

import cn.com.cnc.fcc.domain.QmsBomTechnologyDTO;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface QmsBomTechnologyService {

    /**
     * 取得产品信息画面一览数据
     *
     * @param materielCdIn
     * @param materielNameIn
     * @param technologyNameIn
     * @return
     * @author DL0761
     */
    List<QmsBomTechnologyDTO> qmsTechnologyFindAll(String materielCdIn, String materielNameIn, String technologyNameIn);

}
