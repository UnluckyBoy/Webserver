package com.matrix.webserver.model;

import lombok.Data;

/**
 * @ClassName CurrentDayGhInfo
 * @Author Create By matrix
 * @Date 2024/6/3 0003 23:00
 * 当日挂号数据查询
 */
@Data
public class CurrentDayGhInfo {
    private String gh_number;
    private String expense_type;
    private String gh_type;
    private String patient_id;
    private String patient_name;
    private String gh_createTime;
    private String gh_department;
    private String cancel_sign;
    private String gh_fee_sign;
    private String receive_sign;

    public String getGh_number() {
        return gh_number;
    }

    public void setGh_number(String gh_number) {
        this.gh_number = gh_number;
    }

    public String getExpense_type() {
        return expense_type;
    }

    public void setExpense_type(String expense_type) {
        this.expense_type = expense_type;
    }

    public String getGh_type() {
        return gh_type;
    }

    public void setGh_type(String gh_type) {
        this.gh_type = gh_type;
    }

    public String getPatient_id() {
        return patient_id;
    }

    public void setPatient_id(String patient_id) {
        this.patient_id = patient_id;
    }

    public String getPatient_name() {
        return patient_name;
    }

    public void setPatient_name(String patient_name) {
        this.patient_name = patient_name;
    }

    public String getGh_createTime() {
        return gh_createTime;
    }

    public void setGh_createTime(String gh_createTime) {
        this.gh_createTime = gh_createTime;
    }

    public String getGh_department() {
        return gh_department;
    }

    public void setGh_department(String gh_department) {
        this.gh_department = gh_department;
    }

    public String getCancel_sign() {
        return cancel_sign;
    }

    public void setCancel_sign(String cancel_sign) {
        this.cancel_sign = cancel_sign;
    }

    public String getGh_fee_sign() {
        return gh_fee_sign;
    }

    public void setGh_fee_sign(String gh_fee_sign) {
        this.gh_fee_sign = gh_fee_sign;
    }

    public String getReceive_sign() {
        return receive_sign;
    }

    public void setReceive_sign(String receive_sign) {
        this.receive_sign = receive_sign;
    }
}
