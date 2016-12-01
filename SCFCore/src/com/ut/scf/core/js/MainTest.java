package com.ut.scf.core.js;

public class MainTest {
	public static void main(String[] args){
		ServerSideJsImpl js = new ServerSideJsImpl();
		String jsContent = "var d = 100*20/10; $.print(d)";
//		js.execute(jsContent);
	}
}
