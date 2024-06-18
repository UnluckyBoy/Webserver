package com.matrix.webserver.service;

import com.matrix.webserver.model.CurrentDayGhInfo;
import org.springframework.stereotype.Service;

import java.util.List;
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
    List<CurrentDayGhInfo> get_current_day_gh();
    boolean cancel_regis(Map<String,Object> map);
}
