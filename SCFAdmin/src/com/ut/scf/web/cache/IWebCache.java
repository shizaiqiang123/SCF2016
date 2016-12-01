package com.ut.scf.web.cache;

import javax.servlet.http.HttpSession;

public interface IWebCache {
	public String generateKey(HttpSession session);
}
