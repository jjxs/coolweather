package cn.com.cnc.fcc.service.dto;

public class QmsPartsAssemblyRelationDto implements Cloneable{

    private String productMode;
    private Integer materielId;
    private String materielName;
    private Integer assemblyCount;
    private String madeYmd;
    private String madeFactoryCd;
    private String makeUser;
    private Integer HID;
    private Integer productionRelationId;
    private Integer partsAssemblyRelationId;
    private String bianHao;
    private String actualUseLocation;
    private String entryType;
    private String modifyUser;

    public Integer getAssemblyCount() {
        return assemblyCount;
    }

    public void setAssemblyCount(Integer assemblyCount) {
        this.assemblyCount = assemblyCount;
    }

    public Object clone() {
        Object obj=null;
        try {
            obj=super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return obj;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public Integer getMaterielId() {
        return materielId;
    }

    public void setMaterielId(Integer materielId) {
        this.materielId = materielId;
    }

    public Integer getPartsAssemblyRelationId() {
        return partsAssemblyRelationId;
    }

    public void setPartsAssemblyRelationId(Integer partsAssemblyRelationId) {
        this.partsAssemblyRelationId = partsAssemblyRelationId;
    }

    public String getEntryType() {
        return entryType;
    }

    public void setEntryType(String entryType) {
        this.entryType = entryType;
    }

    public Integer getProductionRelationId() {
        return productionRelationId;
    }

    public void setProductionRelationId(Integer productionRelationId) {
        this.productionRelationId = productionRelationId;
    }

    public String getActualUseLocation() {
        return actualUseLocation;
    }

    public void setActualUseLocation(String actualUseLocation) {
        this.actualUseLocation = actualUseLocation;
    }

    public Integer getHID() {
        return HID;
    }

    public void setHID(Integer HID) {
        this.HID = HID;
    }

    public String getBianHao() {
        return bianHao;
    }

    public void setBianHao(String bianHao) {
        this.bianHao = bianHao;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public String getProductMode() {
        return productMode;
    }

    public void setProductMode(String productMode) {
        this.productMode = productMode;
    }

    public String getMaterielName() {
        return materielName;
    }

    public void setMaterielName(String materielName) {
        this.materielName = materielName;
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
}
