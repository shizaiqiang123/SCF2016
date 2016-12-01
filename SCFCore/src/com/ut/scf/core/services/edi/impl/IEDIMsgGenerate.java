package com.ut.scf.core.services.edi.impl;

import net.sf.json.JSONObject;

import org.w3c.dom.Document;

import com.ut.comm.xml.edi.EDIPara;

public interface IEDIMsgGenerate {
	public Document generateMsg(EDIPara para,JSONObject reqDom) throws Exception;
	
}
