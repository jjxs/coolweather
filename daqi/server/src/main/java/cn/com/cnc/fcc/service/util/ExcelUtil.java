package cn.com.cnc.fcc.service.util;

import java.io.InputStream;

import jxl.Sheet;
import jxl.Workbook;


import java.lang.reflect.Field;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;


/**
 * Excel文件生成工具类
 *
 * @author
 */
public class ExcelUtil {
    /**
     * 获取excel中的所有数据
     *
     * @param <T>
     * @return
     * @throws @throws Exception
     * @primaryColumns 总列数
     */
    @SuppressWarnings("rawtypes")
    public static JSONArray getExcelAllData(InputStream info, Class dto, int primaryColumns) throws Exception {

        JSONArray data = new JSONArray();
        // 获取
        Workbook book = Workbook.getWorkbook(info);
        Sheet sheet = book.getSheet(0);
        Field[] fieldList = dto.getDeclaredFields();
        Integer cellNumber = sheet.getColumns();
        if (cellNumber != primaryColumns) {
            JSONObject errorInfo = new JSONObject();
            errorInfo.put("errorColumns", "longColumns");
            data.add(errorInfo);
            return data;
        }
        // 从第二行开始读取信息
        for (Integer i = 1; i < sheet.getRows(); i++) {
            JSONObject line = new JSONObject();
            // 遍历参数
            for (Integer j = 0; j < fieldList.length; j++) {
                line.put(fieldList[j].getName(), sheet.getCell(j, i).getContents());
            }
            data.add(line);
        }
        return data;
    }

    /**
     * 获取excel中的所有数据
     *
     * @return
     * @throws @throws Exception
     * @primaryColumns 总列数
     */
    @SuppressWarnings("rawtypes")
    public static JSONArray getExcelAllSheetAllData(InputStream info, Class dtoHeader, Class dtoBody, int primaryColumns, int colums) throws Exception {
        JSONArray sheetDatas = new JSONArray();
        JSONArray data = new JSONArray();
        // 获取
        Workbook book = Workbook.getWorkbook(info);
        int sheetCount = book.getNumberOfSheets();
        Field[] fieldList = dtoHeader.getDeclaredFields();
        Field[] fieldList1 = dtoBody.getDeclaredFields();
        if (sheetCount > 0) {
            // 循环sheet页
            for (int i = 0; i < sheetCount; i++) {
                JSONObject sheetData = new JSONObject();
                Sheet sheet = book.getSheet(i);
                Integer cellNumber = sheet.getColumns();
                Integer cellNumber1 = sheet.getRow(2).length;
                if (cellNumber != primaryColumns) {
                    JSONObject errorInfo = new JSONObject();
                    errorInfo.put("errorColumns", "longColumns");
                    data.add(errorInfo);
                    return data;
                }
                if (cellNumber1 != colums) {
                    JSONObject errorInfo = new JSONObject();
                    errorInfo.put("errorColumns", "longColumns");
                    data.add(errorInfo);
                    return data;
                }
                // 从第二行开始读取信息
                for (Integer j = 3; j < sheet.getRows(); j++) {
                    JSONObject line = new JSONObject();
                    // 遍历参数
                    for (Integer k = 0; k < fieldList1.length; k++) {
                        line.put(fieldList1[k].getName(), sheet.getCell(k, j).getContents());
                    }
                    data.add(line);
                }
                JSONObject head = new JSONObject();
                // 遍历参数
                for (Integer k = 0; k < fieldList.length; k++) {
                    head.put(fieldList[k].getName(), sheet.getCell(k, 1).getContents());
                }
                sheetData.put("entry", head);
                sheetData.put("details", data);
                sheetDatas.add(sheetData);
            }
        }
        return sheetDatas;
    }
}
