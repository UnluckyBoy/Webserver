package com.matrix.webserver.model.mapper;

import com.matrix.webserver.model.PatientInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

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
}
