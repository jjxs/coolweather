package cn.com.cnc.fcc.service.dto;

import java.util.List;

public class QmsOrganizationInfoLeftDTO {
	private QmsOrganizationInfoDTO data;
	private List<QmsOrganizationInfoLeftDTO> children;

	public QmsOrganizationInfoDTO getData() {
		return data;
	}
	public void setData(QmsOrganizationInfoDTO data) {
		this.data = data;
	}
	public List<QmsOrganizationInfoLeftDTO> getChildren() {
		return children;
	}
	public void setChildren(List<QmsOrganizationInfoLeftDTO> children) {
		this.children = children;
	}
	
}
