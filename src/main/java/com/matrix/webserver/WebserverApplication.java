package com.matrix.webserver;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@MapperScan("com.matrix.webserver.model.mapper")
public class WebserverApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebserverApplication.class, args);
    }

}
