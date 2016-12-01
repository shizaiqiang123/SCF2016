package com.ut.scf.web.session;

import java.io.Serializable;

public class SessionObject implements Serializable{
	private boolean isValied = false;
	
	public boolean isValied() {
		return isValied;
	}

	public void setValied(boolean isValied) {
		this.isValied = isValied;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	private int version = 0;
}
