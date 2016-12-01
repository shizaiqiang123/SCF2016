package com.ut.scf.core.gapi.reformat;

import com.ut.scf.core.gapi.IFrameworkProtocol;
import com.ut.scf.core.gapi.IGAPIMsgRequest;

public interface IGAPIReformat {
	public void reformat(IFrameworkProtocol protocol,IGAPIMsgRequest message) throws Exception;

	public void verify(IFrameworkProtocol protocol,String responseMsg) throws Exception;
}
