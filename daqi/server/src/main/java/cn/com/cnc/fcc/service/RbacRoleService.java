package cn.com.cnc.fcc.service;

import java.util.List;

import org.springframework.stereotype.Service;

import cn.com.cnc.fcc.domain.RbacRole;
import cn.com.cnc.fcc.service.dto.RbacRoleDTO;
import cn.com.cnc.fcc.service.dto.RbacRightDTO;

/**
 * Service class for managing users.
 */
@Service
public interface RbacRoleService {
	
    /**
	* 新增角色
	*/
	Integer createRole(String selectListVal,RbacRole rbacRole);
	
	/**
	* 编辑角色
	*/
	Integer updateRole(String selectListVal, RbacRole rbacRole);

	/**
	* 角色编辑画面赋值权限
	*/
	List<RbacRoleDTO> getRoleRightInfo(Integer roleId);
	
	/**
	* 权限下拉列表
	*/
	List<RbacRightDTO> getRightList();
	
}
