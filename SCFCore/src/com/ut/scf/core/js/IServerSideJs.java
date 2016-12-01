package com.ut.scf.core.js;

public interface IServerSideJs{
	/**
	 * @see 所有的请求数据，用以单个组件中获取或者更新全局数据，不会克隆
	 * @param trxData
	 */
	public void initAllReqData(Object tallData);
	
	/**
	 * @see 当前的请求数据，用以单个组件中获取或者更新当前数据，不会克隆
	 * @param trxData
	 */
	public void initReqData(Object trxData);
	
	/**
	 * @see 当前组件待处理的请求数据，方便组件只处理自己关注的数据
	 * 	一般情况下，此数据会做clone，以保证数据不被污染
	 * @param trxData
	 */
	public void initTrxData(Object trxData);
	
	/**
	 * @see 当前组件对应的参数配置文件
	 * @param trxPara
	 */
	public void initTrxPara(Object trxPara);
	
	/**
	 * @see 返回操作后的数据，其中数据已经被当前组件更新过
	 * @return
	 */
	public Object getTrxData();

	/**
	 * @see 返回操作后的参数文件，其中参数已经被当前组件更新过
	 * @return
	 */
	public Object getTrxPara();
	

	/**
	 * @see 提供执行js方法的入口
	 * @param js文件名称
	 */
	public void executeJsFile(String fileName) throws Exception;
	
	/**
	 * @see 提供执行js方法的入口
	 * @param js文件内容
	 */
	public void executeJsContent(String jsContent) throws Exception;
}
