package cn.com.cnc.fcc.service.dto;

import java.util.ArrayList;
import java.util.List;

import cn.com.cnc.fcc.domain.QmsBomTechnology;
import cn.com.cnc.fcc.domain.QmsEnclosure;
import cn.com.cnc.fcc.domain.QmsQualityControlDetails;

public class BomTechnologGroupDTO {
	
	private QmsBomTechnology  qmsBomTechnology= new QmsBomTechnology();
	private List<QmsQualityControlDetails> qmsQualityControlDetails = new ArrayList<QmsQualityControlDetails>();
	private List<QmsPartsAssemblyRelationOwnerDTO> qmsPartsAssemblyRelation = new ArrayList<QmsPartsAssemblyRelationOwnerDTO>();
	private List<QmsEnclosure> qmsEnclosure = new ArrayList<QmsEnclosure>();
	
	public QmsBomTechnology getQmsBomTechnology() {
		return qmsBomTechnology;
	}
	public void setQmsBomTechnology(QmsBomTechnology qmsBomTechnology) {
		this.qmsBomTechnology = qmsBomTechnology;
	}
	public List<QmsQualityControlDetails> getQmsQualityControlDetails() {
		return qmsQualityControlDetails;
	}
	public void setQmsQualityControlDetails(List<QmsQualityControlDetails> qmsQualityControlDetails) {
		this.qmsQualityControlDetails = qmsQualityControlDetails;
	}

	public List<QmsPartsAssemblyRelationOwnerDTO> getQmsPartsAssemblyRelation() {
		return qmsPartsAssemblyRelation;
	}
	public void setQmsPartsAssemblyRelation(List<QmsPartsAssemblyRelationOwnerDTO> qmsPartsAssemblyRelation) {
		this.qmsPartsAssemblyRelation = qmsPartsAssemblyRelation;
	}
	public List<QmsEnclosure> getQmsEnclosure() {
		return qmsEnclosure;
	}
	public void setQmsEnclosure(List<QmsEnclosure> qmsEnclosure) {
		this.qmsEnclosure = qmsEnclosure;
	}
	

}
