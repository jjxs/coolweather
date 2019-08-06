package cn.com.cnc.fcc.service;

import java.util.List;

import org.springframework.stereotype.Service;

import cn.com.cnc.fcc.domain.RbacMenu;
import cn.com.cnc.fcc.domain.RbacRight;
import cn.com.cnc.fcc.service.dto.RbacRightDTO;

/**
 * Service class for managing users.
 */
@Service
public interface RbacRightService {
	
	/**
	 * 获取menu
	 */
	List<RbacMenu> getMenuInfo();
	
	/**
	 * 新增权限
	 */
	Integer createRight(List<String> menuList, RbacRight rbacRight);
	/**
	 * 获取权限组
	 * @param rightId 
	 */
	List<RbacRightDTO> getRightMenuInfo(Integer rightId);
	/**
	 * 编辑权限
	 */
	Integer updateRight(List<String> menuList, RbacRight rbacRight);
	
}
