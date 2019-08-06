package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsMateriel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the QmsMateriel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsMaterielRepository extends JpaRepository<QmsMateriel, Long>,JpaSpecificationExecutor<QmsMateriel> {
    // 通过物料编码查询物料
    Optional<QmsMateriel> findQmsMaterielByMaterielCdAndFlagStatus(String materielCd, String flagStatus);
    //通过使用单位跟包装单位判断
    List<QmsMateriel> findByUseUnitId(Integer s);
    List<QmsMateriel> findByPackgeUnitId(Integer s);
    List<QmsMateriel> findByMaterielCd(String s);
    /**
     * 取得物料名称
     * 
     * @param parentMaterielCd
     * @param flagStatus
     * @return
     * @author DL0733
     */
	List<QmsMateriel> findByIdAndFlagStatus(Long valueOf, String string);
	List<QmsMateriel> findByMaterielCdAndFlagStatus(String materielCd, String flagStatus);
}
