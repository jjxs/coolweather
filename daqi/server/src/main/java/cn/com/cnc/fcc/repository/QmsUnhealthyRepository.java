package cn.com.cnc.fcc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cn.com.cnc.fcc.domain.QmsUnhealthy;


/**
 * Spring Data  repository for the QmsUnhealthy entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QmsUnhealthyRepository extends JpaRepository<QmsUnhealthy, Long> {

	List<QmsUnhealthy> findByUnhealthyCdAndFlagStatus(String unhealthyCd, String string);

	List<QmsUnhealthy> findByIdAndFlagStatus(Long id, String flagStatus);

}
