package com.ut.scf.core.component.gapi;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.orm.std.GapiMsg;

public interface GapiMsgServer {
	
public FuncDataObj postData(FuncDataObj funcDataObj);

public FuncDataObj requestGapiMsg(FuncDataObj gapiMessage);

public FuncDataObj modifyGapiMsg(Map gapiMessage,ApResponse apResponse);
}
