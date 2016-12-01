package com.ut.scf.pro.component.logic;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.ref.RefPara;
import com.ut.scf.core.component.ITemplateReformat;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.ref.IReferenceNo;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.orm.std.StdGoodsCata;

@Component("collatInTemplateImpl")
public class CollatInTemplateImpl implements ITemplateReformat {

	@Resource(name = "refNoManager")
	IReferenceNo refNoManager;

	@Resource(name = "daoHelper")
	protected IDaoHelper daoExecHelper;

	private static Logger logger = LoggerFactory
			.getLogger(CollatInTemplateImpl.class);

	@Override
	public void reformat(FuncDataObj logicObj) throws Exception {
		logger.info("==================InvTemplateReformatImpl.reformat  start==========================");
		List list = (List) logicObj.getData().get(logicObj.getDoName());

		checkData(logicObj, list);// 校验数据

		list = getSysRefNo(logicObj, list);// 获取商品流水加入list中。

		logicObj.buildRespose(list);
		logger.info("==================InvTemplateReformatImpl.reformat  end==========================");
	}

	private void checkData(FuncDataObj logicObj, List list) throws Exception {
		List<String> collList = new ArrayList<String>();
		StringBuilder sb = new StringBuilder();
		try {
			JSONObject trxData = JsonHelper.getTrxObject(logicObj.getReqData());
			String trxSelNm = trxData.getString("selNm");// 卖方名称
			String invNoListStr = trxData.getString("invNoList");
			List invNoList = Arrays.asList(invNoListStr.split(","));
			String selNm = "";
			String collatCcy = "";
			for (int i = 0; i < list.size(); i++) {
				Map map = (Map) list.get(i);
				collList.add((String) map.get("collatId"));

				if (invNoList.contains((String) map.get("collatId"))) {
					sb.append("商品编号为：【" + map.get("collatId")
							+ "】的商品在表格中已存在。\r\n");
				}
				;
				selNm = (String) map.get("selNm");
				collatCcy = (String) map.get("collatCcy");
			}
			if (StringUtils.isEmpty(selNm)) {
				sb.append("卖方名称不能为空！\r\n");
			}
			if (!trxSelNm.equals(selNm)) {
				sb.append("上传的卖方名称：【" + selNm + "】,与协议中的卖方名称：【" + trxSelNm
						+ "】不一致。\r\n");
			}
			if (StringUtils.isEmpty(collatCcy)) {
				sb.append("币别不能为空!\r\n");
			}
			if (singleElement(collList)) {
				sb.append("文件中存在重复的商品编号! \r\n");
			}
			String goodsId=exitGoodsId(collList);
			if (goodsId != null) {
				sb.append("商品编号为：【" + goodsId+ "】的商品不存在于商品表中。\r\n");
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			sb.append(e.getMessage());
		} finally {
			if (StringUtils.isNotEmpty(sb.toString())) {
				throw new Exception(sb.toString());
			}
		}
	}

	/**
	 * 判断是否有list重复元素
	 * 
	 * @param datas
	 * @return
	 * @see [类、类#方法、类#成员]
	 */
	private boolean singleElement(List<?> datas) {
		List newDatas = new ArrayList();
		boolean flag = false;
		for (Iterator it = datas.iterator(); it.hasNext();) {
			Object obj = it.next();
			if (newDatas.contains(obj)) {
				flag = true;
				break;
			} else {
				newDatas.add(obj);
			}
		}
		return flag;
	}

	/**
	 * 判断商品是否存在商品表中,若不存在，返回该商品ID
	 */
	private String exitGoodsId(List<String> datas) {
		String sql = " from StdGoodsCata ";
		List<StdGoodsCata> obj = (List<StdGoodsCata>) daoExecHelper.execQuery(sql);
		List<String> goodsId = new ArrayList<String>();
		for(StdGoodsCata data:obj){
			goodsId.add(data.getGoodsId());
		}
		for (int i = 0; i < datas.size(); i++) {
			String collatId = datas.get(i);
			if (goodsId.indexOf(collatId) == -1) {
				return collatId;
			}
		}
		return null;

	}

	public static void main(String[] args) {

	}

	/**
	 * 获取每张应收账款的流水，并将发票余额、协议号和批次号写入list
	 * 
	 * @param logicObj
	 * @param list
	 * @return
	 * @see [类、类#方法、类#成员]
	 */
	private List getSysRefNo(FuncDataObj logicObj, List list) {
		List refList = new ArrayList();

		JSONObject trxData = JsonHelper.getTrxObject(logicObj.getReqData());
		RefPara refPara = new RefPara();
		refPara.setRefname("Collat");
		refPara.setReffield("sysRefNo");

		FuncDataObj funObj = new FuncDataObj();
		funObj.setReqParaObj(refPara);
		funObj.setReqData(logicObj.getReqData());
		;
		for (int i = 0; i < list.size(); i++) {
			FuncDataObj retData = null;
			try {
				retData = (FuncDataObj) refNoManager.generateNo(funObj);
			} catch (Exception e) {
				e.printStackTrace();
			}
			List listRef = (List) retData.getData().get(retData.getDoName());
			String sysRefNo = (String) ((Map) listRef.get(0)).get("sysRefNo");
			Map map = (Map) list.get(i);
			map.put("sysRefNo", sysRefNo);
			map.put("collatCcy", map.get("collatCcy"));
			refList.add(map);
		}
		logger.info(list.toString());
		return refList;
	}

}
