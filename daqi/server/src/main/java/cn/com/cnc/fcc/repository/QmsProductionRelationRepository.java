package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsProductionRelation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the QmsProductionRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsProductionRelationRepository extends JpaRepository<QmsProductionRelation, Long> {

    // 排除自己判断是否重复(自制)
    List<QmsProductionRelation> findAllByUseProductIdAndIdIsNot(Integer useProductId, Long id);

    // 排除自己判断是否重复(外购or外协)
    List<QmsProductionRelation> findAllByAssemblyMaterielIdAndIdIsNot(Integer assemblyMaterielId, Long id);

    // 生产检验装配关系表中指定物料进场的数量
    List<QmsProductionRelation> findByAssemblyMaterielId(Integer assemblyMaterielId);

    // 根据生产检验Id查询
    List<QmsProductionRelation> findByProductionInspectionId(Integer productionInspectionId);
}
