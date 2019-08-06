package cn.com.cnc.fcc.service.dto;

import java.time.ZonedDateTime;

public class QmsPartsAssemblyRelationOwnerDTO {
	private Long id;
	private Integer bomTechnologyId;
	private Integer assemblyNum;
	private Integer assemblyMaterielId;
	private String assemblyMaterielCd;
	private String assemblyMaterielName;
	private Integer assemblyCount;
	private String remark;
	private String flagStatus;
	private String compPkid;
	private String reserveFirst;
	private String reserveSecond;
	private String reserveThird;
	private String makeUser;
	private ZonedDateTime makeTime;
	private String modifyUser;
	private ZonedDateTime modifyTime;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Integer getBomTechnologyId() {
		return bomTechnologyId;
	}
	public void setBomTechnologyId(Integer bomTechnologyId) {
		this.bomTechnologyId = bomTechnologyId;
	}
	public Integer getAssemblyNum() {
		return assemblyNum;
	}
	public void setAssemblyNum(Integer assemblyNum) {
		this.assemblyNum = assemblyNum;
	}
	public Integer getAssemblyMaterielId() {
		return assemblyMaterielId;
	}
	public void setAssemblyMaterielId(Integer assemblyMaterielId) {
		this.assemblyMaterielId = assemblyMaterielId;
	}
	public String getAssemblyMaterielCd() {
		return assemblyMaterielCd;
	}
	public void setAssemblyMaterielCd(String assemblyMaterielCd) {
		this.assemblyMaterielCd = assemblyMaterielCd;
	}
	public String getAssemblyMaterielName() {
		return assemblyMaterielName;
	}
	public void setAssemblyMaterielName(String assemblyMaterielName) {
		this.assemblyMaterielName = assemblyMaterielName;
	}
	public Integer getAssemblyCount() {
		return assemblyCount;
	}
	public void setAssemblyCount(Integer assemblyCount) {
		this.assemblyCount = assemblyCount;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getFlagStatus() {
		return flagStatus;
	}
	public void setFlagStatus(String flagStatus) {
		this.flagStatus = flagStatus;
	}
	public String getCompPkid() {
		return compPkid;
	}
	public void setCompPkid(String compPkid) {
		this.compPkid = compPkid;
	}
	public String getReserveFirst() {
		return reserveFirst;
	}
	public void setReserveFirst(String reserveFirst) {
		this.reserveFirst = reserveFirst;
	}
	public String getReserveSecond() {
		return reserveSecond;
	}
	public void setReserveSecond(String reserveSecond) {
		this.reserveSecond = reserveSecond;
	}
	public String getReserveThird() {
		return reserveThird;
	}
	public void setReserveThird(String reserveThird) {
		this.reserveThird = reserveThird;
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
	public String getModifyUser() {
		return modifyUser;
	}
	public void setModifyUser(String modifyUser) {
		this.modifyUser = modifyUser;
	}
	public ZonedDateTime getModifyTime() {
		return modifyTime;
	}
	public void setModifyTime(ZonedDateTime modifyTime) {
		this.modifyTime = modifyTime;
	}
	
}
