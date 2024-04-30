package com.matrix.webserver.service.Impl;

import com.matrix.webserver.model.AuthorityInfo;
import com.matrix.webserver.model.mapper.AuthorityMapper;
import com.matrix.webserver.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName AuthorityImpl
 * @Author Create By matrix
 * @Date 2024/4/30 0030 23:48
 */
@Service("AuthorityService")
public class AuthorityImpl implements AuthorityService {
    @Autowired
    AuthorityMapper authorityMapper;

    @Override
    public List<AuthorityInfo> queryAuthority(String account) {
        return authorityMapper.queryAuthority(account);
    }
}
