package com.matrix.webserver.service;

import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * @ClassName GhDataService
 * @Author Create By matrix
 * @Date 2024/5/10 0010 20:41
 */
@Service
public interface GhDataService {
    int get_gh_count();
    boolean gh_add(Map<String,Object> map);
}
