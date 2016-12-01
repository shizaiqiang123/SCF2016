package com.ut.test.post;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import org.apache.commons.httpclient.HostConfiguration;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;


public class Test {
	public static void main(String[] args) throws Exception {

		HttpClient httpclient = new HttpClient();
		HostConfiguration hostConfiguration = new HostConfiguration();
		PostMethod httpMethod = new PostMethod("http://localhost:8080/SCFWeb/scfPost");
		httpMethod.setRequestHeader("content-type", "text/html;charset=utf-8");
		httpMethod.setRequestHeader("connection", "Keep-Alive");
		httpMethod.setRequestBody(b2e0298());
		httpclient.executeMethod(httpMethod);
		BufferedReader in = new BufferedReader(
				new InputStreamReader(httpMethod.getResponseBodyAsStream(), httpMethod.getResponseCharSet()));
		StringBuffer sb = new StringBuffer();
		String line = null;
		while ((line = in.readLine()) != null) {
			sb.append(line);
		}
		System.out.println(sb.toString());
	}

	private static String b2e0082() {
		String string1 = "";
		string1 += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		string1 += "<bocb2e version=\"120\" locale=\"zh_CN\">";
		string1 += "<head>";
		string1 += "<termid>E010065105065</termid>";
		string1 += "<trnid>0000000001</trnid>";
		string1 += "<custid>25378061</custid>";
		string1 += "<cusopr>25967778</cusopr>";
		string1 += "<trncod>b2e0082</trncod>";
		string1 += "</head>";
		string1 += "<trans>";
		string1 += "<trn-b2e0082-rq>";
		string1 += "<b2e0082-rq>";
		string1 += "<scfp>";
		string1 += "<transReturnData>";
		string1 += "<acrcInvTrfRs>";
		string1 += "<relatedRef>20140101010101</relatedRef>";
		string1 += "<applyState>2</applyState>";
		string1 += "<paymentApprvData>";
		string1 += "<circleNum>4</circleNum>";
		string1 += "<paymentApprv>";
		string1 += "<invNo>wjh1123111</invNo>";
		string1 += "<pmtApplyState>1</pmtApplyState>";
		string1 += "</paymentApprv>";
		string1 += "<paymentApprv>";
		string1 += "<invNo>wjh1123122</invNo>";
		string1 += "<pmtApplyState>2</pmtApplyState>";
		string1 += "</paymentApprv>";
		string1 += "<paymentApprv>";
		string1 += "<invNo>ZQVTS1126001</invNo>";
		string1 += "<pmtApplyState>3</pmtApplyState>";
		string1 += "</paymentApprv>";
		string1 += "<paymentApprv>";
		string1 += "<invNo>ZQVTS1126002</invNo>";
		string1 += "<pmtApplyState>4</pmtApplyState>";
		string1 += "</paymentApprv>";
		string1 += "</paymentApprvData>";
		string1 += "</acrcInvTrfRs>";
		string1 += "</transReturnData>";
		string1 += "</scfp>";
		string1 += "</b2e0082-rq>";
		string1 += "</trn-b2e0082-rq>";
		string1 += "</trans>";
		string1 += "</bocb2e>";
		return string1;
	}

	private static String b2e0272() {
		String string1 = "";
		string1 += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>                                     ";
		string1 += "<bocb2e version=\"120\" locale=\"zh_CN\">                                      ";
		string1 += "	<head>                                                                   ";
		string1 += "		<termid>E010065105065</termid>                                       ";
		string1 += "		<trnid>0000000001</trnid>                                            ";
		string1 += "		<custid>25378061</custid>                                            ";
		string1 += "		<cusopr>25967778</cusopr>                                            ";
		string1 += "		<trncod>b2e0272</trncod>                                             ";
		string1 += "	</head>                                                                  ";
		string1 += "	<trans>                                                                  ";
		string1 += "		<trn-b2e0272-rq>                                                     ";
		string1 += "			<b2e0272-rq>                                                     ";
		string1 += "				<scfp>                                                       ";
		string1 += "					<transReturnData>                                        ";
		string1 += "						<acrcRepayRs>                                        ";
		string1 += "							<relatedRef>Pmt0000554</relatedRef>              ";
		string1 += "							<applyState>2</applyState>                       ";
		string1 += "							<acrcRepayApprvData>                             ";
		string1 += "								<circleNum>1</circleNum>                     ";
		string1 += "								<acrcRepayApprv>                             ";
		string1 += "									<applDtalRef>1</applDtalRef>             ";
		string1 += "									<repayApplyState>1</repayApplyState>     ";
		string1 += "								</acrcRepayApprv>                            ";
		string1 += "							</acrcRepayApprvData>                            ";
		string1 += "						</acrcRepayRs>                                       ";
		string1 += "					</transReturnData>                                       ";
		string1 += "				</scfp>                                                      ";
		string1 += "			</b2e0272-rq>                                                    ";
		string1 += "		</trn-b2e0272-rq>                                                    ";
		string1 += "	</trans>                                                                 ";
		string1 += "</bocb2e>                                                                  ";
		return string1;
	}

	private static String b2e0298() {
		String string1 = "";
		string1 += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>                                      ";
		string1 += "<bocb2e version=\"120\" locale=\"zh_CN\">                                       ";
		string1 += "	<head>                                                                    ";
		string1 += "		<termid>E010065105065</termid>                                        ";
		string1 += "		<trnid>0000000001</trnid>                                             ";
		string1 += "		<custid>25378061</custid>                                             ";
		string1 += "		<cusopr>25967778</cusopr>                                             ";
		string1 += "		<trncod>b2e0298</trncod>                                              ";
		string1 += "	</head>                                                                   ";
		string1 += "	<trans>                                                                   ";
		string1 += "		<trn-b2e0298-rq>                                                      ";
		string1 += "			<b2e0298-rq>                                                      ";
		string1 += "				<scfp>                                                        ";
		string1 += "					<transReturnData>                                         ";
		string1 += "						<acrcFincRs>                                          ";
		string1 += "							<relatedRef>ploan0000352</relatedRef>               ";
		string1 += "							<applyState>2</applyState>                        ";
		string1 += "							<processDate>20151203</processDate>               ";
		string1 += "							<acrcFincApprvData>                               ";
		string1 += "								<circleNum>1</circleNum>                      ";
		string1 += "								<acrcFincApprv>                               ";
		string1 += "									<applDtalRef>1</applDtalRef>              ";
		string1 += "									<loanApplyState>1</loanApplyState>        ";
		string1 += "								</acrcFincApprv>                              ";
		string1 += "							</acrcFincApprvData>                              ";
		string1 += "						</acrcFincRs>                                         ";
		string1 += "					</transReturnData>                                        ";
		string1 += "				</scfp>                                                       ";
		string1 += "			</b2e0298-rq>                                                     ";
		string1 += "		</trn-b2e0298-rq>                                                     ";
		string1 += "	</trans>                                                                  ";
		string1 += "</bocb2e>                                                                   ";
		return string1;
	}

}
