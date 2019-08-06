package cn.com.cnc.fcc.service.dto;

import java.time.ZonedDateTime;

public class QmsBomDetaileDTO {
	private Long id;
    private String vehicleId;
    private String vehicleName;
    private Integer materielId;
    private Integer rootMaterielId;
    private String materielCd;
    private Integer vId;
    private Long mId;
    private String materielName;
    private Integer parentMaterielID;
    private String parentMaterielName;
    private String productMode;
    private String remark;
    private String makeUser;
    private ZonedDateTime makeTime;
    
	public Integer getRootMaterielId() {
		return rootMaterielId;
	}
	public void setRootMaterielId(Integer rootMaterielId) {
		this.rootMaterielId = rootMaterielId;
	}
	public String getMaterielCd() {
		return materielCd;
	}
	public void setMaterielCd(String materielCd) {
		this.materielCd = materielCd;
	}
	public String getVehicleName() {
		return vehicleName;
	}
	public void setVehicleName(String vehicleName) {
		this.vehicleName = vehicleName;
	}
	public Integer getvId() {
		return vId;
	}
	public void setvId(Integer vId) {
		this.vId = vId;
	}
	public Long getmId() {
		return mId;
	}
	public void setmId(Long mId) {
		this.mId = mId;
	}
	public String getMakeUser() {
		return makeUser;
	}
	public void setMakeUser(String makeUser) {
		this.makeUser = makeUser;
	}
	public ZonedDateTime getMakeTime() {
		return makeTime;
	}
	public void setMakeTime(ZonedDateTime makeTime) {
		this.makeTime = makeTime;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getMaterielName() {
		return materielName;
	}
	public void setMaterielName(String materielName) {
		this.materielName = materielName;
	}

	public String getParentMaterielName() {
		return parentMaterielName;
	}
	public void setParentMaterielName(String parentMaterielName) {
		this.parentMaterielName = parentMaterielName;
	}
	public String getProductMode() {
		return productMode;
	}
	public void setProductMode(String productMode) {
		this.productMode = productMode;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public String getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(String vehicleId) {
		this.vehicleId = vehicleId;
	}
	public Integer getMaterielId() {
		return materielId;
	}
	public void setMaterielId(Integer materielId) {
		this.materielId = materielId;
	}
	public Integer getParentMaterielID() {
		return parentMaterielID;
	}
	public void setParentMaterielID(Integer parentMaterielID) {
		this.parentMaterielID = parentMaterielID;
	}

    
}
