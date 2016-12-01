package com.ut.scf.core.gapi.impl;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

import org.springframework.stereotype.Component;

import com.comm.pojo.report.IReportResponse;
import com.mchange.v2.c3p0.util.ConnectionEventSupport;
import com.ut.comm.tool.CompressUtil;
import com.ut.comm.tool.SerializeUtil;
import com.ut.comm.tool.file.FileReaderUtil;
import com.ut.comm.xml.gapi.GapiPara;
import com.ut.scf.core.gapi.IGAPIMessage;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;

@Component("HttpPostMsgImpl")
public class HttpPostMessageImpl implements IGAPIMessage{

	@Override
	public IGAPIMsgResponse sendMessage(GapiPara gapiObj,
			IGAPIMsgRequest message) throws Exception {
		// TODO Auto-generated method stub
	
//		URL url=null;
//		HttpURLConnection httpURLConnection=null;
//		try {
//			url=new URL(gapiObj.getSend());
//			httpURLConnection=(HttpURLConnection) url.openConnection();
//			httpURLConnection.setDoInput(true);
//			httpURLConnection.setDoOutput(true);
//			httpURLConnection.setUseCaches(false);
//			httpURLConnection.setConnectTimeout(50000);
//			httpURLConnection.setReadTimeout(50000);
//			httpURLConnection.setRequestMethod("POST");
////			httpURLConnection.setRequestProperty("HTTP headers", "");
//			httpURLConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
//			httpURLConnection.connect();
//			OutputStreamWriter osw=new OutputStreamWriter(httpURLConnection.getOutputStream(),"utf-8");
//			osw.write("&message="+message.getMsgBody().toString());
//			osw.flush();
//			osw.close(); 
//			if(httpURLConnection.getResponseCode()==200){
//				BufferedReader bufferedReader=new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream(),"utf-8"));
//				String inputString="";
//				String result="";
//				while((inputString=bufferedReader.readLine())!=null){
//					result+=inputString;
//				}
//				bufferedReader.close();
//				System.out.println("result="+result);
//			}
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}finally{
//			if(httpURLConnection!=null){
//				httpURLConnection.disconnect();
//			}			
//		}
		return null;
	}
	

	@Override
	public IGAPIMsgResponse receiveMessage(GapiPara gapiObj, String mappingID)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IGAPIMsgResponse rollback(GapiPara gapiObj, IGAPIMsgRequest message)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
