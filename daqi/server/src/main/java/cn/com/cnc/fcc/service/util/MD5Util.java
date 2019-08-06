package cn.com.cnc.fcc.service.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * md5加密工具类
 * @author djm
 * @version v1.0.0
 */
public class MD5Util {

    /**
     * MD5加密算法
     * @param str   需要转化为MD5码的字符串
     * @return  返回一个32位16进制的字符串
     */
    public static String toMd5(String plainText) {
    	String re_md5 = new String();
    	Logger log = LoggerFactory.getLogger(MD5Util.class);
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(plainText.getBytes());
            byte b[] = md.digest();
 
            int i;
 
            StringBuffer buf = new StringBuffer("");
            for (int offset = 0; offset < b.length; offset++) {
                i = b[offset];
                if (i < 0)
                    i += 256;
                if (i < 16)
                    buf.append("0");
                buf.append(Integer.toHexString(i));
            }
 
            re_md5 = buf.toString();
 
        } catch (NoSuchAlgorithmException e) {
            log.info(e.getMessage());
        }
        return re_md5;
    }
    
    /**
     * MD5
     *
     * @param data
     * @return MD5
     */
    public static String MD5(String data) throws Exception {
        java.security.MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] array = md.digest(data.getBytes("UTF-8"));
        StringBuilder sb = new StringBuilder();
        for (byte item : array) {
            sb.append(Integer.toHexString((item & 0xFF) | 0x100).substring(1, 3));
        }
        return sb.toString().toUpperCase();
    }
}
/**
 * 思路过程：
 * 1、str.getBytes()：将字符串转化为字节数组。字符串中每个字符转换为对应的ASCII值作为字节数组中的一个元素
 * 2、将字节数组通过固定算法转换为16个元素的有符号哈希值字节数组
 * 3、将哈希字节数组的每个元素通过0xff与运算转换为两位无符号16进制的字符串
 * 4、将不足两位的无符号16进制的字符串前面加0
 * 5、通过StringBuffer.append()函数将16个长度为2的无符号进制字符串合并为一个32位String类型的MD5码
 */