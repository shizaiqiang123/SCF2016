package com.ut.scf.core.services.message;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.ThreadPoolExecutor.DiscardOldestPolicy;

public class Test {
	private ServerSocket serverSocket;
	private ArrayBlockingQueue<Runnable> aq;
	private DiscardOldestPolicy dp;
	private ThreadPoolExecutor exec;
	private ThreadPoolExecutor exec1;
	static int count = 0;

	public Test() {
		try {
			InetAddress address = InetAddress.getByName("127.0.0.1");
			//数据库获得配置端口
			serverSocket = new ServerSocket(9999, 1024, address);
			aq = new ArrayBlockingQueue<Runnable>(20);//缓冲队列
			dp = new ThreadPoolExecutor.DiscardOldestPolicy();//处理策略 抛弃旧的任务
			exec = new ThreadPoolExecutor(10, 40, 0, TimeUnit.SECONDS, aq, dp);
			exec1 = new ThreadPoolExecutor(10, 40, 0, TimeUnit.SECONDS, aq, dp);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void service() {
		Socket socket = null;
		try {
			while (true) {
				// 接收客户连接,只要客户进行了连接,就会触发accept();从而建立连接
				if (!exec.isShutdown()) {
					socket = serverSocket.accept();
					//long beginTime = System.currentTimeMillis();
					//进入主方法
					System.out.println("开始。。。。。");
					UCRABSendToServer sever = new UCRABSendToServer(socket);
					if (count == 0) {
						exec.execute(sever);
						count = 1;
					} else {
						exec1.execute(sever);
						count = 0;
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			close(serverSocket, socket);
		}
	}

	public void close(ServerSocket serverSocket, Socket socket) {
		try {
			if (serverSocket != null) {
				serverSocket.close();
			}
			if (socket != null) {
				socket.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	

	public static void main(String[] args) {
		try {
			System.out.println("服务器启动");
			Test server = new Test();
			server.service();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
