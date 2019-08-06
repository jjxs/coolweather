package cn.com.cnc.fcc.web.rest.errors;

import com.alibaba.fastjson.JSONObject;

public enum PAPIStatus {

	APPID_NO_FOUND(10001, "获取 access_token时,APPID或APPSecret不存在"),
	APPTOKEN_INVALID(10002, "不合法的 access_token,请确认有效性"),
	APPTOKEN_CREATE_COUNT_EXCEED(10003, "获取 access_token时,超过了每日最大次数"),
	APPTOKEN_NULL(10004, "缺少 access_token 参数");
	
	private final int code;
    private final String reason;

    PAPIStatus(final int statusCode, final String reasonPhrase) {
        this.code = statusCode;
        this.reason = reasonPhrase;
    }
    
    public int getStatusCode() {
        return code;
    }
    
    public String getReasonPhrase() {
        return reason;
    }
    
    public static String getReasonPhrase(int statusCode) {
    	for (PAPIStatus ps : PAPIStatus.values()) {
    		if (ps.getStatusCode() == statusCode) {
    			JSONObject jsonObject = new JSONObject();
    			jsonObject.put("errorCode", ps.getStatusCode());
    			jsonObject.put("errorMsg", ps.getReasonPhrase());
    			
    			return jsonObject.toString();
    		}
    	}
    	return null;
    }
}
