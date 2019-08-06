package cn.com.cnc.fcc.service.dto;

public class GroupEntryControlDetailsInfoDTO {
	private String materielCd;
	private String inspectionItem;
	private String inspectionInstrument;
	private String standard;
	private String upperDeviation;
	private String lowerDeviation;
	private String inspectionResultDiff;
	private String technicalRequirement;
	private String remark;
	public String getMaterielCd() {
		return materielCd;
	}
	public void setMaterielCd(String materielCd) {
		this.materielCd = materielCd;
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
	public String getInspectionInstrument() {
		return inspectionInstrument;
	}
	public void setInspectionInstrument(String inspectionInstrument) {
		this.inspectionInstrument = inspectionInstrument;
	}
	public String getStandard() {
		return standard;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public String getUpperDeviation() {
		return upperDeviation;
	}
	public void setUpperDeviation(String upperDeviation) {
		this.upperDeviation = upperDeviation;
	}
	public String getLowerDeviation() {
		return lowerDeviation;
	}
	public void setLowerDeviation(String lowerDeviation) {
		this.lowerDeviation = lowerDeviation;
	}
	public String getInspectionResultDiff() {
		return inspectionResultDiff;
	}
	public void setInspectionResultDiff(String inspectionResultDiff) {
		this.inspectionResultDiff = inspectionResultDiff;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
