package com.ut.scf.core.gapi.reformat;

import com.ut.comm.xml.gapi.GapiMsgPara;

public interface IReformatFactory {
	public IGAPIMsgReformat getReformatFactory(GapiMsgPara gapipPara) throws Exception;
}
