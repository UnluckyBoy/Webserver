package com.matrix.webserver.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.system.ApplicationHome;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

import java.io.File;

/**
 * @ClassName CORSConfig
 * @Author Create By matrix
 * @Date 2024/3/22 0022 2:29
 */
@Configuration
public class CORSConfig extends WebMvcConfigurationSupport {

    @Value("${back-resource.dir}")
    private String backResourceDir;

    /**
     * 解决跨域问题配置类Cors
     * @param registry
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("*")
                .allowedOrigins("*")
                .allowedHeaders("*");
        super.addCorsMappings(registry);
    }

    /**
     * 用于读取图片
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //String backResourceDir=System.getProperty("user.dir")+"/BackResource/";

        /*获取jar包所在目录--弃用*/
//        ApplicationHome h = new ApplicationHome(getClass());
//        File jarF = h.getSource();
//        String dirPath = jarF.getParentFile().toString()+"/BackResource/";

        System.out.println(backResourceDir);
        //其中getImage表示图片资源访问的前缀。"file:E:/MatrixProject/BackResource/"是服务器文件真实的存储路径
        /**
         * "classpath:/static/","classpath:/templates/"
         */
        if (backResourceDir != null && !backResourceDir.isEmpty()) {
            backResourceDir = backResourceDir.endsWith(File.separator) ? backResourceDir : backResourceDir + File.separator;
            registry.addResourceHandler("/upload/**").addResourceLocations("file:" + backResourceDir);
        }
        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/","classpath:/templates/");
    }
}
