/**
 * 所有方法转到SCFUtils.js下。此js方法废弃。2014-11-10
 * @param o
 * @returns {String}
 */
function json2str(o) {
	var arr = [];
	var fmt = function(s) {
		if (typeof s == 'object' && s != null) {

			return json2str(s);
		}
		return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
	};
	if (isArray(o)) {
		return JsonArrayToStringCfz(o);
	} else {
		for ( var i in o)
			arr.push("'" + i + "':" + fmt(o[i]));
		return '{' + arr.join(',') + '}';
	}

}

function JsonArrayToStringCfz(jsonArray) {
	var JsonArrayString = "[";
	for (var i = 0; i < jsonArray.length; i++) {
		if (i == (jsonArray.length - 1)) {
			JsonArrayString = JsonArrayString + json2str(jsonArray[i]);
		} else {
			JsonArrayString = JsonArrayString + json2str(jsonArray[i]) + ",";
		}

	}
	JsonArrayString = JsonArrayString + "]";
	return JsonArrayString;
}

/**
 * 将jquery(selector).serializeArray()序列化后的值转为name:value的形式。</br>
 * 将格式为：
 * <code> 
 * [
 * 	  {name: 'firstname', value: 'Hello'},
 *    {name: 'lastname', value: 'World'}
 * ] 
 * </code>
 * 转成
 * <code>
 * 	{"firstname":"Hello","lastname":"World"}
 * </code>
 * @param o jquery(selector).serializeArray()序列化后的JSON对象  
 * @returns json对象
 * @see json.js
 * @author hyy   2014-09-16 
 */
function convertArray(o) { 
	var v = {};
	for ( var i in o) {
		if (typeof (v[o[i].name]) == 'undefined')
			v[o[i].name] = o[i].value;
		else
			v[o[i].name] += "," + o[i].value;
	}
	return v;
}


function isArray(value) {
	return value && typeof value === 'object'
			&& typeof value.length == 'number'
			&& typeof value.splice === 'function'
			&& !(value.propertyIsEnumerable('length'));
}
