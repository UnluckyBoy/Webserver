package com.matrix.webserver.model;

import lombok.Data;

/**
 * @ClassName PatientInfo
 * @Author Create By matrix
 * @Date 2024/5/6 0006 22:45
 */
@Data
public class PatientInfo {
    private String patient_id;
    private String patient_name;
    private String patient_gender;
    private String patient_idCard;
    private String patient_birth;
    private String create_time;
    private String patient_nationality;
    private String patient_nativePlace;
    private String patient_nation;
    private String patient_occupation;
    private String patient_maritalStatus;
    private String patient_phone;
    private String patient_age;
    private String poverty_sign;
    private String patient_emergencyContact;
    private String patient_relationship;
    private String patient_contactPhone;
    private String patient_homeAddress;
    private String patient_workAddress;
    private String nowAddress_province;
    private String nowAddress_town;
    private String nowAddress_prefecture;
    private String child_sign;
    private String guardian_name;
    private String guardian_idCard;
    private String guardian_phone;

    public String getPatient_id() {
        return patient_id;
    }

    public String getPatient_name() {
        return patient_name;
    }

    public String getPatient_gender() {
        return patient_gender;
    }

    public String getPatient_idCard() {
        return patient_idCard;
    }

    public String getPatient_birth() {
        return patient_birth;
    }

    public String getCreate_time() {
        return create_time;
    }

    public String getPatient_nationality() {
        return patient_nationality;
    }

    public String getPatient_nativePlace() {
        return patient_nativePlace;
    }

    public String getPatient_nation() {
        return patient_nation;
    }

    public String getPatient_occupation() {
        return patient_occupation;
    }

    public String getPatient_maritalStatus() {
        return patient_maritalStatus;
    }

    public String getPatient_phone() {
        return patient_phone;
    }

    public String getPatient_age() {
        return patient_age;
    }

    public String getPoverty_sign() {
        return poverty_sign;
    }

    public String getPatient_emergencyContact() {
        return patient_emergencyContact;
    }

    public String getPatient_relationship() {
        return patient_relationship;
    }

    public String getPatient_contactPhone() {
        return patient_contactPhone;
    }

    public String getPatient_homeAddress() {
        return patient_homeAddress;
    }

    public String getPatient_workAddress() {
        return patient_workAddress;
    }

    public String getNowAddress_province() {
        return nowAddress_province;
    }

    public String getNowAddress_town() {
        return nowAddress_town;
    }

    public String getNowAddress_prefecture() {
        return nowAddress_prefecture;
    }

    public String getChild_sign() {
        return child_sign;
    }

    public String getGuardian_name() {
        return guardian_name;
    }

    public String getGuardian_idCard() {
        return guardian_idCard;
    }

    public String getGuardian_phone() {
        return guardian_phone;
    }
}
