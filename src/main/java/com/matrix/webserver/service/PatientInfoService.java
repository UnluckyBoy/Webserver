package com.matrix.webserver.service;

import com.matrix.webserver.model.PatientInfo;
import com.matrix.webserver.model.PatientView;
import com.matrix.webserver.model.mapper.PatientInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @ClassName PatientInfoService
 * @Author Create By matrix
 * @Date 2024/5/6 0006 23:06
 */
@Service
public interface PatientInfoService {
    PatientInfo queryPatient(String keyParam);
    List<PatientView> query_near_two_month_patients();//近2月内注册信息
    boolean regis_patient(Map<String,Object> map);
}
