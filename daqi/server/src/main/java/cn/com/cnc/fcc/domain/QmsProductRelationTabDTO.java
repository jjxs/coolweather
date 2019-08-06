package cn.com.cnc.fcc.domain;

public class QmsProductRelationTabDTO {
    //装配关系id
    private Long id;
    //生产批号
    private String productBatch;
    //物料编码
    private String materielCd;
    //图号
    private String figureNumber;
    //重量
    private String weight;
    //材质
    private String texTure;
    //生产方式
    private String prjName;
    //物料名称
    private String materielName;
    //规格型号
    private String specificationType;
    //密度
    private String density;
    //使用重量
    private String assemblyCount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductBatch() {
        return productBatch;
    }

    public void setProductBatch(String productBatch) {
        this.productBatch = productBatch;
    }

    public String getMaterielCd() {
        return materielCd;
    }

    public void setMaterielCd(String materielCd) {
        this.materielCd = materielCd;
    }

    public String getFigureNumber() {
        return figureNumber;
    }

    public void setFigureNumber(String figureNumber) {
        this.figureNumber = figureNumber;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getTexTure() {
        return texTure;
    }

    public void setTexTure(String texTure) {
        this.texTure = texTure;
    }

    public String getPrjName() {
        return prjName;
    }

    public void setPrjName(String prjName) {
        this.prjName = prjName;
    }

    public String getMaterielName() {
        return materielName;
    }

    public void setMaterielName(String materielName) {
        this.materielName = materielName;
    }

    public String getSpecificationType() {
        return specificationType;
    }

    public void setSpecificationType(String specificationType) {
        this.specificationType = specificationType;
    }

    public String getDensity() {
        return density;
    }

    public void setDensity(String density) {
        this.density = density;
    }

    public String getAssemblyCount() {
        return assemblyCount;
    }

    public void setAssemblyCount(String assemblyCount) {
        this.assemblyCount = assemblyCount;
    }
}
