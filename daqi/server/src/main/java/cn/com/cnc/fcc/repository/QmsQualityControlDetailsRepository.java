package cn.com.cnc.fcc.repository;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import cn.com.cnc.fcc.domain.QmsQualityControlDetails;

/**
 * Spring Data  repository for the QmsQualityControlDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsQualityControlDetailsRepository extends JpaRepository<QmsQualityControlDetails, Long> {
    /**
     * 通过工艺id获取结果表数据
     * @param bomTechnologyId
     * @return
     */
    List<QmsQualityControlDetails> findByBomTechnologyId(Integer bomTechnologyId);
	/**
	 * 编辑取得工序质量控制点详细表信息
	 * 
	 * @param valueOf bom-Technologid
	 * @param string 删除标志
	 * @author DL0733
	 * @return
	 */
	List<QmsQualityControlDetails> findByBomTechnologyIdAndFlagStatus(Integer id, String flagStatus);

	QmsQualityControlDetails findByIdAndFlagStatus(Long id, String string);

	@Transactional
	Integer deleteByBomTechnologyId(Integer valueOf);
}
