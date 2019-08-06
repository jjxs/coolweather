package cn.com.cnc.fcc.domain;

public class QmsProcessExcelDto {

    //工序cd
    private String processCd;
    //工序名称
    private String processName;
    //备注
    private String remark;

    public String getProcessCd() {
        return processCd;
    }

    public void setProcessCd(String processCd) {
        this.processCd = processCd;
    }

    public String getProcessName() {
        return processName;
    }

    public void setProcessName(String processName) {
        this.processName = processName;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
