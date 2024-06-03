package com.matrix.webserver.model.mapper;

import com.matrix.webserver.model.CurrentDayGhInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @ClassName GhDataMapper
 * @Author Create By matrix
 * @Date 2024/5/10 0010 20:17
 */
@Service
@Mapper
@Repository
public interface GhDataMapper {
    int get_gh_count();//查询当日挂号数
    boolean gh_add(Map<String,Object> map);//挂号插入
    List<CurrentDayGhInfo> get_current_day_gh();//当日挂号查询
}
