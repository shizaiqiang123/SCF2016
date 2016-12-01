package com.ut.scf.mule.transformer;

import org.mule.api.transformer.TransformerException;
import org.mule.config.i18n.Message;
import org.mule.transformer.AbstractTransformer;
import org.mule.transformer.types.DataTypeFactory;
import org.w3c.dom.Document;

import com.ut.comm.tool.xml.XMLManager;

public class StringToFileTrasnformer extends AbstractTransformer{

	
	 public StringToFileTrasnformer()
	    {
	        super();
	        this.registerSourceType(DataTypeFactory.STRING);
	        this.setReturnDataType(DataTypeFactory.INPUT_STREAM);
	    }

	@Override
	protected Object doTransform(Object src, String enc) throws TransformerException {
		Document retXML =null;
		try {
			retXML = XMLManager.xmlStrToDom(src.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return retXML;
	}

}
