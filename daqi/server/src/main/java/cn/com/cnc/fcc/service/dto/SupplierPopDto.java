package cn.com.cnc.fcc.service.dto;

public class SupplierPopDto {
    // 供应商id
    Long id;
    // 供应商编码
    String supplierCd;
    // 供应商名称
    String supplierName;
    // 评定记录
    String assRecord;
    // 备注
    String remark;
    // 供应商分类名称
    String supplierClassName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getAssRecord() {
        return assRecord;
    }

    public void setAssRecord(String assRecord) {
        this.assRecord = assRecord;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getSupplierClassName() {
        return supplierClassName;
    }

    public void setSupplierClassName(String supplierClassName) {
        this.supplierClassName = supplierClassName;
    }
}
