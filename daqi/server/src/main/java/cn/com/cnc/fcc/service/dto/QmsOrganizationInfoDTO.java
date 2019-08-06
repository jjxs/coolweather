package cn.com.cnc.fcc.service.dto;

import java.math.BigInteger;

public class QmsOrganizationInfoDTO {
	private BigInteger id;
    private String parentCd;
    private String organizationCd;
    private String organizationName;
    private String vehicleType;
    private String materielCd;
    private String materielName;
    private String parentMaterielCd;
    private String rootMaterielCd;
    private String rootMaterielName;
    
    public String getRootMaterielCd() {
		return rootMaterielCd;
	}

	public void setRootMaterielCd(String rootMaterielCd) {
		this.rootMaterielCd = rootMaterielCd;
	}

	public String getRootMaterielName() {
		return rootMaterielName;
	}

	public void setRootMaterielName(String rootMaterielName) {
		this.rootMaterielName = rootMaterielName;
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

    public String getMaterielName() {
        return materielName;
    }

    public void setMaterielName(String materielName) {
        this.materielName = materielName;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }


	public BigInteger getId() {
		return id;
	}
	public void setId(BigInteger id) {
		this.id = id;
	}
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
	
}
