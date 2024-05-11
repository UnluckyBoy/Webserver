package com.matrix.webserver.tools;

import com.google.gson.Gson;
import com.matrix.webserver.tools.WebServerResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.print.*;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * @ClassName ToolController
 * @Author Create By matrix
 * @Date 2024/5/11 0011 13:12
 */
public class PrintTool {
    //@Value("${back-resource.dir}")
    private static String printDir="E:/MatrixProject/Webserver/BackResource/";

    public static String doPrintHandle() throws IOException {
        // 查询默认的打印服务
        PrintService defaultPrintService = PrintServiceLookup.lookupDefaultPrintService();
        // 列出所有可用的打印服务
        PrintService[] printServices = PrintServiceLookup.lookupPrintServices(null, null);
        if (printServices.length > 0) {
            System.out.println("可用的打印机列表:");
            for (PrintService printService : printServices) {
                System.out.println(printService.getName());
            }
        } else {
            System.out.println("没有发现打印机");
            return "没有发现打印机";
        }
        // 使用默认打印机打印文件
        FileInputStream fis = null; // 替换为你要打印的文件路径
        try {
            fis = new FileInputStream(printDir+"/localconfig/example.txt");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return "打印文件未找到";
        }
        DocPrintJob docPrintJob = defaultPrintService.createPrintJob();
        DocFlavor flavor = DocFlavor.INPUT_STREAM.AUTOSENSE;
        Doc doc = new SimpleDoc(fis, flavor, null);
        try {
            docPrintJob.print(doc, null);
            System.out.println("打印完毕");
            return "success";
        } catch (PrintException e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }
}
