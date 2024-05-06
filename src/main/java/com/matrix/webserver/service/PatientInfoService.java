package com.matrix.webserver.service;

import com.matrix.webserver.model.PatientInfo;
import com.matrix.webserver.model.mapper.PatientInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName PatientInfoService
 * @Author Create By matrix
 * @Date 2024/5/6 0006 23:06
 */
@Service
public interface PatientInfoService {
    PatientInfo queryPatient(String keyParam);
}
