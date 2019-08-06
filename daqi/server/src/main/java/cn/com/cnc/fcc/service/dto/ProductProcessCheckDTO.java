package cn.com.cnc.fcc.service.dto;

import java.time.ZonedDateTime;

public class ProductProcessCheckDTO {

    private Long id;
    private String checkNumber;
    private Integer bomTechnologyId;
    private Integer processId;
    private Integer materielId;
    private String materielCd;
    private String materielName;
    private String processName;
    private String serialNumber;
    private String furnace;
    private String workno;
    private String remark;
    private String isOk;
    private String makeUser;
    private ZonedDateTime makeTime;
    private String approveResultDiff;

    public String getApproveResultDiff() {
        return approveResultDiff;
    }

    public void setApproveResultDiff(String approveResultDiff) {
        this.approveResultDiff = approveResultDiff;
    }

    public String getCheckNumber() {
        return checkNumber;
    }

    public void setCheckNumber(String checkNumber) {
        this.checkNumber = checkNumber;
    }

    public Integer getProcessId() {
        return processId;
    }

    public void setProcessId(Integer processId) {
        this.processId = processId;
    }

    public String getWorkno() {
        return workno;
    }

    public void setWorkno(String workno) {
        this.workno = workno;
    }

    public Integer getBomTechnologyId() {
        return bomTechnologyId;
    }

    public void setBomTechnologyId(Integer bomTechnologyId) {
        this.bomTechnologyId = bomTechnologyId;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMaterielId() {
        return materielId;
    }

    public void setMaterielId(Integer materielId) {
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

    public String getProcessName() {
        return processName;
    }

    public void setProcessName(String processName) {
        this.processName = processName;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getFurnace() {
        return furnace;
    }

    public void setFurnace(String furnace) {
        this.furnace = furnace;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getIsOk() {
        return isOk;
    }

    public void setIsOk(String isOk) {
        this.isOk = isOk;
    }
}
