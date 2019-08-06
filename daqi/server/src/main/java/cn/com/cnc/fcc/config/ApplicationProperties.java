package cn.com.cnc.fcc.config;

import org.springframework.boot.context.properties.ConfigurationProperties;


/**
 * Properties specific to FCC.
 * <p>
 * Properties are configured in the application.yml file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

	/**
	 * JWT安全相关
	 */
	private final Security security = new Security();
	
	/**
	 * 网络相关
	 */
	private final Web web = new Web();

	/**
	 * 网络相关
	 */
	private final HostSlave hostSlave = new HostSlave();
	
	public Security getSecurity() {
        return security;
    }

	public Web getWeb() {
        return web;
    }
	
	public HostSlave getHostSlave() {
        return hostSlave;
    }
	
	public static class Security {
		private final Jwt jwt = new Jwt();
		
		public Jwt getJwt() {
            return jwt;
        }
		
		public static class Jwt {
			
			private int tokenCountDay = 720;

			public int getTokenCountDay() {
				return tokenCountDay;
			}

			public void setTokenCountDay(int tokenCountDay) {
				this.tokenCountDay = tokenCountDay;
			}
		}
	}

	public static class Web {
		private String fileShare = "C:/file/";
		
		public String getFileShare() {
			return fileShare;
		}

		public void setFileShare(String fileShare) {
			this.fileShare = fileShare;
		}
	}
	
	public static class HostSlave {
		private String hostOrSlave = "host";
		private String hostUrl = "";
		private String hostNode = "";
		private String slaveUrl = "";
		private String slaveNode = "";
		
		public String getHostOrSlave() {
			return hostOrSlave;
		}

		public void setHostOrSlave(String hostOrSlave) {
			this.hostOrSlave = hostOrSlave;
		}
		
		public String getHostUrl() {
			return hostUrl;
		}

		public void setHostUrl(String hostUrl) {
			this.hostUrl = hostUrl;
		}

		public String getHostNode() {
			return hostNode;
		}

		public void setHostNode(String hostNode) {
			this.hostNode = hostNode;
		}
		
		public String getSlaveUrl() {
			return slaveUrl;
		}

		public void setSlaveUrl(String slaveUrl) {
			this.slaveUrl = slaveUrl;
		}

		public String getSlaveNode() {
			return slaveNode;
		}

		public void setSlaveNode(String slaveNode) {
			this.slaveNode = slaveNode;
		}
	}
}
