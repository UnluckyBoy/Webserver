package com.matrix.webserver.model.mapper;

import com.matrix.webserver.model.AuthorityInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @ClassName AuthorityMapper
 * @Author Create By matrix
 * @Date 2024/4/30 0030 23:42
 */

@Service
@Mapper
@Repository
public interface AuthorityMapper {
    List<AuthorityInfo> queryAuthority(String account);
}
