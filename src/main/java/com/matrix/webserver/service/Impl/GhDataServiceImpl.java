package com.matrix.webserver.service.Impl;

import com.matrix.webserver.model.CurrentDayGhInfo;
import com.matrix.webserver.model.mapper.GhDataMapper;
import com.matrix.webserver.service.GhDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @ClassName GhDataServiceImpl
 * @Author Create By matrix
 * @Date 2024/5/10 0010 20:41
 */
@Service("GhDataService")
public class GhDataServiceImpl implements GhDataService {
    @Autowired
    private GhDataMapper ghDataMapper;

    @Override
    public int get_gh_count() {
        return ghDataMapper.get_gh_count();
    }

    @Override
    public boolean gh_add(Map<String, Object> map) {
        return ghDataMapper.gh_add(map);
    }

    @Override
    public List<CurrentDayGhInfo> get_current_day_gh() {
        return ghDataMapper.get_current_day_gh();
    }
}
