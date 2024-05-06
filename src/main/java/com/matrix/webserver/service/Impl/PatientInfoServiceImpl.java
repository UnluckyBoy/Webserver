package com.matrix.webserver.service.Impl;

import com.matrix.webserver.model.PatientInfo;
import com.matrix.webserver.model.mapper.PatientInfoMapper;
import com.matrix.webserver.service.PatientInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName PatientInfoServiceImpl
 * @Author Create By matrix
 * @Date 2024/5/6 0006 23:07
 */
@Service("PatientInfoService")
public class PatientInfoServiceImpl implements PatientInfoService {
    @Autowired
    PatientInfoMapper patientInfoMapper;
    @Override
    public PatientInfo queryPatient(String keyParam) {
        return patientInfoMapper.queryPatient(keyParam);
    }
}
