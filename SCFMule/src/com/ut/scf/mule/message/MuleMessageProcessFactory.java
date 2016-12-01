package com.ut.scf.mule.message;

import java.util.HashMap;
import java.util.Map;

import org.springframework.util.Assert;

import com.ut.scf.core.gapi.IFrameworkProtocol;

public class MuleMessageProcessFactory {
	static {
		registryContainer = new HashMap<String, Class<? extends IMuleConfigProcessor>>();
		MuleMessageProcessFactory.registryProcessor("File",MuleMessageFileProcessor.class);
		MuleMessageProcessFactory.registryProcessor("WebService",MuleMessageWebServiceProcessor.class);
	}

	private static Map<String, Class<? extends IMuleConfigProcessor>> registryContainer;

	private MuleMessageProcessFactory() {
	}

	public static IMuleConfigProcessor createProcessor(IFrameworkProtocol protocol) {
		String protocolType = protocol.getHeader().getType();
		Assert.notNull(protocolType, "Protocol Type can not be null.");

		if (registryContainer.containsKey(protocolType)) {
			try {
				return (IMuleConfigProcessor) Class.forName(registryContainer.get(protocolType).getName()).newInstance();
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public static void registryProcessor(String protocolType,Class<? extends IMuleConfigProcessor> T) {
		registryContainer.put(protocolType, T);
	}
}
