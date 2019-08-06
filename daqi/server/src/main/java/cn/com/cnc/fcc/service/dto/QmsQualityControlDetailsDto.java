package cn.com.cnc.fcc.service.dto;

public class QmsQualityControlDetailsDto implements Cloneable{

    private Long id;

    private Integer resultId;

    private Integer controlId;

    private String testValue;

    private Integer bomTechnologyId;

    private String inspectionItem;

    private String technicalRequirement;

    private String inspectionInstrument;

    private String placeDiff;

    // 结果表位别
    private String resultPlaceDiff;

    private Double standard;

    private Double upperDeviation;

    private Double lowerDeviation;

    private String inspectionResultDiff;

    private String remark;

    private String inspectionType;

    private String isCheckObj;

    private String abcType;

    private String flagStatus;

    private String compPkid;

    private String reserveFirst;

    private String reserveSecond;

    private String reserveThird;

    private String makeUser;

    private String modifyUser;

    public Object clone() {
        Object obj=null;
        try {
            obj=super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return obj;
    }

    public Integer getControlId() {
        return controlId;
    }

    public void setControlId(Integer controlId) {
        this.controlId = controlId;
    }

    public String getResultPlaceDiff() {
        return resultPlaceDiff;
    }

    public void setResultPlaceDiff(String resultPlaceDiff) {
        this.resultPlaceDiff = resultPlaceDiff;
    }

    public Integer getResultId() {
        return resultId;
    }

    public void setResultId(Integer resultId) {
        this.resultId = resultId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTestValue() {
        return testValue;
    }

    public void setTestValue(String testValue) {
        this.testValue = testValue;
    }

    public Integer getBomTechnologyId() {
        return bomTechnologyId;
    }

    public void setBomTechnologyId(Integer bomTechnologyId) {
        this.bomTechnologyId = bomTechnologyId;
    }

    public String getInspectionItem() {
        return inspectionItem;
    }

    public void setInspectionItem(String inspectionItem) {
        this.inspectionItem = inspectionItem;
    }

    public String getTechnicalRequirement() {
        return technicalRequirement;
    }

    public void setTechnicalRequirement(String technicalRequirement) {
        this.technicalRequirement = technicalRequirement;
    }

    public String getInspectionInstrument() {
        return inspectionInstrument;
    }

    public void setInspectionInstrument(String inspectionInstrument) {
        this.inspectionInstrument = inspectionInstrument;
    }

    public String getPlaceDiff() {
        return placeDiff;
    }

    public void setPlaceDiff(String placeDiff) {
        this.placeDiff = placeDiff;
    }

    public Double getStandard() {
        return standard;
    }

    public void setStandard(Double standard) {
        this.standard = standard;
    }

    public Double getUpperDeviation() {
        return upperDeviation;
    }

    public void setUpperDeviation(Double upperDeviation) {
        this.upperDeviation = upperDeviation;
    }

    public Double getLowerDeviation() {
        return lowerDeviation;
    }

    public void setLowerDeviation(Double lowerDeviation) {
        this.lowerDeviation = lowerDeviation;
    }

    public String getInspectionResultDiff() {
        return inspectionResultDiff;
    }

    public void setInspectionResultDiff(String inspectionResultDiff) {
        this.inspectionResultDiff = inspectionResultDiff;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getInspectionType() {
        return inspectionType;
    }

    public void setInspectionType(String inspectionType) {
        this.inspectionType = inspectionType;
    }

    public String getIsCheckObj() {
        return isCheckObj;
    }

    public void setIsCheckObj(String isCheckObj) {
        this.isCheckObj = isCheckObj;
    }

    public String getAbcType() {
        return abcType;
    }

    public void setAbcType(String abcType) {
        this.abcType = abcType;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }
}
