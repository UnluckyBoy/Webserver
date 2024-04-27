package com.matrix.webserver.model.mapper;

import com.matrix.webserver.model.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

/**
 * @ClassName UserMapper
 * @Author Create By matrix
 * @Date 2024/4/27 0027 15:59
 * Mapper接口
 */

@Service
@Mapper //mybatis的mapper类
@Repository //将mapper交由spring容器管理
public interface UserMapper {
    UserInfo accountQuery(String account);
}
