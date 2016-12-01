package com.ut.scf.core.services.edi.impl;

import java.util.ArrayList;
import java.util.List;

import org.w3c.dom.Element;

import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.tool.xml.XMLManager;

public class EDIElement implements Cloneable {
	/**
	 * 节点名称
	 */
	private String nodeName;
	/**
	 * 节点相对根节点的完整路径
	 */
	private String path;
	/**
	 * 节点是否是循环节点
	 */
	private boolean loop;
	/**
	 * 如果是循环节点，表示循环节点对应的交易数据路径
	 */
	private String loopPath;
	/**
	 * 节点mapping的值
	 */
	private String value;
	/**
	 * 节点mapping的类型 F:表示对应页面field，默认此值 V:表示实际值，不需要额外处理 C:表示需要计算的值，不如是某两个栏位的计算值
	 * 
	 */
	private String type;
	/**
	 * 节点值的formattor方法，如金额的formattor，日期栏位
	 */
	private String formattor;
	/**
	 * 节点对应的父节点
	 */
	private EDIElement parentEle;

	private List<EDIElement> childs;
	/**
	 * 节点状态 M:表示必输 C:表示不可以出现 O:表示可空
	 */
	private String status;

	private EDIElement() {

	}

	public EDIElement(Element ele) {
		this.setFormattor(XMLManager.getNodeAttribute(ele, "formattor"));
		this.setLoop("true".equalsIgnoreCase(XMLManager.getNodeAttribute(ele, "loop")));
		this.setLoopPath(XMLManager.getNodeAttribute(ele, "loopPath"));
		this.setNodeName(ele.getNodeName());
		this.setPath(XMLManager.getNodeAttribute(ele, "path"));
		this.setStatus(XMLManager.getNodeAttribute(ele, "status"));
		this.setType(XMLManager.getNodeAttribute(ele, "type"));
		this.setValue(XMLManager.getNodeValue(ele, true));
	}

	public String getNodeName() {
		return nodeName;
	}

	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public boolean isLoop() {
		return loop;
	}

	public void setLoop(boolean loop) {
		this.loop = loop;
	}

	public String getLoopPath() {
		return loopPath;
	}

	public void setLoopPath(String loopPath) {
		this.loopPath = loopPath;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		if (StringUtil.isTrimNotEmpty(type))
			type = type.toUpperCase();
		this.type = type;
	}

	public String getFormattor() {
		return formattor;
	}

	public void setFormattor(String formattor) {
		this.formattor = formattor;
	}

	public EDIElement getParentEle() {
		return parentEle;
	}

	public void setParentEle(EDIElement parentEle) {
		this.parentEle = parentEle;
		if (this.parentEle != null) {
			this.parentEle.addChild(this);
			if (parentEle.isLoop()) {
				this.setLoop(true);
			}
		}
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public EDIElement getChild(int index) {
		if (childs == null)
			return null;
		return childs.get(index);
	}

	public void addChild(EDIElement childEle) {
		if (childs == null) {
			childs = new ArrayList<EDIElement>();
		}
		childs.add(childEle);
	}
	
	public void appendChild(EDIElement childEle,EDIElement preEle) {
		if (childs == null) {
			childs = new ArrayList<EDIElement>();
		}
		int index = childs.indexOf(preEle);
		childs.add(index, childEle);
	}

	public boolean hasChilds() {
		if (childs == null)
			return false;
		return !childs.isEmpty();
	}

	public int getChildSize() {
		if (childs == null)
			return 0;
		return childs.size();
	}

	public void removeChild(int index) {
		if (childs != null && childs.size() > index)
			childs.remove(index);
	}
	
	public void removeChild(EDIElement index) {
		if (childs != null)
			childs.remove(index);
	}

	public EDIElement clone() {
		EDIElement element = new EDIElement();
		element.setFormattor(this.getFormattor());
		element.setLoop(this.isLoop());
		element.setLoopPath(this.getLoopPath());
		element.setNodeName(this.getNodeName());
		element.setPath(this.getPath());
		element.setStatus(this.getStatus());
		element.setType(this.getType());
		element.setValue(this.getValue());
		// element.setParentEle(this.getParentEle());
		if (this.hasChilds()) {
			for (int i = 0; i < this.getChildSize(); i++) {
				element.addChild(this.getChild(i).clone());
			}
		}

		return element;
	}

	public boolean equals(Object obj) {
		if (obj instanceof EDIElement) {
			EDIElement ele = (EDIElement) obj;
			return (getNodeName().equals(ele.getNodeName()) && getPath().equals(ele.getPath()));
		}
		return super.equals(obj);
	}

	public int hashCode() {
		int result = getNodeName().hashCode();
		result = 29 * result + getPath().hashCode();
		return result;
	}
}
