package com.ut.scf.dao.hibernate.support;

import javassist.ClassClassPath;
import javassist.ClassPool;
import javassist.CtClass;
import javassist.bytecode.AnnotationsAttribute;
import javassist.bytecode.ClassFile;
import javassist.bytecode.ConstPool;
import javassist.bytecode.annotation.Annotation;
import javassist.bytecode.annotation.StringMemberValue;

import com.ut.comm.tool.string.StringUtil;

public class ClassUtils {
	private ClassUtils() {
	}

	/**
	 * 运行时动态修改注解值
	 * 
	 * @param Class
	 *
	 * @param entityClassName
	 *            待映射的实体全限定类名
	 * @param annotation
	 *            需要修改的注解全限定类名
	 * @param annotationAttrName
	 *            注解属性名称
	 * @param annotationVal
	 *            注解属性值
	 * 
	 * @return 映射后的类对象
	 */
	public static Class<?> updateAnnotationForClass(String entityClassName, String annotationClassName,
			String annotationAttrName, String annotationVal) throws Exception {
		Class<?> c = null;
		if (StringUtil.isTrimEmpty(entityClassName) || StringUtil.isTrimEmpty(annotationClassName)
				|| StringUtil.isTrimEmpty(annotationAttrName) || StringUtil.isTrimEmpty(annotationVal)) {
			return c;
		}
		try {
			ClassPool classPool = ClassPool.getDefault();
			classPool.appendClassPath(new ClassClassPath(ClassUtils.class));
			CtClass clazz = classPool.get(entityClassName);
			clazz.defrost();
			ClassFile classFile = clazz.getClassFile();

			ConstPool constPool = classFile.getConstPool();

			// 获取运行时注解属性
			AnnotationsAttribute attribute = (AnnotationsAttribute) classFile
					.getAttribute(AnnotationsAttribute.visibleTag);
			Annotation[] ans = attribute.getAnnotations();
			for (int i = 0; i < ans.length; i++) {
				Annotation an = ans[i];
				String typeName = an.getTypeName();
				if (annotationClassName.equalsIgnoreCase(typeName)) {
					an.addMemberValue(annotationAttrName, new StringMemberValue(annotationVal, constPool));
				}
			}
			attribute.setAnnotations(ans);
			classFile.addAttribute(attribute);
			classFile.setVersionToJava5();
			// claz z.writeFile();

			AnnotationClassLoader loader = new AnnotationClassLoader(ClassUtils.class.getClassLoader());
			// 加载器加载class文件，一个加载器只会加载一次路径名称相同的calss
			// 这里因为只改了注解，类路径是没有改变的。
			c = clazz.toClass(loader, null);
			//不生成具体Class文件了，因为Spring缓存了Class实例
//			clazz.writeFile();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return c;
	}
}
