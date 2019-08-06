package cn.com.cnc.fcc.domain;

public class QmsProductRelationTabTwoDTO {
    //装配id
    private Long id;
    //隶属单位
    private String organizationName;
    //工艺编码
    private String technologyCd;
    //工序编码
    private String processCd;
    //工序特征
    private String prjName;
    //工序序号
    private String orderNo;
    //作业班组
    private String workGroupCd;
    //工艺名称
    private String technologyName;
    //工序名称
    private String processName;
    //试验工序
    private String isControlPoint;
    //检验工序
    private String isTest;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getTechnologyCd() {
        return technologyCd;
    }

    public void setTechnologyCd(String technologyCd) {
        this.technologyCd = technologyCd;
    }

    public String getProcessCd() {
        return processCd;
    }

    public void setProcessCd(String processCd) {
        this.processCd = processCd;
    }

    public String getPrjName() {
        return prjName;
    }

    public void setPrjName(String prjName) {
        this.prjName = prjName;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getWorkGroupCd() {
        return workGroupCd;
    }

    public void setWorkGroupCd(String workGroupCd) {
        this.workGroupCd = workGroupCd;
    }

    public String getTechnologyName() {
        return technologyName;
    }

    public void setTechnologyName(String technologyName) {
        this.technologyName = technologyName;
    }

    public String getProcessName() {
        return processName;
    }

    public void setProcessName(String processName) {
        this.processName = processName;
    }

    public String getIsControlPoint() {
        return isControlPoint;
    }

    public void setIsControlPoint(String isControlPoint) {
        this.isControlPoint = isControlPoint;
    }

    public String getIsTest() {
        return isTest;
    }

    public void setIsTest(String isTest) {
        this.isTest = isTest;
    }
}
