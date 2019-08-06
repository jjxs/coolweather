package cn.com.cnc.fcc.domain;

public class QmsBomTechnologyDTO {

    //工序id
    private Long technologyId;
    //物料id
    private Long materielId;
    //物料cd
    private String materielCd;
    //物料名称
    private String materielName;
    //工艺cd
    private String technologyCd;
    //工艺名称
    private String technologyName;
    //备注
    private String remark;
    //工序描述
    private String jhiDescribe;
    //工序特征
    private String operationType;
    // 工序名称
    private String processName;

    public String getProcessName() {
        return processName;
    }

    public void setProcessName(String processName) {
        this.processName = processName;
    }

    public String getOperationType() {
        return operationType;
    }

    public void setOperationType(String operationType) {
        this.operationType = operationType;
    }

    public Long getTechnologyId() {
        return technologyId;
    }

    public void setTechnologyId(Long technologyId) {
        this.technologyId = technologyId;
    }

    public Long getMaterielId() {
        return materielId;
    }

    public void setMaterielId(Long materielId) {
        this.materielId = materielId;
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

    public String getTechnologyCd() {
        return technologyCd;
    }

    public void setTechnologyCd(String technologyCd) {
        this.technologyCd = technologyCd;
    }

    public String getTechnologyName() {
        return technologyName;
    }

    public void setTechnologyName(String technologyName) {
        this.technologyName = technologyName;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getJhiDescribe() {
        return jhiDescribe;
    }

    public void setJhiDescribe(String jhiDescribe) {
        this.jhiDescribe = jhiDescribe;
    }
}
