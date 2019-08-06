package cn.com.cnc.fcc.web.rest.hst;

import cn.com.cnc.fcc.AppContext;
import cn.com.cnc.fcc.web.task.GetPublicApi;

/**
 * token更新的Task
 * @author cnc-hou
 *
 */
public class HostSlaveRunnable implements Runnable {
	
	private GetPublicApi getPublicApi;
	
	@Override
	public void run() {
		// TODO Auto-generated method stub
		this.getPublicApi = AppContext.getApplicationContext().getBean(GetPublicApi.class);
		
		this.getPublicApi.GetToken();
	}

}
