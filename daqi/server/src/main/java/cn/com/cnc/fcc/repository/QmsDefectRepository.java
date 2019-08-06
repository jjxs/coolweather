package cn.com.cnc.fcc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cn.com.cnc.fcc.domain.QmsDefect;


/**
 * Spring Data  repository for the QmsDefect entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsDefectRepository extends JpaRepository<QmsDefect, Long> {

	List<QmsDefect> findByDefectCdAndFlagStatus(String defectCd, String string);

	List<QmsDefect> findByIdAndFlagStatus(Long id, String string);

}
