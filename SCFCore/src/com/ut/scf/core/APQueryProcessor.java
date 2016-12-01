package com.ut.scf.core;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.utils.ApSessionUtil;

/**
 * 
 * @author PanHao
 * @see
 * @since 1.0
 *
 */
@Service("aPQueryProcessor") 
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class APQueryProcessor extends AbsAPProcessor{

	/**
	 * @author PanHao
	 * @para 
	 * <?xml version="1.0" encoding="UTF-8"?>
		<root>
			<comm>
				<bank>TEST</bank>
				<cnty>CN</cnty>
				<branch>1001</branch>
			</comm>
			<userInfo>
				<id>200501</id>
			</userInfo>
			<funcInfo>
				<id>F0000001</id>
				<name>测试</name>
				<desc>测试当前fucntion功能</desc>
			</funcInfo>
			<trxDom>
				<id>test001</id>
			</trxDom>
		</root>
	 */

	@Override
	protected Object doProcess(IMainComponent instance, Object dataDom) throws Exception {
		
		return instance.queryData(dataDom);
	}

	@Override
	protected void customizeContext() {
		ApSessionUtil.getContext().setStrTrxType(ComponentConst.COMP_TRX_TYPE_QUERY);
	}
 

}
