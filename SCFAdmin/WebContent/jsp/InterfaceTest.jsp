<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<html>
<head>
<title>Mule Interface Test</title>
</head>
<body>

	<form method="POST" name="submitEcho" action="interface">
		<table>
			<tr>
				<td><label>测试类型</label></td>
				<td><input type="text" name="interfaceName" /></td>

			</tr>
			<tr>
				<td><label>消息内容</label></td>
				<td><input type="text" name="content" /></td>

			</tr>
			<tr>
				<td colspan="2" align="center"><input type="submit" name="Go"
					value="执行 " /></td>
			</tr>
		</table>
	</form>

	<p />
</body>

</html>
