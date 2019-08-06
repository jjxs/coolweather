package cn.com.cnc.fcc.service.dto;

/**
 * QmsMaterielSupplierDto
 * @author Dl0777
 */
public class QmsMaterielEntryEditDto {
    // 物料进场
    private Long id;
    // 物料id
    private String materielId;
    // 物料编码
    private String materielCd;
    // 物料名称
    private String materielName;
    // 规格型号
    private String specificationType;
    // 图号
    private String figureNumber;
    // 包装数量
    private String packingQuantity;
    // 供应商Id
    private String supplierId;
    // 供应商编码
    private String supplierCd;
    // 供应商名称
    private String supplierName;
    // 到货数量
    private String entryQuantity;
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
    // 进场日期
    private String entryDate;

    public String getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(String entryDate) {
        this.entryDate = entryDate;
    }

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
        return materielName;
    }

    public void setMaterielName(String materielName) {
        this.materielName = materielName;
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

    public String getPackingQuantity() {
        return packingQuantity;
    }

    public void setPackingQuantity(String packingQuantity) {
        this.packingQuantity = packingQuantity;
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

    public String getEntryQuantity() {
        return entryQuantity;
    }

    public void setEntryQuantity(String entryQuantity) {
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

    public String getMaterielId() {
        return materielId;
    }

    public void setMaterielId(String materielId) {
        this.materielId = materielId;
    }

    public String getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }
}
