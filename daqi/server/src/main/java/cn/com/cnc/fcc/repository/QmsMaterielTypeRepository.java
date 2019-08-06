package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsMaterielType;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QmsMaterielType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsMaterielTypeRepository extends JpaRepository<QmsMaterielType, Long> {

	List<QmsMaterielType> findByMaterielTypeCdAndFlagStatus(String materielTypeCd, String string);

	List<QmsMaterielType> findByIdAndFlagStatus(Long id, String flag);

}
