package cn.com.cnc.fcc.service.dto;

/**
 * QmsMaterielDetailsExcelDto
 * @author Dl0777
 */
public class QmsMaterielDetailsExcelDto {
    // 单件号
    private String goodsCd;
    // 入场单件数量
    private int goodsQuantity;

    public String getGoodsCd() {
        return goodsCd;
    }

    public void setGoodsCd(String goodsCd) {
        this.goodsCd = goodsCd;
    }

    public int getGoodsQuantity() {
        return goodsQuantity;
    }

    public void setGoodsQuantity(int goodsQuantity) {
        this.goodsQuantity = goodsQuantity;
    }
}
