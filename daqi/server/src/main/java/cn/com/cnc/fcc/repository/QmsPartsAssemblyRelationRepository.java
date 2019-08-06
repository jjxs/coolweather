package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsPartsAssemblyRelation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the QmsPartsAssemblyRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsPartsAssemblyRelationRepository extends JpaRepository<QmsPartsAssemblyRelation, Long> {
    Optional<QmsPartsAssemblyRelation> findAllByBomTechnologyIdAndFlagStatus(Integer bomTechnologyId, String FlagStatus);

    /**
     * 取得工序装配关系表信息
     * 
     * @param FlagStatus 删除标志
     * @param bomTechnologyId 工艺表ID
	 * @author DL0733
     * @return
     */
	List<QmsPartsAssemblyRelation> findAllByFlagStatusAndBomTechnologyId(String FlagStatus, Integer bomTechnologyId);

	QmsPartsAssemblyRelation findByIdAndFlagStatus(Long id, String string);
	@Transactional
	Integer deleteByBomTechnologyId(Integer valueOf);

//    List<QmsPartsAssemblyRelation>  findByAssemblyMaterielCd(String s);
}
