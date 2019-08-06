package cn.com.cnc.fcc.domain;

public class QmsControlDetailsExcelDto {
    //项目编码
    private String inspectionCd;
    //检查项目
    private String inspectionItem;
    //检查器具
    private String inspectionInstrument;
    //结果区分
    private String inspectionResultDiff;
    //技术要求
    private String technicalRequirement;
    //备注
    private String remark;

    public String getInspectionCd() {
        return inspectionCd;
    }

    public void setInspectionCd(String inspectionCd) {
        this.inspectionCd = inspectionCd;
    }

    public String getInspectionItem() {
        return inspectionItem;
    }

    public void setInspectionItem(String inspectionItem) {
        this.inspectionItem = inspectionItem;
    }

    public String getInspectionInstrument() {
        return inspectionInstrument;
    }

    public void setInspectionInstrument(String inspectionInstrument) {
        this.inspectionInstrument = inspectionInstrument;
    }

    public String getInspectionResultDiff() {
        return inspectionResultDiff;
    }

    public void setInspectionResultDiff(String inspectionResultDiff) {
        this.inspectionResultDiff = inspectionResultDiff;
    }

    public String getTechnicalRequirement() {
        return technicalRequirement;
    }

    public void setTechnicalRequirement(String technicalRequirement) {
        this.technicalRequirement = technicalRequirement;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
