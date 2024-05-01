package com.matrix.webserver.service;

import com.matrix.webserver.model.AuthorityInfo;
import com.matrix.webserver.model.UserInfo;
import com.matrix.webserver.model.mapper.AuthorityMapper;
import com.matrix.webserver.model.mapper.UserMapper;
import com.matrix.webserver.tools.ServerEncode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName UserService
 * @Author Create By matrix
 * @Date 2024/4/27 0027 14:58
 * 用户服务逻辑
 */
@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    UserMapper userMapper;
    @Autowired
    AuthorityMapper authorityMapper;

    /**
     * 根据用户名查询用户对象
     *
     * @param username
     * @return
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserInfo userInfo=userMapper.accountQuery(username);
        if(userInfo==null){
            //用户不存在
            throw new UsernameNotFoundException("账号不存在");
        }
        List<String> authorities=new ArrayList<>();/*返回权限信息*/
        List<AuthorityInfo> temp=authorityMapper.queryAuthority(username);
        for(int i=0;i<temp.size();i++){
            authorities.add(temp.get(i).getAuthority_code());
        }
        userInfo.setAuthorities(authorities);
        System.out.println("UserDetails查询结果:"+userInfo.toString());
        /*UserMapper实现了UserDetails接口,直接返回即可*/
        return userInfo;
    }

    /**
     * 注册
     * @param username
     * @param rawPassword
     */
    public void createUser(String username, String rawPassword) {
        String encodedPassword = ServerEncode.encodePassword(rawPassword);/*调用加密*/
        // 将username和encodedPassword存储到数据库...
    }
}
