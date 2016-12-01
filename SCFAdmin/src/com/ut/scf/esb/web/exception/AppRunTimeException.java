package com.ut.scf.esb.web.exception;

public class AppRunTimeException extends RuntimeException {

	 private static final long serialVersionUID = 1L;  
	    private String exceptionCode = "9999";  
	    public AppRunTimeException() {  
	        super();  
	    }  
	    public AppRunTimeException(String code) {  
	        super();  
	        if (code != null) {  
	            this.exceptionCode = code;  
	        }  
	    }  
	    public String getExceptionCode() {  
	        return exceptionCode;  
	    }  
	    public void setExceptionCode(String exceptionCode) {  
	        this.exceptionCode = exceptionCode;  
	    }  
}
