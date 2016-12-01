package com.ut.scf.orm.trx;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;


/**
 * CnEId entity. @author MyEclipse Persistence Tools
 */
@Embeddable
@DynamicUpdate(true)
@DynamicInsert(true)
public class CnEId  implements java.io.Serializable {


    // Fields    

     private String sysRefNo;
     private BigDecimal sysEventTimes;


    // Constructors

    /** default constructor */
    public CnEId() {
    }

    
    /** full constructor */
    public CnEId(String sysRefNo, BigDecimal sysEventTimes) {
        this.sysRefNo = sysRefNo;
        this.sysEventTimes = sysEventTimes;
    }

   
    // Property accessors

    @Column(name="SYS_REF_NO", nullable=false, length=35)

    public String getSysRefNo() {
        return this.sysRefNo;
    }
    
    public void setSysRefNo(String sysRefNo) {
        this.sysRefNo = sysRefNo;
    }

    @Column(name="SYS_EVENT_TIMES", nullable=false, precision=38, scale=0)

    public BigDecimal getSysEventTimes() {
        return this.sysEventTimes;
    }
    
    public void setSysEventTimes(BigDecimal sysEventTimes) {
        this.sysEventTimes = sysEventTimes;
    }
   



   public boolean equals(Object other) {
         if ( (this == other ) ) return true;
		 if ( (other == null ) ) return false;
		 if ( !(other instanceof CnEId) ) return false;
		 CnEId castOther = ( CnEId ) other; 
         
		 return ( (this.getSysRefNo()==castOther.getSysRefNo()) || ( this.getSysRefNo()!=null && castOther.getSysRefNo()!=null && this.getSysRefNo().equals(castOther.getSysRefNo()) ) )
 && ( (this.getSysEventTimes()==castOther.getSysEventTimes()) || ( this.getSysEventTimes()!=null && castOther.getSysEventTimes()!=null && this.getSysEventTimes().equals(castOther.getSysEventTimes()) ) );
   }
   
   public int hashCode() {
         int result = 17;
         
         result = 37 * result + ( getSysRefNo() == null ? 0 : this.getSysRefNo().hashCode() );
         result = 37 * result + ( getSysEventTimes() == null ? 0 : this.getSysEventTimes().hashCode() );
         return result;
   }   





}