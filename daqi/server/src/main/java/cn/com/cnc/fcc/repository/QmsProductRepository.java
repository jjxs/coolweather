package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsProduct;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the QmsProduct entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsProductRepository extends JpaRepository<QmsProduct, Long> {
    /**
     * 查询产品表是否存在该物料Id和编号
     * DL0769
     * @param productNum
     * @param materielId
     * @return
     */
    List<QmsProduct> findByProductNumAndMaterielId(String productNum, Integer materielId);

    List<QmsProduct> findByProductNum(String productNum);
}
