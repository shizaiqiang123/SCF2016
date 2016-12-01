package com.ut.scf.core.gapi.impl;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class text2 {
	public static void main(String[] args) {
		ServerSocket server = null;
		Socket you = null;
		String s = null;
		DataOutputStream out = null;
		DataInputStream in = null;
		try {
			server = new ServerSocket(20000);
		} catch (Exception e) {
			System.out.println(e);
		}
		try {
			System.out.println("等待客户端呼叫。。。");
			while (true) {
				you = server.accept();
				out = new DataOutputStream(you.getOutputStream());
				in = new DataInputStream(you.getInputStream());
				s = in.readUTF();
				System.out.println("服务器收到:" + s);
//				Thread.sleep(10000);
				out.writeUTF(s);
			}
		} catch (Exception e) {
			System.out.println("客户端已断开" + e);
		}
	}
}
