package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsProductionInspectionResult;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the QmsProductionInspectionResult entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsProductionInspectionResultRepository extends JpaRepository<QmsProductionInspectionResult, Long> {

    // 通过检验结果表ID， 生产检验ID， 自互专区查询
    List<QmsProductionInspectionResult> findByInspectionIdAndInspectionValueIdAndInspectionDiff(Integer inspectionId, Integer inspectionValueId, String inspectionDiff);
}
