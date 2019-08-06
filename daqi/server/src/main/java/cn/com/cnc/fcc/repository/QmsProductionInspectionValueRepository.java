package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsProductionInspectionValue;
import io.swagger.models.auth.In;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the QmsProductionInspectionValue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsProductionInspectionValueRepository extends JpaRepository<QmsProductionInspectionValue, Long> {

    // 通过生产任务Id, 自互专区查询结果表
    Optional<QmsProductionInspectionValue> findByInspectionIdAndInspectionDiff(Integer inspectionId, String inspectionDiff);

    // 通过生产id查询生产表
    List<QmsProductionInspectionValue> findByInspectionId(Integer inspectionId);
}
