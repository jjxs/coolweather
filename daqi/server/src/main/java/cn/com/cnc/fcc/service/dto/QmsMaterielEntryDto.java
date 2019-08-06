package cn.com.cnc.fcc.service.dto;

/**
 * QmsMaterielSupplierDto
 * @author Dl0777
 */
public class QmsMaterielEntryDto {
    // id
    Long id;
    // 物料编码
    String materielCd;
    // 物料名称
    String materielName;
    // 供应商编码
    String supplierCd;
    // 供应商名称
    String SupplierName;
    // 图号
    String figureNumber;
    // 规格型号
    String specificationType;
    // 附件
    String purchaseOrderNumber;
    // 采购单号
    String flagInspect;
    // 检验状态
    String enclosure;
    // 进场时间
    String entryDate;
    // 检验类型
    String checkType;

    public String getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(String entryDate) {
        this.entryDate = entryDate;
    }

    public String getCheckType() {
        return checkType;
    }

    public void setCheckType(String checkType) {
        this.checkType = checkType;
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
        return SupplierName;
    }

    public void setSupplierName(String supplierName) {
        SupplierName = supplierName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFigureNumber() {
        return figureNumber;
    }

    public void setFigureNumber(String figureNumber) {
        this.figureNumber = figureNumber;
    }

    public String getSpecificationType() {
        return specificationType;
    }

    public void setSpecificationType(String specificationType) {
        this.specificationType = specificationType;
    }

    public String getPurchaseOrderNumber() {
        return purchaseOrderNumber;
    }

    public void setPurchaseOrderNumber(String purchaseOrderNumber) {
        this.purchaseOrderNumber = purchaseOrderNumber;
    }

    public String getFlagInspect() {
        return flagInspect;
    }

    public void setFlagInspect(String flagInspect) {
        this.flagInspect = flagInspect;
    }

    public String getEnclosure() {
        return enclosure;
    }

    public void setEnclosure(String enclosure) {
        this.enclosure = enclosure;
    }
}
