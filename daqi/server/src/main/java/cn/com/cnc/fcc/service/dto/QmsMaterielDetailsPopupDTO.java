package cn.com.cnc.fcc.service.dto;

public class QmsMaterielDetailsPopupDTO {
	
	private Long id;
	private Integer entryId;
	private String goodsCd;
	private String madeFactoryCd;
	private Integer entryQuantity;
	private String entryType;
	private String madeYMD;
	private String materielCd;
	private String materielName;
	private String supplierCd;
	private String supplierName;

	public Integer getEntryQuantity() {
		return entryQuantity;
	}
	public void setEntryQuantity(Integer entryQuantity) {
		this.entryQuantity = entryQuantity;
	}
	public String getEntryType() {
		return entryType;
	}
	public void setEntryType(String entryType) {
		this.entryType = entryType;
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
	public String getSupplierCd() {
		return supplierCd;
	}
	public void setSupplierCd(String supplierCd) {
		this.supplierCd = supplierCd;
	}
	public String getSupplierName() {
		return supplierName;
	}
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Integer getEntryId() {
		return entryId;
	}
	public void setEntryId(Integer entryId) {
		this.entryId = entryId;
	}
	public String getGoodsCd() {
		return goodsCd;
	}
	public void setGoodsCd(String goodsCd) {
		this.goodsCd = goodsCd;
	}
	public String getMadeFactoryCd() {
		return madeFactoryCd;
	}
	public void setMadeFactoryCd(String madeFactoryCd) {
		this.madeFactoryCd = madeFactoryCd;
	}
	public String getMadeYMD() {
		return madeYMD;
	}
	public void setMadeYMD(String madeYMD) {
		this.madeYMD = madeYMD;
	}
	
	
}
