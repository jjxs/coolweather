package cn.com.cnc.fcc.service.dto;

public class MaterielPopDto {
    // 物料id
    Long id;
    // 物料编码
    String materielCd;
    // 物料名称
    String MaterielName;
    // 供应商id
    Long supplierId;
    // 供应商编码
    String supplierCd;
    // 供应商名称
    String supplierName;
    // 型号
    String type;
    // 图号
    String figureNumber;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaterielCd() {
        return materielCd;
    }

    public void setMaterielCd(String materielCd) {
        this.materielCd = materielCd;
    }

    public String getMaterielName() {
        return MaterielName;
    }

    public void setMaterielName(String materielName) {
        MaterielName = materielName;
    }

    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFigureNumber() {
        return figureNumber;
    }

    public void setFigureNumber(String figureNumber) {
        this.figureNumber = figureNumber;
    }
}
