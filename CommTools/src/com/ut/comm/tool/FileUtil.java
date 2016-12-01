package com.ut.comm.tool;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.Properties;
import java.util.Random;

import javax.imageio.ImageIO;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class FileUtil {

	public static String newFileName = "";
	private static Log LOGGER = LogFactory.getLog(FileUtil.class);

	private static String WEB_ROOT = null;

	static {
		if (WEB_ROOT == null || "".equals(WEB_ROOT)) {
			java.net.URL url = FileUtil.class.getClassLoader().getResource("/");
			if (url != null) {
				WEB_ROOT = url.getFile().replaceAll("%20", " ");
			}
			if (WEB_ROOT != null && !"".equals(WEB_ROOT)) {

				if (WEB_ROOT.indexOf("/WEB-INF") >= 0) {
					WEB_ROOT = WEB_ROOT.substring(0,
							WEB_ROOT.indexOf("/WEB-INF"));
				} else if (WEB_ROOT.indexOf("\\WEB-INF") >= 0) {
					WEB_ROOT = WEB_ROOT.substring(0,
							WEB_ROOT.indexOf("\\WEB-INF"));
				}

			}
		}
	}

	/**
	 * 获取文件的WEBINFO路 径
	 * 
	 * @param filePath
	 * @return
	 */
	public static String getRootPath() {
		return WEB_ROOT;
	}

	/**
	 * 获取文件的WEBINFO路 径
	 * 
	 * @param filePath
	 * @return
	 */
	public static String getWebInfPath() {
		return WEB_ROOT + java.io.File.separator + "WEB-INF";
	}

	/**
	 * 返回上传的结果，成功与否
	 * 
	 * @param uploadFileName
	 * @param savePath
	 * @param uploadFile
	 * @return
	 */
	public static boolean upload(String uploadFileName, String savePath,
			File uploadFile) {
		boolean flag = false;
		try {
			newFileName = uploadForName(uploadFileName, savePath, uploadFile);
			flag = true;
		} catch (IOException e) {
			flag = false;
			e.printStackTrace();
		}
		return flag;
	}

	/**
	 * 上传文件并返回上传后的文件名
	 * 
	 * @param uploadFileName
	 *            被上传的文件名称
	 * @param savePath
	 *            文件的保存路径
	 * @param uploadFile
	 *            被上传的文件
	 * @return 成功与否
	 * @throws IOException
	 */
	public static String uploadForName(String uploadFileName, String savePath,
			File uploadFile) throws IOException {
		String newFileName = checkFileName(uploadFileName, savePath);
		FileOutputStream fos = null;
		FileInputStream fis = null;
		try {
			fos = new FileOutputStream(savePath + newFileName);
			fis = new FileInputStream(uploadFile);
			byte[] buffer = new byte[1024];
			int len = 0;
			while ((len = fis.read(buffer)) > 0) {
				fos.write(buffer, 0, len);
			}
		} catch (FileNotFoundException e) {
			throw e;
		} catch (IOException e) {
			throw e;
		} finally {
			try {
				if (fos != null) {
					fos.close();
				}
				if (fis != null) {
					fis.close();
				}
			} catch (IOException e) {
				throw e;
			}
		}
		return newFileName;
	}

	public static String saveFile(String savePath, String uploadFileName,
			byte[] bytes) throws IOException {
		File destDir = new File(savePath);

		if (!destDir.isDirectory()) {
			mkDirectory(savePath);
		}

		String newFileName = checkFileName(uploadFileName, savePath);
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(new File(savePath, newFileName));
			fos.write(bytes);
			fos.flush();
		} catch (FileNotFoundException e) {
			throw e;
		} catch (IOException e) {
			throw e;
		} finally {
			try {
				if (fos != null)
					fos.close();
			} catch (IOException e) {
				throw e;
			}
		}
		return newFileName;
	}

	/**
	 * 判断文件名是否已经存在，如果存在则在后面家(n)的形式返回新的文件名，否则返回原始文件名 例如：已经存在文件名 log4j.htm
	 * 则返回log4j(1).htm
	 * 
	 * @param fileName
	 *            文件名
	 * @param dir
	 *            判断的文件路径
	 * @return 判断后的文件名
	 */
	public static String checkFileName(String fileName, String dir) {
		boolean isDirectory = new File(dir + fileName).isDirectory();
		if (FileUtil.isFileExist(fileName, dir)) {
			int index = fileName.lastIndexOf(".");
			StringBuffer newFileName = new StringBuffer();
			String name = isDirectory ? fileName : fileName.substring(0, index);
			String extendName = isDirectory ? "" : fileName.substring(index);
			int nameNum = 1;
			while (true) {
				newFileName.append(name).append("(").append(nameNum)
						.append(")");
				if (!isDirectory) {
					newFileName.append(extendName);
				}
				if (FileUtil.isFileExist(newFileName.toString(), dir)) {
					nameNum++;
					newFileName = new StringBuffer();
					continue;
				}
				return newFileName.toString();
			}
		}
		return fileName;
	}

	/**
	 * 判断文件是否存在
	 * 
	 * @param fileName
	 * @param dir
	 * @return
	 */
	public static boolean isFileExist(String fileName, String dir) {
		File files = new File(dir + fileName);
		return (files.exists()) ? true : false;
	}

	/**
	 * 判断文件类型是否是合法的,就是判断allowTypes中是否包含contentType
	 * 
	 * @param contentType
	 *            文件类型
	 * @param allowTypes
	 *            文件类型列表
	 * @return 是否合法
	 */
	public static boolean isValid(String contentType, String[] allowTypes) {
		if (null == contentType || "".equals(contentType)) {
			return false;
		}
		for (String type : allowTypes) {
			if (contentType.equals(type)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 获得随机文件名,保证在同一个文件夹下不同名
	 * 
	 * @param fileName
	 * @param dir
	 * @return
	 */
	public static String getRandomName(String fileName, String dir) {
		String[] split = fileName.split("\\.");// 将文件名已.的形式拆分
		String extendFile = "." + split[split.length - 1].toLowerCase(); // 获文件的有效后缀

		Random random = new Random();
		int add = random.nextInt(1000000); // 产生随机数10000以内
		String ret = add + extendFile;
		while (isFileExist(ret, dir)) {
			add = random.nextInt(1000000);
			ret = fileName + add + extendFile;
		}
		return ret;
	}

	/**
	 * 根据路径创建一系列的目录
	 * 
	 * @param path
	 */
	public static boolean mkDirectory(String path) {
		File file = null;
		try {
			file = new File(path);
			if (!file.exists()) {
				return file.mkdirs();
			}
		} catch (RuntimeException e) {
			e.printStackTrace();
		} finally {
			file = null;
		}
		return false;
	}

	public static String readText(String url) {
		File file = new File(url);
		InputStreamReader inputStream = null;
		BufferedReader reader = null;
		String fileContent = "";
		try {
			inputStream = new InputStreamReader(new FileInputStream(file),
					"UTF-8");
			reader = new BufferedReader(inputStream);
			String line = "";
			while ((line = reader.readLine()) != null) {
				fileContent += line;
			}
			return fileContent;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				inputStream.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				reader.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			inputStream = null;
			reader = null;
		}
		return "";
	}
	
	public static byte[] readBytes(String url,String format) {
		File file = new File(url);
		BufferedImage bi = null;
		ByteArrayOutputStream baos = null;
		String result = "";
		byte [] bytes = null;
		try {
			bi = ImageIO.read(file);
			baos = new ByteArrayOutputStream();
			ImageIO.write(bi, format==null?"jpg":format, baos);
			bytes = baos.toByteArray();
			
		} catch (IOException e) {
			// TODO: handle exception
			e.printStackTrace();
		}finally {
			try {
				if( baos != null){
					baos.close();
					baos = null;
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
			baos = null;
			bi = null;
		}
		
		
		return bytes;
	}

	public static boolean writeFile(String filePathAndName, String fileContent,
			String charset) {
		OutputStreamWriter outWriter = null;
		BufferedWriter writer = null;
		try {
			File f = new File(filePathAndName);
			if (!f.exists()) {
				f.createNewFile();
			}
			outWriter = new OutputStreamWriter(new FileOutputStream(f), charset);
			writer = new BufferedWriter(outWriter);
			writer.write(fileContent);
			writer.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (writer != null) {
				try {
					writer.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (outWriter != null) {
				try {
					outWriter.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return false;
	}

	public static boolean writeText(String url, String content) {

		boolean flag = false;
		File file = new File(url);
		if (!file.exists())
			file.mkdirs();

		try {
			FileWriter fw = new FileWriter(url);
			fw.write(content);
			flag = true;
			if (fw != null)
				fw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	public static Properties loadProperties(String file) {
		Properties prop = new Properties();
		try {
			FileInputStream fis = new FileInputStream(file);
			prop.load(fis);
			fis.close();
			return prop;
		} catch (IOException ex) {
			LOGGER.error(ex);
		}
		return null;
	}

	public static boolean writeFile(String fileName, String fileContent) {
		return writeFile(fileName, fileContent, "UTF-8");
	}

	public static String readFileContent(String reportFile) {
		return readText(reportFile);
	}

	public static void readFileContent(String reportFile,
			OutputStream servletOutputStream) throws FileNotFoundException,
			IOException {
		File file = new File(reportFile);
		BufferedInputStream inputStream = null;
		byte[] buffer = new byte[4096];
		try {
			inputStream = new BufferedInputStream(new FileInputStream(file));
			int curLen = inputStream.read(buffer);
			while (curLen > 0) {
				servletOutputStream.write(buffer, 0, curLen);
				servletOutputStream.flush();
				curLen = inputStream.read(buffer);
			}
		} finally {
			inputStream.close();
			inputStream = null;
			file = null;
			buffer = null;
		}
	}

	public static byte[] getBytesFromFile(String reportFile) {
		String fileContent = readFileContent(reportFile);
		return fileContent.getBytes();
	}
	public static byte[] getBytesFromByte(String reportFile,String format) {
//		byte [] bytes = readBytes(reportFile,format);
		return readBytes(reportFile,format);
	}
	
	public static synchronized boolean lockFile(File file){
		boolean a = false;
		if(file.canWrite()){
			a = file.setWritable(false,false);
		}
		return a;
	}
	public static synchronized boolean unlockFile(File file){
		boolean a = false;
		if(file.canWrite()){
			a = file.setWritable(true,false);
		}
		return a;
	}
}
