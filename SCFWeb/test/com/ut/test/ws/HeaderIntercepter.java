package com.ut.test.ws;

import org.apache.cxf.binding.soap.SoapMessage;
import org.apache.cxf.binding.soap.interceptor.AbstractSoapInterceptor;
import org.apache.cxf.databinding.DataBinding;
import org.apache.cxf.headers.Header;
import org.apache.cxf.interceptor.Fault;
import org.apache.cxf.jaxb.JAXBDataBinding;
import org.apache.cxf.phase.Phase;

import javax.xml.bind.JAXBException;
import javax.xml.namespace.QName;
import java.util.List;

/**
 * Created by iven1 on 2015-08-23.
 */
public class HeaderIntercepter extends AbstractSoapInterceptor {
  //  private String qname="http://trial.service.comm.ap.com";

    public HeaderIntercepter() {
        super(Phase.WRITE);
    }


    public void handleMessage(SoapMessage soapMessage) throws Fault {
        List<Header> headers = soapMessage.getHeaders();
        try {

            //创建QName
            String namespaceURI = "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd";
            String localPart = "Security";
            String prefix = "wsse";
            QName qname = new QName(namespaceURI, localPart,prefix);
           
            //创建需要使用header进行传输的对象
            String sendObj = "twf";


            //创建DataBinding
            DataBinding dataBinding = new JAXBDataBinding(String.class);
            QName qname1 = new QName("http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd", "UsernameToken",prefix);
            Header header1 = new Header(qname1, sendObj, dataBinding);
            DataBinding dataBinding1 = new JAXBDataBinding(Header.class);
            //创建Header
            Header header = new Header(qname, header1, dataBinding1);
            
            //将header加入到SOAP头集合中
            headers.add(header);
        } catch (JAXBException e) {
            e.printStackTrace();
            throw new Fault(e);
        }



    }
}
