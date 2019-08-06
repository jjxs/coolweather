package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsUnqualifiedProduct;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the QmsUnqualifiedProduct entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsUnqualifiedProductRepository extends JpaRepository<QmsUnqualifiedProduct, Long> {

    // 通过结果表找不合格数据
    List<QmsUnqualifiedProduct> findByInspectionValueId(Integer id);

    // 评审阶段状态
    List<QmsUnqualifiedProduct> findByInspectionValueIdAndApproveUserIdIsNotNull(Integer inspectionValueId);
}
