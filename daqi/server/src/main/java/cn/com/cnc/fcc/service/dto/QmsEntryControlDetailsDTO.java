package cn.com.cnc.fcc.service.dto;

public class QmsEntryControlDetailsDTO {

	private Long id;
	private String materielId;
	private String materielName;
	private String inspectionItem;
	private String technicalRequirement;
	private String standard;
	private String remark;
	private String numberCount;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getMaterielId() {
		return materielId;
	}
	public void setMaterielId(String materielId) {
		this.materielId = materielId;
	}
	public String getMaterielName() {
		return materielName;
	}
	public void setMaterielName(String materielName) {
		this.materielName = materielName;
	}
	public String getInspectionItem() {
		return inspectionItem;
	}
	public void setInspectionItem(String inspectionItem) {
		this.inspectionItem = inspectionItem;
	}
	public String getTechnicalRequirement() {
		return technicalRequirement;
	}
	public void setTechnicalRequirement(String technicalRequirement) {
		this.technicalRequirement = technicalRequirement;
	}
	public String getStandard() {
		return standard;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getNumberCount() {
		return numberCount;
	}
	public void setNumberCount(String numberCount) {
		this.numberCount = numberCount;
	}
	
}
