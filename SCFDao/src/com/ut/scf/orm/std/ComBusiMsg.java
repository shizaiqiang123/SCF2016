package com.ut.scf.orm.std;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;


/**
 * comFun entity. @author yhy
 * 业务数据展示功能
 */
@Entity
@Table(name="com_busi_msg"
,schema="STD"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class ComBusiMsg  implements java.io.Serializable {


    // Fields    
	   	private String sysRefNo;
	     private String sysBusiUnit;
	     private String sysOpId;
	     private Timestamp sysOpTm;
	     private String sysRelId;
	     private Timestamp sysRelTm;
	     private String sysAuthId;
	     private Timestamp sysAuthTm;
	     private String sysNextOp;
	     private String sysLockFlag;
	     private String sysLockBy;
	     private String sysFuncId;
	     private String sysTrxSts;
	     private Integer sysEventTimes;
	     private String funId;
	     private String funNm;
	     private String funPath;
	     private String funUrl;
	     private String funTitle;
	     private String funType;
	     private String funLevel;
	     private String userQueryId;
//	     private String column2Id;
//	     private String column3Id;
	     private String btnNm;

	    // Constructors

		/** default constructor */
	     public ComBusiMsg() {
				super();
				// TODO Auto-generated constructor stub
			}

		/** minimal constructor */
	     public ComBusiMsg(String sysRefNo, Integer sysEventTimes, String funId) {
				super();
				this.sysRefNo = sysRefNo;
				this.sysEventTimes = sysEventTimes;
				this.funId = funId;
			}
	    
	   

		/** full constructor */
	     public ComBusiMsg(String sysRefNo, String sysBusiUnit, String sysOpId,
					Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm,
					String sysAuthId, Timestamp sysAuthTm, String sysNextOp,
					String sysLockFlag, String sysLockBy, String sysFuncId,
					String sysTrxSts, Integer sysEventTimes, String funId,
					String funNm, String funPath, String funUrl, String funTitle,
					String funType, String funLevel, String userQueryId, String btnNm) {
				super();
				this.sysRefNo = sysRefNo;
				this.sysBusiUnit = sysBusiUnit;
				this.sysOpId = sysOpId;
				this.sysOpTm = sysOpTm;
				this.sysRelId = sysRelId;
				this.sysRelTm = sysRelTm;
				this.sysAuthId = sysAuthId;
				this.sysAuthTm = sysAuthTm;
				this.sysNextOp = sysNextOp;
				this.sysLockFlag = sysLockFlag;
				this.sysLockBy = sysLockBy;
				this.sysFuncId = sysFuncId;
				this.sysTrxSts = sysTrxSts;
				this.sysEventTimes = sysEventTimes;
				this.funId = funId;
				this.funNm = funNm;
				this.funPath = funPath;
				this.funUrl = funUrl;
				this.funTitle = funTitle;
				this.funType = funType;
				this.funLevel = funLevel;
				this.userQueryId = userQueryId;
				this.btnNm=btnNm;
			}

		// Property accessors
	    @Id 
	    
	    @Column(name="SYS_REF_NO", unique=true, nullable=false, length=35)

	    public String getSysRefNo() {
	        return this.sysRefNo;
	    }

		

		public void setSysRefNo(String sysRefNo) {
	        this.sysRefNo = sysRefNo;
	    }
	    
	    @Column(name="sys_busi_unit", length=35)

	    public String getSysBusiUnit() {
	        return this.sysBusiUnit;
	    }
	    
	    public void setSysBusiUnit(String sysBusiUnit) {
	        this.sysBusiUnit = sysBusiUnit;
	    }
	    
	    @Column(name="fun_id", length=35)
	    
		public String getFunId() {
			return funId;
		}

		public void setFunId(String funId) {
			this.funId = funId;
		}

	    @Column(name="fun_nm", length=35)
	    
		public String getFunNm() {
			return funNm;
		}

		public void setFunNm(String funNm) {
			this.funNm = funNm;
		}
	    
	    
	    @Column(name="fun_path", length=200)

	    public String getFunPath() {
			return funPath;
		}

		public void setFunPath(String funPath) {
			this.funPath = funPath;
		}
	    
	    @Column(name="SYS_OP_ID", length=35)

	    public String getSysOpId() {
	        return this.sysOpId;
	    }
	    
	    public void setSysOpId(String sysOpId) {
	        this.sysOpId = sysOpId;
	    }
	    
	    @Column(name="SYS_OP_TM", length=19)

	    public Timestamp getSysOpTm() {
	        return this.sysOpTm;
	    }
	    
	    public void setSysOpTm(Timestamp sysOpTm) {
	        this.sysOpTm = sysOpTm;
	    }
	    
	    @Column(name="SYS_REL_ID", length=35)

	    public String getSysRelId() {
	        return this.sysRelId;
	    }
	    
	    public void setSysRelId(String sysRelId) {
	        this.sysRelId = sysRelId;
	    }
	    
	    @Column(name="SYS_REL_TM", length=19)

	    public Timestamp getSysRelTm() {
	        return this.sysRelTm;
	    }
	    
	    public void setSysRelTm(Timestamp sysRelTm) {
	        this.sysRelTm = sysRelTm;
	    }
	    
	    @Column(name="SYS_AUTH_ID", length=35)

	    public String getSysAuthId() {
	        return this.sysAuthId;
	    }
	    
	    public void setSysAuthId(String sysAuthId) {
	        this.sysAuthId = sysAuthId;
	    }
	    
	    @Column(name="SYS_AUTH_TM", length=19)

	    public Timestamp getSysAuthTm() {
	        return this.sysAuthTm;
	    }
	    
	    public void setSysAuthTm(Timestamp sysAuthTm) {
	        this.sysAuthTm = sysAuthTm;
	    }
	    
	    @Column(name="SYS_NEXT_OP", length=35)

	    public String getSysNextOp() {
	        return this.sysNextOp;
	    }
	    
	    public void setSysNextOp(String sysNextOp) {
	        this.sysNextOp = sysNextOp;
	    }
	    
	    @Column(name="SYS_LOCK_FLAG", length=1)

	    public String getSysLockFlag() {
	        return this.sysLockFlag;
	    }
	    
	    public void setSysLockFlag(String sysLockFlag) {
	        this.sysLockFlag = sysLockFlag;
	    }
	    
	    @Column(name="SYS_LOCK_BY", length=35)

	    public String getSysLockBy() {
	        return this.sysLockBy;
	    }
	    
	    public void setSysLockBy(String sysLockBy) {
	        this.sysLockBy = sysLockBy;
	    }
	    
	    @Column(name="SYS_FUNC_ID", length=35)

	    public String getSysFuncId() {
	        return this.sysFuncId;
	    }
	    
	    public void setSysFuncId(String sysFuncId) {
	        this.sysFuncId = sysFuncId;
	    }
	    
	    @Column(name="SYS_TRX_STS", length=1)

	    public String getSysTrxSts() {
	        return this.sysTrxSts;
	    }
	    
	    public void setSysTrxSts(String sysTrxSts) {
	        this.sysTrxSts = sysTrxSts;
	    }
	  
	    @Column(name="SYS_EVENT_TIMES", nullable=false)

	    public Integer getSysEventTimes() {
	        return this.sysEventTimes;
	    }
	    
	    public void setSysEventTimes(Integer sysEventTimes) {
	        this.sysEventTimes = sysEventTimes;
	    }
	    
	    
	   
	    
	    @Column(name="FUN_URL", length=35)

	    public String getFunUrl() {
			return funUrl;
		}

		public void setFunUrl(String funUrl) {
			this.funUrl = funUrl;
		}
		
	    @Column(name="FUN_TITLE", length=35)
	    
	    public String getFunTitle() {
			return funTitle;
		}

		public void setFunTitle(String funTitle) {
			this.funTitle = funTitle;
		}

		 @Column(name="FUN_TYPE", length=10)
		public String getFunType() {
			return funType;
		}

		public void setFunType(String funType) {
			this.funType = funType;
		}

		@Column(name="FUN_LEVEL", length=10)
		public String getFunLevel() {
			return funLevel;
		}

		public void setFunLevel(String funLevel) {
			this.funLevel = funLevel;
		}
		
		@Column(name="USER_QUERY_ID", length=35)
		public String getUserQueryId() {
			return userQueryId;
		}

		public void setUserQueryId(String userQueryId) {
			this.userQueryId = userQueryId;
		}
	
		@Column(name="BTN_NM", length=35)
		public String getBtnNm() {
			return btnNm;
		}
		public void setBtnNm(String btnNm) {
			this.btnNm = btnNm;
		}

		

		

}