package com.ut.scf.core.doc;

import com.ut.scf.core.data.FuncDataObj;

public interface IDocumentManager {
	public void importDoc(FuncDataObj logicObj) throws Exception;
	
	public void exportDoc(FuncDataObj logicObj) throws Exception;
}
