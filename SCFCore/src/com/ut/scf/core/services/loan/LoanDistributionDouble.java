package com.ut.scf.core.services.loan;

import java.util.Collections;
import java.util.Comparator;
import java.util.Map;

import com.ut.comm.xml.product.FinSourcePara;


public class LoanDistributionDouble extends LoanDistribution{
	public void sortProductId(){
		Collections.sort(finsources,new Comparator<Object>() {
			@Override
			public int compare(Object arg0, Object arg1){
				// TODO Auto-generated method stub
				if(Integer.parseInt(((FinSourcePara)arg0).getPriority())
						<Integer.parseInt(((FinSourcePara)arg1).getPriority())){
					return -1;
				}else if(Integer.parseInt(((FinSourcePara)arg0).getPriority())
						>Integer.parseInt(((FinSourcePara)arg1).getPriority())){
					return 1;
				}else{
					return 0;
				}
			}
		});
	}
}
