package cn.com.cnc.fcc.service.dto;

public class ProcessInfomationsRightListDTO {
	private Long id;
	private String orderNo;
	private String processCd;
	private String processName;
	private String numberCount;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
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
	public String getNumberCount() {
		return numberCount;
	}
	public void setNumberCount(String numberCount) {
		this.numberCount = numberCount;
	}

}
