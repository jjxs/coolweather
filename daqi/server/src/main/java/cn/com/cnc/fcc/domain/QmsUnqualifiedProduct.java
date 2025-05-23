package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsUnqualifiedProduct.
 */
@Entity
@Table(name = "qms_unqualified_product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsUnqualifiedProduct implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "inspection_value_id")
    private Integer inspectionValueId;

    @Column(name = "bom_technology_id")
    private Integer bomTechnologyId;

    @Column(name = "process_id")
    private Integer processId;

    @Column(name = "materiel_id")
    private Integer materielId;

    @Column(name = "approve_result_id")
    private Integer approveResultId;

    @Column(name = "unhealthy_id")
    private Integer unhealthyId;

    @Column(name = "defect_id")
    private Integer defectId;

    @Size(max = 10)
    @Column(name = "control_level", length = 10)
    private String controlLevel;

    @Column(name = "approve_principal_user_id")
    private Integer approvePrincipalUserId;

    @Column(name = "approve_step_num")
    private Integer approveStepNum;

    @Column(name = "approve_step_user_id")
    private Integer approveStepUserId;

    @Size(max = 10)
    @Column(name = "seri_number", length = 10)
    private String seriNumber;

    @Size(max = 20)
    @Column(name = "furnace", length = 20)
    private String furnace;

    @Size(max = 10)
    @Column(name = "sale_number", length = 10)
    private String saleNumber;

    @Size(max = 10)
    @Column(name = "productorder_number", length = 10)
    private String productorderNumber;

    @Size(max = 1)
    @Column(name = "inspection_diff", length = 1)
    private String inspectionDiff;

    @Size(max = 1)
    @Column(name = "is_approve", length = 1)
    private String isApprove;

    @Size(max = 10)
    @Column(name = "approve_result_diff", length = 10)
    private String approveResultDiff;

    @Column(name = "approve_user_id")
    private Integer approveUserId;

    @Column(name = "approve_time")
    private ZonedDateTime approveTime;

    @Size(max = 1)
    @Column(name = "flag_status", length = 1)
    private String flagStatus;

    @Size(max = 10)
    @Column(name = "comp_pkid", length = 10)
    private String compPkid;

    @Size(max = 200)
    @Column(name = "remark", length = 200)
    private String remark;

    @Size(max = 20)
    @Column(name = "reserve_first", length = 20)
    private String reserveFirst;

    @Size(max = 20)
    @Column(name = "reserve_second", length = 20)
    private String reserveSecond;

    @Size(max = 20)
    @Column(name = "reserve_third", length = 20)
    private String reserveThird;

    @Size(max = 10)
    @Column(name = "make_user", length = 10)
    private String makeUser;

    @Column(name = "make_time")
    private ZonedDateTime makeTime;

    @Size(max = 10)
    @Column(name = "modify_user", length = 10)
    private String modifyUser;

    @Column(name = "modify_time")
    private ZonedDateTime modifyTime;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getInspectionValueId() {
        return inspectionValueId;
    }

    public QmsUnqualifiedProduct inspectionValueId(Integer inspectionValueId) {
        this.inspectionValueId = inspectionValueId;
        return this;
    }

    public void setInspectionValueId(Integer inspectionValueId) {
        this.inspectionValueId = inspectionValueId;
    }

    public Integer getBomTechnologyId() {
        return bomTechnologyId;
    }

    public QmsUnqualifiedProduct bomTechnologyId(Integer bomTechnologyId) {
        this.bomTechnologyId = bomTechnologyId;
        return this;
    }

    public void setBomTechnologyId(Integer bomTechnologyId) {
        this.bomTechnologyId = bomTechnologyId;
    }

    public Integer getProcessId() {
        return processId;
    }

    public QmsUnqualifiedProduct processId(Integer processId) {
        this.processId = processId;
        return this;
    }

    public void setProcessId(Integer processId) {
        this.processId = processId;
    }

    public Integer getMaterielId() {
        return materielId;
    }

    public QmsUnqualifiedProduct materielId(Integer materielId) {
        this.materielId = materielId;
        return this;
    }

    public void setMaterielId(Integer materielId) {
        this.materielId = materielId;
    }

    public Integer getApproveResultId() {
        return approveResultId;
    }

    public QmsUnqualifiedProduct approveResultId(Integer approveResultId) {
        this.approveResultId = approveResultId;
        return this;
    }

    public void setApproveResultId(Integer approveResultId) {
        this.approveResultId = approveResultId;
    }

    public Integer getUnhealthyId() {
        return unhealthyId;
    }

    public QmsUnqualifiedProduct unhealthyId(Integer unhealthyId) {
        this.unhealthyId = unhealthyId;
        return this;
    }

    public void setUnhealthyId(Integer unhealthyId) {
        this.unhealthyId = unhealthyId;
    }

    public Integer getDefectId() {
        return defectId;
    }

    public QmsUnqualifiedProduct defectId(Integer defectId) {
        this.defectId = defectId;
        return this;
    }

    public void setDefectId(Integer defectId) {
        this.defectId = defectId;
    }

    public String getControlLevel() {
        return controlLevel;
    }

    public QmsUnqualifiedProduct controlLevel(String controlLevel) {
        this.controlLevel = controlLevel;
        return this;
    }

    public void setControlLevel(String controlLevel) {
        this.controlLevel = controlLevel;
    }

    public Integer getApprovePrincipalUserId() {
        return approvePrincipalUserId;
    }

    public QmsUnqualifiedProduct approvePrincipalUserId(Integer approvePrincipalUserId) {
        this.approvePrincipalUserId = approvePrincipalUserId;
        return this;
    }

    public void setApprovePrincipalUserId(Integer approvePrincipalUserId) {
        this.approvePrincipalUserId = approvePrincipalUserId;
    }

    public Integer getApproveStepNum() {
        return approveStepNum;
    }

    public QmsUnqualifiedProduct approveStepNum(Integer approveStepNum) {
        this.approveStepNum = approveStepNum;
        return this;
    }

    public void setApproveStepNum(Integer approveStepNum) {
        this.approveStepNum = approveStepNum;
    }

    public Integer getApproveStepUserId() {
        return approveStepUserId;
    }

    public QmsUnqualifiedProduct approveStepUserId(Integer approveStepUserId) {
        this.approveStepUserId = approveStepUserId;
        return this;
    }

    public void setApproveStepUserId(Integer approveStepUserId) {
        this.approveStepUserId = approveStepUserId;
    }

    public String getSeriNumber() {
        return seriNumber;
    }

    public QmsUnqualifiedProduct seriNumber(String seriNumber) {
        this.seriNumber = seriNumber;
        return this;
    }

    public void setSeriNumber(String seriNumber) {
        this.seriNumber = seriNumber;
    }

    public String getFurnace() {
        return furnace;
    }

    public QmsUnqualifiedProduct furnace(String furnace) {
        this.furnace = furnace;
        return this;
    }

    public void setFurnace(String furnace) {
        this.furnace = furnace;
    }

    public String getSaleNumber() {
        return saleNumber;
    }

    public QmsUnqualifiedProduct saleNumber(String saleNumber) {
        this.saleNumber = saleNumber;
        return this;
    }

    public void setSaleNumber(String saleNumber) {
        this.saleNumber = saleNumber;
    }

    public String getProductorderNumber() {
        return productorderNumber;
    }

    public QmsUnqualifiedProduct productorderNumber(String productorderNumber) {
        this.productorderNumber = productorderNumber;
        return this;
    }

    public void setProductorderNumber(String productorderNumber) {
        this.productorderNumber = productorderNumber;
    }

    public String getInspectionDiff() {
        return inspectionDiff;
    }

    public QmsUnqualifiedProduct inspectionDiff(String inspectionDiff) {
        this.inspectionDiff = inspectionDiff;
        return this;
    }

    public void setInspectionDiff(String inspectionDiff) {
        this.inspectionDiff = inspectionDiff;
    }

    public String getIsApprove() {
        return isApprove;
    }

    public QmsUnqualifiedProduct isApprove(String isApprove) {
        this.isApprove = isApprove;
        return this;
    }

    public void setIsApprove(String isApprove) {
        this.isApprove = isApprove;
    }

    public String getApproveResultDiff() {
        return approveResultDiff;
    }

    public QmsUnqualifiedProduct approveResultDiff(String approveResultDiff) {
        this.approveResultDiff = approveResultDiff;
        return this;
    }

    public void setApproveResultDiff(String approveResultDiff) {
        this.approveResultDiff = approveResultDiff;
    }

    public Integer getApproveUserId() {
        return approveUserId;
    }

    public QmsUnqualifiedProduct approveUserId(Integer approveUserId) {
        this.approveUserId = approveUserId;
        return this;
    }

    public void setApproveUserId(Integer approveUserId) {
        this.approveUserId = approveUserId;
    }

    public ZonedDateTime getApproveTime() {
        return approveTime;
    }

    public QmsUnqualifiedProduct approveTime(ZonedDateTime approveTime) {
        this.approveTime = approveTime;
        return this;
    }

    public void setApproveTime(ZonedDateTime approveTime) {
        this.approveTime = approveTime;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsUnqualifiedProduct flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsUnqualifiedProduct compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsUnqualifiedProduct remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsUnqualifiedProduct reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsUnqualifiedProduct reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsUnqualifiedProduct reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsUnqualifiedProduct makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsUnqualifiedProduct makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsUnqualifiedProduct modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsUnqualifiedProduct modifyTime(ZonedDateTime modifyTime) {
        this.modifyTime = modifyTime;
        return this;
    }

    public void setModifyTime(ZonedDateTime modifyTime) {
        this.modifyTime = modifyTime;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        QmsUnqualifiedProduct qmsUnqualifiedProduct = (QmsUnqualifiedProduct) o;
        if (qmsUnqualifiedProduct.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsUnqualifiedProduct.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsUnqualifiedProduct{" +
            "id=" + getId() +
            ", inspectionValueId=" + getInspectionValueId() +
            ", bomTechnologyId=" + getBomTechnologyId() +
            ", processId=" + getProcessId() +
            ", materielId=" + getMaterielId() +
            ", approveResultId=" + getApproveResultId() +
            ", unhealthyId=" + getUnhealthyId() +
            ", defectId=" + getDefectId() +
            ", controlLevel='" + getControlLevel() + "'" +
            ", approvePrincipalUserId=" + getApprovePrincipalUserId() +
            ", approveStepNum=" + getApproveStepNum() +
            ", approveStepUserId=" + getApproveStepUserId() +
            ", seriNumber='" + getSeriNumber() + "'" +
            ", furnace='" + getFurnace() + "'" +
            ", saleNumber='" + getSaleNumber() + "'" +
            ", productorderNumber='" + getProductorderNumber() + "'" +
            ", inspectionDiff='" + getInspectionDiff() + "'" +
            ", isApprove='" + getIsApprove() + "'" +
            ", approveResultDiff='" + getApproveResultDiff() + "'" +
            ", approveUserId=" + getApproveUserId() +
            ", approveTime='" + getApproveTime() + "'" +
            ", flagStatus='" + getFlagStatus() + "'" +
            ", compPkid='" + getCompPkid() + "'" +
            ", remark='" + getRemark() + "'" +
            ", reserveFirst='" + getReserveFirst() + "'" +
            ", reserveSecond='" + getReserveSecond() + "'" +
            ", reserveThird='" + getReserveThird() + "'" +
            ", makeUser='" + getMakeUser() + "'" +
            ", makeTime='" + getMakeTime() + "'" +
            ", modifyUser='" + getModifyUser() + "'" +
            ", modifyTime='" + getModifyTime() + "'" +
            "}";
    }
}
