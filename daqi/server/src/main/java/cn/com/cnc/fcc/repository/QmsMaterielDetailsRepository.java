package cn.com.cnc.fcc.repository;

import cn.com.cnc.fcc.domain.QmsMaterielDetails;
import cn.com.cnc.fcc.domain.QmsSupplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the QmsMaterielDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsMaterielDetailsRepository extends JpaRepository<QmsMaterielDetails, Long> {

//    List<QmsMaterielDetails> findBySupplierCd(String s);

//    List<QmsMaterielDetails> findByMaterielCd(String s);

    @Modifying
    @Transactional
    @Query("delete from QmsMaterielDetails t01 where t01.entryId = ?1")
    int deleteByEntryId(Integer engineerId);

    List<QmsMaterielDetails> findAllByEntryIdAndFlagStatus(Integer id, String flagStatus);

    Optional<QmsMaterielDetails> findByIdAndFlagStatus(Long id, String flagStatus);
}
