package com.ut.scf.core.services.edi.impl;

import java.util.List;

import com.ut.comm.xml.edi.EDIPara;

public interface IEDIMsgDemerge {
	public List<Object> demerge(EDIPara para, Object ediMsg) throws Exception;
}
