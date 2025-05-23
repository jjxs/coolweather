package cn.com.cnc.fcc.web.rest;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;


import cn.com.cnc.fcc.service.dto.LableValueDto;
import cn.com.cnc.fcc.web.rest.errors.InternalServerErrorException;
import org.hibernate.transform.ResultTransformer;
import org.hibernate.transform.Transformers;
import org.hibernate.type.StandardBasicTypes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import cn.com.cnc.fcc.domain.RbacUser;
import cn.com.cnc.fcc.repository.RbacUserRepository;
import cn.com.cnc.fcc.service.RbacUserService;
import cn.com.cnc.fcc.service.dto.RbacUserDTO;
import cn.com.cnc.fcc.service.util.DateUtil;
import cn.com.cnc.fcc.web.rest.util.PaginationUtil;

/**
 * REST controller for managing RbacUser.
 */
@RestController
@RequestMapping("/api")
public class RbacUserController {

    private final Logger log = LoggerFactory.getLogger(RbacUserController.class);

    @Autowired
    private  RbacUserRepository rbacUserRepository;
    
    private final RbacUserService rbacUserService;
    
    private final EntityManagerFactory emf;
    

    @Autowired
    DateUtil  dateUtil;
	    /**
	     * 构造函数
	     * 
	     * @param adminUserRepository
	     * @param adminUserService
	     * @param emf
	     * @param dateUtil
	     
	     */
		public RbacUserController(RbacUserRepository RbacUserRepository, EntityManagerFactory emf, DateUtil dateUtil, RbacUserService rbacUserService){
			this.rbacUserRepository = RbacUserRepository;
			this.emf = emf;
			this.dateUtil = dateUtil;
			this.rbacUserService = rbacUserService;
		}
	    /**
	     * 员工一览
	     * @param rbacUser
	     * @return 
	     * @throws URISyntaxException 
	     */
	    @GetMapping("/rbac-users/getRbacUsers")
	    @Timed
	    public ResponseEntity<List<RbacUser>> getAllRbacUsers(HttpServletRequest request, Pageable pageable) {
	        log.debug("REST request to get a page of RbacUsers");
	        // 模糊查询参数
	     	String searchUsersMes = request.getParameter("searchUsersMes");
            String userCode = request.getParameter("userCode");
	     	// 取得一览详细数据
	     	Page<RbacUser> RbacUser =  rbacUserRepository.getUserInfo(pageable,searchUsersMes,userCode);
	     	// 实例化返回头
	     	HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(RbacUser, "/api/rbac-users/getRbacUsers");
	       
	     	return new ResponseEntity<>(RbacUser.getContent(), headers, HttpStatus.OK);
	    }
	    
	    /**
		 * 新增员工
		 * 
		 * @param  新增数据集
		 * @return
		 * @throws URISyntaxException
		 */
		@PostMapping("/rbac-users/creatUsers")
		@Timed
		public Integer creatUsers(HttpServletRequest request,@RequestBody RbacUser rbacUser) throws URISyntaxException {
	
			// 插入返回结果
			Integer createUser = 0;
			String selectListVal=  request.getParameter("selectListVal");
			try {
				createUser = rbacUserService.createUser(selectListVal,rbacUser);
			} catch (Exception e) {
				// TODO: handle exception
			}
			return createUser;
		}
		
		/**
		 * 编辑员工
		 * 
		 * @param  新增数据集
		 * @return
		 * @throws URISyntaxException
		 */
		@PostMapping("/rbac-users/updateUsers")
		@Timed
		public Integer updateUsers(HttpServletRequest request,@RequestBody RbacUser rbacUser) throws URISyntaxException {
	
			// 插入返回结果
			Integer updateUser = 0;
			String selectListVal=  request.getParameter("selectListVal");
			try {
				updateUser = rbacUserService.updateUser(selectListVal,rbacUser);
			} catch (Exception e) {
				// TODO: handle exception
			}
			return updateUser;
		}
	
		    
		/**
		* 编辑角色
		* 
		* @param  userId
		* @return
		* @throws URISyntaxException
		*/
	    @GetMapping("/rbac-users/UserRoleInfo/{userId}")
	    @Timed
	    public List<RbacUserDTO> UserRoleInfo(@PathVariable Integer userId){
	    	// 返回值
	    	return rbacUserService.getUserRoleInfo(userId);
	    }
	    
	    // 获取角色列表
	    @GetMapping("/rbac-users/getRoleList")
	    @Timed
	    public List<RbacUserDTO> getRoleList(){
	    	// 返回值
	    	return rbacUserService.getRoleList();
	    }

    /**
     * 相同主键Check
     *
     * @param
     * @return
     */
    @GetMapping("/rbac-users/sameCheck")
    @Timed
    @SuppressWarnings("unchecked")
    public Integer sameCheck(HttpServletRequest request){
        Integer resultNumber = 0;
        //得到传过来的值
        String cd = request.getParameter("samecheck");
        //如果这个值在数据库里找到了，则返回1
        List<RbacUser> list = rbacUserRepository.findByUserCode(cd);
        if(list.size()!= 0){
            resultNumber = 1;
        }else{
            resultNumber = 0;
        }
        return resultNumber;
    }

    /**
     * 角色下拉框
     *
     * @param
     * @return
     */
    @GetMapping("/rbac-users/orzList")
    @Timed
    @SuppressWarnings("unchecked")
    public List<LableValueDto> getOrzList(){
        EntityManager em = emf.createEntityManager();

        List<LableValueDto> supplier = new ArrayList<LableValueDto>();
        try{
            Query query = em.createNativeQuery("SELECT\n" +
                "\tt01.organization_cd AS\n" +
                "VALUE\n" +
                "\t,\n" +
                "\tt01.organization_name AS label\n" +
                "FROM\n" +
                "\tqms_organization_info t01\n" +
                "WHERE\n" +
                "\tNOT EXISTS (\n" +
                "\t\tSELECT\n" +
                "\t\t\tt02.parent_cd\n" +
                "\t\tFROM\n" +
                "\t\t\tqms_organization_info t02\n" +
                "\t\tWHERE\n" +
                "\t\t\tt01.organization_cd = t02.parent_cd\n" +
                "\t)");
            ResultTransformer transformer = Transformers.aliasToBean(LableValueDto.class);

            supplier = query.unwrap( org.hibernate.query.NativeQuery.class )
                .addScalar("label", StandardBasicTypes.STRING)
                .addScalar("value", StandardBasicTypes.STRING)
                .setResultTransformer(transformer)
                .getResultList();
            query = null;

        }catch(Exception e){
            em.close();
            // 异常信息
            log.info(e.getMessage());
            throw new InternalServerErrorException("qmsEntryInspection could not be found");
        }finally{
            em.close();
        }

        // 返回值
        return supplier;
    }

	}
