package com.ut.scf.core.component;

import com.ut.comm.xml.page.PagePara;

public interface IGetPage {
	public PagePara getCurrentPage(int strPageIndex);
	
	public PagePara getMainPage();
}
