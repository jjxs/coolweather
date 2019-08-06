package cn.com.cnc.fcc.service.dto;

public class GroupBOMInfoDTO {

	private String vehicleType;
	private String parentMaterielCd;
	private String materielCd;
	private String remark;
	public String getVehicleType() {
		return vehicleType;
	}
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}
	public String getParentMaterielCd() {
		return parentMaterielCd;
	}
	public void setParentMaterielCd(String parentMaterielCd) {
		this.parentMaterielCd = parentMaterielCd;
	}
	public String getMaterielCd() {
		return materielCd;
	}
	public void setMaterielCd(String materielCd) {
		this.materielCd = materielCd;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
