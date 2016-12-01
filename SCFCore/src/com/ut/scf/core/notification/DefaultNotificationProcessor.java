package com.ut.scf.core.notification;

import org.springframework.stereotype.Service;

import com.ut.scf.core.component.INotification;
@Service("apNotificationProcessor") 
public class DefaultNotificationProcessor implements INotification{

	@Override
	public void sendNoditfication(Object reqDom, Object resultDom) {
		System.out.println("send notification process...");
	}

}
