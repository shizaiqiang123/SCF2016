package com.ut.scf.core.page;

import org.springframework.stereotype.Service;

import net.sf.json.JSONObject;

@Service("transactionEntry")
public class NormalPageEntry extends AbsPageEntry{

	@Override
	public boolean checkPageEntry(JSONObject dataDom) {
		return true;
	}

}
