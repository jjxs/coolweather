package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A QmsApproveResult.
 */
@Entity
@Table(name = "qms_approve_result")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QmsApproveResult implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "approve_flow_id")
    private Integer approveFlowId;

    @Column(name = "unqualified_product_id")
    private Integer unqualifiedProductId;

    @Column(name = "step_num")
    private Integer stepNum;

    @Column(name = "principal_user_id")
    private Integer principalUserId;

    @Column(name = "approve_time")
    private ZonedDateTime approveTime;

    @Size(max = 1)
    @Column(name = "approve_result", length = 1)
    private String approveResult;

    @Size(max = 1)
    @Column(name = "approve_status", length = 1)
    private String approveStatus;

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

    public Integer getApproveFlowId() {
        return approveFlowId;
    }

    public QmsApproveResult approveFlowId(Integer approveFlowId) {
        this.approveFlowId = approveFlowId;
        return this;
    }

    public void setApproveFlowId(Integer approveFlowId) {
        this.approveFlowId = approveFlowId;
    }

    public Integer getUnqualifiedProductId() {
        return unqualifiedProductId;
    }

    public QmsApproveResult unqualifiedProductId(Integer unqualifiedProductId) {
        this.unqualifiedProductId = unqualifiedProductId;
        return this;
    }

    public void setUnqualifiedProductId(Integer unqualifiedProductId) {
        this.unqualifiedProductId = unqualifiedProductId;
    }

    public Integer getStepNum() {
        return stepNum;
    }

    public QmsApproveResult stepNum(Integer stepNum) {
        this.stepNum = stepNum;
        return this;
    }

    public void setStepNum(Integer stepNum) {
        this.stepNum = stepNum;
    }

    public Integer getPrincipalUserId() {
        return principalUserId;
    }

    public QmsApproveResult principalUserId(Integer principalUserId) {
        this.principalUserId = principalUserId;
        return this;
    }

    public void setPrincipalUserId(Integer principalUserId) {
        this.principalUserId = principalUserId;
    }

    public ZonedDateTime getApproveTime() {
        return approveTime;
    }

    public QmsApproveResult approveTime(ZonedDateTime approveTime) {
        this.approveTime = approveTime;
        return this;
    }

    public void setApproveTime(ZonedDateTime approveTime) {
        this.approveTime = approveTime;
    }

    public String getApproveResult() {
        return approveResult;
    }

    public QmsApproveResult approveResult(String approveResult) {
        this.approveResult = approveResult;
        return this;
    }

    public void setApproveResult(String approveResult) {
        this.approveResult = approveResult;
    }

    public String getApproveStatus() {
        return approveStatus;
    }

    public QmsApproveResult approveStatus(String approveStatus) {
        this.approveStatus = approveStatus;
        return this;
    }

    public void setApproveStatus(String approveStatus) {
        this.approveStatus = approveStatus;
    }

    public String getFlagStatus() {
        return flagStatus;
    }

    public QmsApproveResult flagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
        return this;
    }

    public void setFlagStatus(String flagStatus) {
        this.flagStatus = flagStatus;
    }

    public String getCompPkid() {
        return compPkid;
    }

    public QmsApproveResult compPkid(String compPkid) {
        this.compPkid = compPkid;
        return this;
    }

    public void setCompPkid(String compPkid) {
        this.compPkid = compPkid;
    }

    public String getRemark() {
        return remark;
    }

    public QmsApproveResult remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getReserveFirst() {
        return reserveFirst;
    }

    public QmsApproveResult reserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
        return this;
    }

    public void setReserveFirst(String reserveFirst) {
        this.reserveFirst = reserveFirst;
    }

    public String getReserveSecond() {
        return reserveSecond;
    }

    public QmsApproveResult reserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
        return this;
    }

    public void setReserveSecond(String reserveSecond) {
        this.reserveSecond = reserveSecond;
    }

    public String getReserveThird() {
        return reserveThird;
    }

    public QmsApproveResult reserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
        return this;
    }

    public void setReserveThird(String reserveThird) {
        this.reserveThird = reserveThird;
    }

    public String getMakeUser() {
        return makeUser;
    }

    public QmsApproveResult makeUser(String makeUser) {
        this.makeUser = makeUser;
        return this;
    }

    public void setMakeUser(String makeUser) {
        this.makeUser = makeUser;
    }

    public ZonedDateTime getMakeTime() {
        return makeTime;
    }

    public QmsApproveResult makeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
        return this;
    }

    public void setMakeTime(ZonedDateTime makeTime) {
        this.makeTime = makeTime;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public QmsApproveResult modifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
        return this;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser;
    }

    public ZonedDateTime getModifyTime() {
        return modifyTime;
    }

    public QmsApproveResult modifyTime(ZonedDateTime modifyTime) {
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
        QmsApproveResult qmsApproveResult = (QmsApproveResult) o;
        if (qmsApproveResult.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), qmsApproveResult.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QmsApproveResult{" +
            "id=" + getId() +
            ", approveFlowId=" + getApproveFlowId() +
            ", unqualifiedProductId=" + getUnqualifiedProductId() +
            ", stepNum=" + getStepNum() +
            ", principalUserId=" + getPrincipalUserId() +
            ", approveTime='" + getApproveTime() + "'" +
            ", approveResult='" + getApproveResult() + "'" +
            ", approveStatus='" + getApproveStatus() + "'" +
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
