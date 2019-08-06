package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsProductionInspection;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the QmsProductionInspection entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsProductionInspectionRepository extends JpaRepository<QmsProductionInspection, Long> {
    List<QmsProductionInspection> findByMaterielId(Integer s);
    List<QmsProductionInspection> findByMaterielIdAndSerialNumber(Integer s,String m);

    /**
     *  DL0769
     * 工序id 和 编号重复check
     * @param bomTechnologyId
     * @param serialNumber
     * @return
     */
    List<QmsProductionInspection> findByBomTechnologyIdAndSerialNumber(Integer bomTechnologyId, String serialNumber);


    /**
     *  DL0769
     * 工序id 和 中梁号重复check
     * @param bomTechnologyId
     * @param workno
     * @return
     */
    List<QmsProductionInspection> findByMaterielIdAndWorkno(Integer materielId, String workno);

    /**
     * 查看该工艺id是否存在于生产检验表中
     * 
     * @param valueOf
     * @param string
     * @return
     */
	List<QmsProductionInspection> findByBomTechnologyIdAndFlagStatus(Integer BomTechnologyId, String FlagStatus);
}
