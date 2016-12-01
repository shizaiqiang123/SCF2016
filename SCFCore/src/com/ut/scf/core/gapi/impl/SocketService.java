package com.ut.scf.core.gapi.impl;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class SocketService {
	public static void main(String[] args) {
		ServerSocket server = null;
		Socket client = null;
		try {
			server = new ServerSocket(20000);
		} catch (Exception e) {
			System.out.println(e);
		}
		System.out.println("等待客户端接入...");

		try {
			while (true) {
				client = server.accept();
				SocketService.singleServer single = new SocketService().new singleServer(client);
				single.start();
			}
		} catch (Exception e) {
			System.out.println("服务端处理失败：" + e);
		}
	}

	class singleServer extends Thread {
		private Socket socket;

		public singleServer(Socket _socket) {
			this.socket = _socket;
		}

		public void run() {
			BufferedInputStream inputStrwam = null;
			try {
				inputStrwam = new BufferedInputStream(socket.getInputStream());
				ByteArrayOutputStream bao = new ByteArrayOutputStream();
				byte[] b = new byte[4];
				int bytesRead = 0;
				String request = "";
				bytesRead = inputStrwam.read(b, 0, b.length);
				String len = new String(b, "GBK");
				int intLen = Integer.parseInt(len);
				System.out.println("Request length:"+intLen);

				b = new byte[intLen];

				bytesRead = inputStrwam.read(b, 0, b.length);
				bao.write(b, 0, bytesRead);
				bao.flush();
				request = bao.toString();
				System.out.println("Request Content:"+request);

				ByteArrayOutputStream arr = new ByteArrayOutputStream();
				arr.write("bye".getBytes());
				arr.write(request.getBytes("GBK"));
				BufferedOutputStream buff = new BufferedOutputStream(socket.getOutputStream());
				buff.write(arr.toByteArray());
				System.out.println("Response Content:"+new String(arr.toByteArray(),"GBK"));
				buff.flush();
				buff.close();
				inputStrwam.close();
				bao.close();
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				try {
					socket.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
				if(inputStrwam!=null)
					try {
						inputStrwam.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
			}

		}
	}

	public byte[] int2bytes(int num) {
		byte[] b = new byte[4];
		for (int i = 0; i < 4; i++) {
			b[i] = (byte) (num >>> (24 - i * 8));
		}
		return b;
	}

	public int bytes2int(byte[] b) {
		for (int i = 0; i < b.length; i++) {
			byte c = b[i];
			int ic = c & 0xff;
			System.out.print(ic);
		}
		return 0;
	}
}
