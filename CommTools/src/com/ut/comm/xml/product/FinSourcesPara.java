package com.ut.comm.xml.product;

import java.util.ArrayList;
import java.util.List;

import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaHelper;

public class FinSourcesPara extends AbsObject{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public FinSourcesPara(){
		XMLParaHelper.registeObjectBean("finsource", FinSourcePara.class);
	}

	@Override
	public String getNodeName() {
		return "finsources";
	}

	private List<FinSourcePara> finSources;
	
	public List<FinSourcePara> getFinSources() {
		return finSources;
	}
	public void setFinsource(FinSourcePara finSources) {
		if(this.finSources==null)
			this.finSources = new ArrayList<FinSourcePara>();
		this.finSources.add(finSources);
	}
	
	public FinSourcePara getFinSource(int index) {
		FinSourcePara finPara = finSources.get(index);
		return finPara;
	}
	public void setFinsource(FinSourcePara logic,int index) {
		if(this.finSources==null)
			this.finSources = new ArrayList<FinSourcePara>();
		if(index>this.finSources.size())
			this.finSources.add(logic);
	}
	
	public int getFinSourceSize(){
		return this.finSources==null?0:this.finSources.size();
	}
}
