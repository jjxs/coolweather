package cn.com.cnc.fcc.service;

import java.util.List;

import org.springframework.stereotype.Service;

import cn.com.cnc.fcc.domain.RbacUser;
import cn.com.cnc.fcc.service.dto.RbacUserDTO;

/**
 * Service class for managing users.
 */
@Service
public interface RbacUserService {
	
    /**
	* 新增员工
	*/
	Integer createUser(String selectListVal, RbacUser rbacUser);

	/**
	* 编辑员工
	*/
	Integer updateUser(String selectListVal, RbacUser rbacUser);
	
	/**
	* 获取角色下拉列表
	*/
	List<RbacUserDTO> getUserRoleInfo(Integer userId);
	
	/**
	* 获取角色下拉列表
	*/
	List<RbacUserDTO> getRoleList();
	
}
