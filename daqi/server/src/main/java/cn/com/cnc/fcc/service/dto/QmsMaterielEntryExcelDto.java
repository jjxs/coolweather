package cn.com.cnc.fcc.service.dto;

/**
 * QmsMaterielEntryExcelDto
 * @author Dl0777
 */
public class QmsMaterielEntryExcelDto {
    // 物料编码
    private String materielCd;
    // 规格型号
    private String specificationType;
    // 图号
    private String figureNumber;
    // 包装数量
    private Integer packingQuantity;
    // 供应商编码
    private String supplierCd;
    // 到货数量
    private Integer entryQuantity;
    // 到货类型
    private String entryType;
    // 采购单号
    private String purchaseOrderNumber;
    // 原始批号/编号
    private String batchNumber;
    //制造年月
    private String madeYmd;
    // 制造厂代号
    private String madeFactoryCd;
    // 材质
    private String texTure;
    // 铸号
    private String castingNum;

    public String getMaterielCd() {
        return materielCd;
    }

    public void setMaterielCd(String materielCd) {
        this.materielCd = materielCd;
    }

    public String getSpecificationType() {
        return specificationType;
    }

    public void setSpecificationType(String specificationType) {
        this.specificationType = specificationType;
    }

    public String getFigureNumber() {
        return figureNumber;
    }

    public void setFigureNumber(String figureNumber) {
        this.figureNumber = figureNumber;
    }

    public Integer getPackingQuantity() {
        return packingQuantity;
    }

    public void setPackingQuantity(Integer packingQuantity) {
        this.packingQuantity = packingQuantity;
    }

    public String getSupplierCd() {
        return supplierCd;
    }

    public void setSupplierCd(String supplierCd) {
        this.supplierCd = supplierCd;
    }

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

    public String getPurchaseOrderNumber() {
        return purchaseOrderNumber;
    }

    public void setPurchaseOrderNumber(String purchaseOrderNumber) {
        this.purchaseOrderNumber = purchaseOrderNumber;
    }

    public String getBatchNumber() {
        return batchNumber;
    }

    public void setBatchNumber(String batchNumber) {
        this.batchNumber = batchNumber;
    }

    public String getMadeYmd() {
        return madeYmd;
    }

    public void setMadeYmd(String madeYmd) {
        this.madeYmd = madeYmd;
    }

    public String getMadeFactoryCd() {
        return madeFactoryCd;
    }

    public void setMadeFactoryCd(String madeFactoryCd) {
        this.madeFactoryCd = madeFactoryCd;
    }

    public String getTexTure() {
        return texTure;
    }

    public void setTexTure(String texTure) {
        this.texTure = texTure;
    }

    public String getCastingNum() {
        return castingNum;
    }

    public void setCastingNum(String castingNum) {
        this.castingNum = castingNum;
    }
}
