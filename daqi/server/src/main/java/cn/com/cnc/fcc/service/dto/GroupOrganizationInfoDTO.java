package cn.com.cnc.fcc.service.dto;

public class GroupOrganizationInfoDTO {
	
	private String parentCd;
	private String organizationCd;
	private String organizationName;
	private String attribute;
	
	public String getParentCd() {
		return parentCd;
	}
	public void setParentCd(String parentCd) {
		this.parentCd = parentCd;
	}
	public String getOrganizationCd() {
		return organizationCd;
	}
	public void setOrganizationCd(String organizationCd) {
		this.organizationCd = organizationCd;
	}
	public String getOrganizationName() {
		return organizationName;
	}
	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}
	public String getAttribute() {
		return attribute;
	}
	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}
	

}
