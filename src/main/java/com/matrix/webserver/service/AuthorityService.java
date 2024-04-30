package com.matrix.webserver.service;

import com.matrix.webserver.model.AuthorityInfo;
import com.matrix.webserver.model.mapper.AuthorityMapper;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName AuthorityService
 * @Author Create By matrix
 * @Date 2024/4/30 0030 23:45
 */
@Service
public interface AuthorityService {
    List<AuthorityInfo> queryAuthority(String account);
}
