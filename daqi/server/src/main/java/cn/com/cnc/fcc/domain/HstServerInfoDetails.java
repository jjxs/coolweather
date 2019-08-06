package cn.com.cnc.fcc.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A HstServerInfoDetails.
 */
@Entity
@Table(name = "hst_server_info_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HstServerInfoDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "app_id")
    private Integer appId;

    @Column(name = "store_id")
    private Integer storeId;

    @Column(name = "info_id")
    private Long infoId;

    @Size(max = 50)
    @Column(name = "host_name", length = 50)
    private String hostName;

    @Size(max = 50)
    @Column(name = "ip_address", length = 50)
    private String ipAddress;

    @Size(max = 50)
    @Column(name = "os_user", length = 50)
    private String osUser;

    @Size(max = 50)
    @Column(name = "os_name", length = 50)
    private String osName;

    @Size(max = 50)
    @Column(name = "os_version", length = 50)
    private String osVersion;

    @Size(max = 50)
    @Column(name = "os_arch", length = 50)
    private String osArch;

    @Column(name = "stop_flag")
    private Integer stopFlag;

    @Column(name = "del_flag")
    private Integer delFlag;

    @Size(max = 20)
    @Column(name = "ins_progarm_cd", length = 20)
    private String insProgarmCd;

    @Size(max = 20)
    @Column(name = "ins_oper_cd", length = 20)
    private String insOperCd;

    @Column(name = "ins_date_time")
    private ZonedDateTime insDateTime;

    @Size(max = 20)
    @Column(name = "upd_progarm_cd", length = 20)
    private String updProgarmCd;

    @Size(max = 20)
    @Column(name = "upd_oper_cd", length = 20)
    private String updOperCd;

    @Column(name = "upd_date_time")
    private ZonedDateTime updDateTime;

    @Size(max = 20)
    @Column(name = "del_progarm_cd", length = 20)
    private String delProgarmCd;

    @Size(max = 20)
    @Column(name = "del_oper_cd", length = 20)
    private String delOperCd;

    @Column(name = "del_date_time")
    private ZonedDateTime delDateTime;

    @Column(name = "trigger_date_time")
    private ZonedDateTime triggerDateTime;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAppId() {
        return appId;
    }

    public HstServerInfoDetails appId(Integer appId) {
        this.appId = appId;
        return this;
    }

    public void setAppId(Integer appId) {
        this.appId = appId;
    }

    public Integer getStoreId() {
        return storeId;
    }

    public HstServerInfoDetails storeId(Integer storeId) {
        this.storeId = storeId;
        return this;
    }

    public void setStoreId(Integer storeId) {
        this.storeId = storeId;
    }

    public Long getInfoId() {
        return infoId;
    }

    public HstServerInfoDetails infoId(Long infoId) {
        this.infoId = infoId;
        return this;
    }

    public void setInfoId(Long infoId) {
        this.infoId = infoId;
    }

    public String getHostName() {
        return hostName;
    }

    public HstServerInfoDetails hostName(String hostName) {
        this.hostName = hostName;
        return this;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public HstServerInfoDetails ipAddress(String ipAddress) {
        this.ipAddress = ipAddress;
        return this;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getOsUser() {
        return osUser;
    }

    public HstServerInfoDetails osUser(String osUser) {
        this.osUser = osUser;
        return this;
    }

    public void setOsUser(String osUser) {
        this.osUser = osUser;
    }

    public String getOsName() {
        return osName;
    }

    public HstServerInfoDetails osName(String osName) {
        this.osName = osName;
        return this;
    }

    public void setOsName(String osName) {
        this.osName = osName;
    }

    public String getOsVersion() {
        return osVersion;
    }

    public HstServerInfoDetails osVersion(String osVersion) {
        this.osVersion = osVersion;
        return this;
    }

    public void setOsVersion(String osVersion) {
        this.osVersion = osVersion;
    }

    public String getOsArch() {
        return osArch;
    }

    public HstServerInfoDetails osArch(String osArch) {
        this.osArch = osArch;
        return this;
    }

    public void setOsArch(String osArch) {
        this.osArch = osArch;
    }

    public Integer getStopFlag() {
        return stopFlag;
    }

    public HstServerInfoDetails stopFlag(Integer stopFlag) {
        this.stopFlag = stopFlag;
        return this;
    }

    public void setStopFlag(Integer stopFlag) {
        this.stopFlag = stopFlag;
    }

    public Integer getDelFlag() {
        return delFlag;
    }

    public HstServerInfoDetails delFlag(Integer delFlag) {
        this.delFlag = delFlag;
        return this;
    }

    public void setDelFlag(Integer delFlag) {
        this.delFlag = delFlag;
    }

    public String getInsProgarmCd() {
        return insProgarmCd;
    }

    public HstServerInfoDetails insProgarmCd(String insProgarmCd) {
        this.insProgarmCd = insProgarmCd;
        return this;
    }

    public void setInsProgarmCd(String insProgarmCd) {
        this.insProgarmCd = insProgarmCd;
    }

    public String getInsOperCd() {
        return insOperCd;
    }

    public HstServerInfoDetails insOperCd(String insOperCd) {
        this.insOperCd = insOperCd;
        return this;
    }

    public void setInsOperCd(String insOperCd) {
        this.insOperCd = insOperCd;
    }

    public ZonedDateTime getInsDateTime() {
        return insDateTime;
    }

    public HstServerInfoDetails insDateTime(ZonedDateTime insDateTime) {
        this.insDateTime = insDateTime;
        return this;
    }

    public void setInsDateTime(ZonedDateTime insDateTime) {
        this.insDateTime = insDateTime;
    }

    public String getUpdProgarmCd() {
        return updProgarmCd;
    }

    public HstServerInfoDetails updProgarmCd(String updProgarmCd) {
        this.updProgarmCd = updProgarmCd;
        return this;
    }

    public void setUpdProgarmCd(String updProgarmCd) {
        this.updProgarmCd = updProgarmCd;
    }

    public String getUpdOperCd() {
        return updOperCd;
    }

    public HstServerInfoDetails updOperCd(String updOperCd) {
        this.updOperCd = updOperCd;
        return this;
    }

    public void setUpdOperCd(String updOperCd) {
        this.updOperCd = updOperCd;
    }

    public ZonedDateTime getUpdDateTime() {
        return updDateTime;
    }

    public HstServerInfoDetails updDateTime(ZonedDateTime updDateTime) {
        this.updDateTime = updDateTime;
        return this;
    }

    public void setUpdDateTime(ZonedDateTime updDateTime) {
        this.updDateTime = updDateTime;
    }

    public String getDelProgarmCd() {
        return delProgarmCd;
    }

    public HstServerInfoDetails delProgarmCd(String delProgarmCd) {
        this.delProgarmCd = delProgarmCd;
        return this;
    }

    public void setDelProgarmCd(String delProgarmCd) {
        this.delProgarmCd = delProgarmCd;
    }

    public String getDelOperCd() {
        return delOperCd;
    }

    public HstServerInfoDetails delOperCd(String delOperCd) {
        this.delOperCd = delOperCd;
        return this;
    }

    public void setDelOperCd(String delOperCd) {
        this.delOperCd = delOperCd;
    }

    public ZonedDateTime getDelDateTime() {
        return delDateTime;
    }

    public HstServerInfoDetails delDateTime(ZonedDateTime delDateTime) {
        this.delDateTime = delDateTime;
        return this;
    }

    public void setDelDateTime(ZonedDateTime delDateTime) {
        this.delDateTime = delDateTime;
    }

    public ZonedDateTime getTriggerDateTime() {
        return triggerDateTime;
    }

    public HstServerInfoDetails triggerDateTime(ZonedDateTime triggerDateTime) {
        this.triggerDateTime = triggerDateTime;
        return this;
    }

    public void setTriggerDateTime(ZonedDateTime triggerDateTime) {
        this.triggerDateTime = triggerDateTime;
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
        HstServerInfoDetails hstServerInfoDetails = (HstServerInfoDetails) o;
        if (hstServerInfoDetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hstServerInfoDetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HstServerInfoDetails{" +
            "id=" + getId() +
            ", appId=" + getAppId() +
            ", storeId=" + getStoreId() +
            ", infoId=" + getInfoId() +
            ", hostName='" + getHostName() + "'" +
            ", ipAddress='" + getIpAddress() + "'" +
            ", osUser='" + getOsUser() + "'" +
            ", osName='" + getOsName() + "'" +
            ", osVersion='" + getOsVersion() + "'" +
            ", osArch='" + getOsArch() + "'" +
            ", stopFlag=" + getStopFlag() +
            ", delFlag=" + getDelFlag() +
            ", insProgarmCd='" + getInsProgarmCd() + "'" +
            ", insOperCd='" + getInsOperCd() + "'" +
            ", insDateTime='" + getInsDateTime() + "'" +
            ", updProgarmCd='" + getUpdProgarmCd() + "'" +
            ", updOperCd='" + getUpdOperCd() + "'" +
            ", updDateTime='" + getUpdDateTime() + "'" +
            ", delProgarmCd='" + getDelProgarmCd() + "'" +
            ", delOperCd='" + getDelOperCd() + "'" +
            ", delDateTime='" + getDelDateTime() + "'" +
            ", triggerDateTime='" + getTriggerDateTime() + "'" +
            "}";
    }
}
