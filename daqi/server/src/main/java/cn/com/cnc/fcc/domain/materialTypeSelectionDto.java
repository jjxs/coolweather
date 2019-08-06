package cn.com.cnc.fcc.domain;

public class materialTypeSelectionDto {

    private Long id;

    private String materielTypeCd;

    private String materielTypeName;

    private String remark;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaterielTypeCd() {
        return materielTypeCd;
    }

    public void setMaterielTypeCd(String materielTypeCd) {
        this.materielTypeCd = materielTypeCd;
    }

    public String getMaterielTypeName() {
        return materielTypeName;
    }

    public void setMaterielTypeName(String materielTypeName) {
        this.materielTypeName = materielTypeName;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
