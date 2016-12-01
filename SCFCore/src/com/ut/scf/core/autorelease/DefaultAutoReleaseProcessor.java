package com.ut.scf.core.autorelease;

import org.springframework.stereotype.Service;

import com.ut.scf.core.component.IAutoRelease;
@Service("apAutoReleaseProcessor") 
public class DefaultAutoReleaseProcessor implements IAutoRelease{

	@Override
	public void autoRelease(Object reqDom, Object resultDom) {
		System.out.println("auto release process...");
	}

}
