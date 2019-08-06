package cn.com.cnc.fcc.domain;

public class QmsProductRelationTabThreeDTO {
    //生产检验装配关系Id
    private Long id;
    //供应商编码
    private String supplierCd;
    //到货类型
    private String prjName;
    //采购单号
    private String purchaseOrderNumber;
    //制造年月
    private String madeYmd;
    //供应商名称
    private String supplierName;
    //到货数量
    private String entryQuantity;
    //原始批号/编号
    private String batchNumber;
    //制造厂代号
    private String madeFactoryCd;

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

    public String getPrjName() {
        return prjName;
    }

    public void setPrjName(String prjName) {
        this.prjName = prjName;
    }

    public String getPurchaseOrderNumber() {
        return purchaseOrderNumber;
    }

    public void setPurchaseOrderNumber(String purchaseOrderNumber) {
        this.purchaseOrderNumber = purchaseOrderNumber;
    }

    public String getMadeYmd() {
        return madeYmd;
    }

    public void setMadeYmd(String madeYmd) {
        this.madeYmd = madeYmd;
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

    public String getBatchNumber() {
        return batchNumber;
    }

    public void setBatchNumber(String batchNumber) {
        this.batchNumber = batchNumber;
    }

    public String getMadeFactoryCd() {
        return madeFactoryCd;
    }

    public void setMadeFactoryCd(String madeFactoryCd) {
        this.madeFactoryCd = madeFactoryCd;
    }
}
