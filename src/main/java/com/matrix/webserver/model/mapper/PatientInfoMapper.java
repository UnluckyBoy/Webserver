package com.matrix.webserver.model.mapper;

import com.matrix.webserver.model.PatientInfo;
import com.matrix.webserver.model.PatientView;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @ClassName PatientInfoMapper
 * @Author Create By matrix
 * @Date 2024/5/6 0006 22:52
 */
@Service
@Mapper
@Repository
public interface PatientInfoMapper {
    PatientInfo queryPatient(String keyParam);
    List<PatientView> query_near_two_month_patients();//近2月内注册信息
    boolean regis_patient(Map<String,Object> map);/*注册患者*/
    boolean update_PatientInfo(Map<String,Object> map);/*更新信息*/
}
