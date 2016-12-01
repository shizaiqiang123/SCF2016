package com.ut.scf.web.servlet;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;
import com.ut.scf.web.session.SessionManager;

public class ValidCodeServlet extends HttpServlet
{
    
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
     * The doGet method of the servlet. <br>
     *
     * This method is called when a form has its tag value method equals to get.
     * 
     * @param request the request send by the client to the server
     * @param response the response send by the server to the client
     * @throws ServletException if an error occurred
     * @throws IOException if an error occurred
     */
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        doPost(request, response);
    }
    
    /**
     * The doPost method of the servlet. <br>
     *
     * This method is called when a form has its tag value method equals to post.
     * 
     * @param request the request send by the client to the server
     * @param response the response send by the server to the client
     * @throws ServletException if an error occurred
     * @throws IOException if an error occurred
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
    	int width = 92;
    	int height = 48;    	
    	
        BufferedImage img=new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);        
        Graphics g=img.getGraphics();
        g.setColor(Color.WHITE);
        g.fillRect(0,0,width,height);
        String code="";
        Random rnd=new Random();
        for(int i=0;i<4;i++){
            int n=rnd.nextInt(62);
            if(n<10)
                code+=n;
            else if(n<36)
                code+=(char)(n-10+'A');
            else
                code+=(char)(n-36+'a');
        }        
        SessionManager.setSessionAttribute(request, "reCode",code);
        g.setColor(Color.black);
        g.setFont(new Font("Verdana",Font.PLAIN,32));
        for (int i = 0; i < 4; i++)
        {
            g.drawString(code.substring(i,i+1),4+i*22,38);    
        }
        Graphics2D g2d=(Graphics2D)g;
        g2d.rotate(40); //旋转弧度
        g2d.setStroke(new BasicStroke(
            rnd.nextInt(4)+rnd.nextFloat()));
        /*for (int i = 0; i < 10; i++)
        {  
            g.setColor(Color.white);
            g.drawLine(rnd.nextInt(width), rnd.nextInt(height), rnd.nextInt(width), rnd.nextInt(height));           
        }*/
        
        response.setContentType("image/jpeg");
        OutputStream out=response.getOutputStream();
        JPEGImageEncoder encoder=JPEGCodec.createJPEGEncoder(out);
        encoder.encode(img);
        out.close();
    }    
}
