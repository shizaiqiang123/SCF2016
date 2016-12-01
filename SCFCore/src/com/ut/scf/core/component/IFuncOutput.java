package com.ut.scf.core.component;

import com.ut.scf.core.exception.SCFThrowableException;

public interface IFuncOutput {
	public void callOutputGeneration() throws SCFThrowableException;

	public void rollbackOutput();
}
