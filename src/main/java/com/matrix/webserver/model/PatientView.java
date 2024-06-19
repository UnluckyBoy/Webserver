package com.matrix.webserver.model;

import java.io.Serializable;

/**
 * @ClassName PatientView
 * @Author Create By matrix
 * @Date 2024-06-19 13:43
 * 近2月内注册信息bean
 */
public class PatientView implements Serializable {
    private String patient_name;
    private String patient_idCard;
    private String patient_gender;
    private String patient_birth;
    private String patient_age;
    private String patient_occupation;
    private String patient_nation;
    private String create_time;
    private String patient_phone;
    private String patient_homeAddress;
    private String patient_maritalStatus;
    private String poverty_sign;
    private String patient_emergencyContact;
    private String patient_relationship;
    private String guardian_phone;

    public String getPatient_name() {
        return patient_name;
    }

    public void setPatient_name(String patient_name) {
        this.patient_name = patient_name;
    }

    public String getPatient_idCard() {
        return patient_idCard;
    }

    public void setPatient_idCard(String patient_idCard) {
        this.patient_idCard = patient_idCard;
    }

    public String getPatient_gender() {
        return patient_gender;
    }

    public void setPatient_gender(String patient_gender) {
        this.patient_gender = patient_gender;
    }

    public String getPatient_birth() {
        return patient_birth;
    }

    public void setPatient_birth(String patient_birth) {
        this.patient_birth = patient_birth;
    }

    public String getPatient_age() {
        return patient_age;
    }

    public void setPatient_age(String patient_age) {
        this.patient_age = patient_age;
    }

    public String getPatient_occupation() {
        return patient_occupation;
    }

    public void setPatient_occupation(String patient_occupation) {
        this.patient_occupation = patient_occupation;
    }

    public String getPatient_nation() {
        return patient_nation;
    }

    public void setPatient_nation(String patient_nation) {
        this.patient_nation = patient_nation;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }

    public String getPatient_phone() {
        return patient_phone;
    }

    public void setPatient_phone(String patient_phone) {
        this.patient_phone = patient_phone;
    }

    public String getPatient_homeAddress() {
        return patient_homeAddress;
    }

    public void setPatient_homeAddress(String patient_homeAddress) {
        this.patient_homeAddress = patient_homeAddress;
    }

    public String getPatient_maritalStatus() {
        return patient_maritalStatus;
    }

    public void setPatient_maritalStatus(String patient_maritalStatus) {
        this.patient_maritalStatus = patient_maritalStatus;
    }

    public String getPoverty_sign() {
        return poverty_sign;
    }

    public void setPoverty_sign(String poverty_sign) {
        this.poverty_sign = poverty_sign;
    }

    public String getPatient_emergencyContact() {
        return patient_emergencyContact;
    }

    public void setPatient_emergencyContact(String patient_emergencyContact) {
        this.patient_emergencyContact = patient_emergencyContact;
    }

    public String getPatient_relationship() {
        return patient_relationship;
    }

    public void setPatient_relationship(String patient_relationship) {
        this.patient_relationship = patient_relationship;
    }

    public String getGuardian_phone() {
        return guardian_phone;
    }

    public void setGuardian_phone(String guardian_phone) {
        this.guardian_phone = guardian_phone;
    }
}
