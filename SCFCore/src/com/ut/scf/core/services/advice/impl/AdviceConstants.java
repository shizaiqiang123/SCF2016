package com.ut.scf.core.services.advice.impl;

public class AdviceConstants { 
	public static final int ADV_MSG_STATUS_UNVALID = 1;
	public static final int ADV_MSG_STATUS_VALID = 2;
	public static final int ADV_MSG_STATUS_INVALID = 3;
	public static final int ADV_MSG_STATUS_DELETED = 4;
	public static final int ADV_MSG_STATUS_DRAFT= 5;
	
	public static final int ADV_MSG_REMIND_TP_NORMAL = 1;
	public static final int ADV_MSG_REMIND_TP_IMPORTANT = 2;
	public static final int ADV_MSG_REMIND_TP_WARNING = 3;
	
	public static final int ADV_MSG_GROUP_TP_P2P =1;
	public static final int ADV_MSG_GROUP_TP_P2G =2;
	
	public static final int ADV_MSG_SEND_TP_INSIDE = 0;
	public static final int ADV_MSG_SEND_TP_MAIL = 1;
	public static final int ADV_MSG_SEND_TP_MSG = 2;
	public static final int ADV_MSG_SEND_TP_APP = 3;
	
	public static final int MSG_STATUS_UNREAD = 1;
	public static final int MSG_STATUS_READED = 2;
	public static final int MSG_STATUS_IMPORTANT = 3;
	public static final int MSG_STATUS_REMIND = 4;
	public static final int MSG_STATUS_DELETED = 5;
	
	//BUSS_TYPE	String	1				业务类型(0=个人，1=企业)
    public static final String BLACKLIST_M_BUSS_TYPE_ENTER  = "2";
    public static final String BLACKLIST_M_BUSS_TYPE_PERSON = "1";
	
	//added by zhangyilei 消息类型
	//黑名单预警
	public static final int MESSAGE_TYPE_BLACKLIST  = 1;
	//将到期应收账款预警
	public static final int MESSAGE_TYPE_DUEARALARM = 2;
	//将到期融资预警
    public static final int MESSAGE_TYPE_DUELOANALARM     = 3;
	//逾期应收账款预警
    public static final int MESSAGE_TYPE_OVERDUEARALARM   = 4;
	//已逾期融资预警
    public static final int MESSAGE_TYPE_OVERDUELOANALARM = 5;
	//同步网点信息
    public static final int MESSAGE_TYPE_SYNCINST = 6;
	//同步账号流水
    public static final int MESSAGE_TYPE_SYNCACCOUNTREFNO = 7;
	//同步融资余额
    public static final int MESSAGE_TYPE_SYNCLOANBALANCE = 8;
	//合格证未释放
    public static final int MESSAGE_TYPE_CRTFNORELEASE = 9;
    
    //额度协议类型-三方业务
    public static final int CONTRACT_BUSI_TP_THIRD_PARTY = 2;
    // 池融资下补充池水位预警 （add on 2016-09-08 by JinJH）
    public static final int MESSAGE_TYPE_POOLLINEDOWNARALARM   = 10;
    
    //预付类协议到期,质物出库预警
    public static final int MESSAGE_TYPE_CRTFOUTALARM = 11;
    
    //存货类协议到期,质物出库预警
    public static final int MESSAGE_TYPE_COLLATCHOUTALARM = 12;
    
    //预付类融资到期预警
    public static final int MESSAGE_TYPE_PREPAYLOANDUEALARM = 13;
    
    //存货类融资到期预警
    public static final int MESSAGE_TYPE_INVENTORYLOANDUEALARM = 14;
    
    //协议下库存价值总额小于最低库存价值预警
    public static final int MESSAGE_TYPE_TTLREGAMTLESSREGLOWESTVALALARM = 15;
    
    //协议下库存价值总额小于协议下融资余额预警
    public static final int MESSAGE_TYPE_TTLREGAMTLESSOPENLOANAMTALARM = 16;
}
