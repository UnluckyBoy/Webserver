package com.matrix.webserver.model;

import lombok.Data;

/**
 * @ClassName AuthorityInfo
 * @Author Create By matrix
 * @Date 2024/4/30 0030 23:38
 */
@Data
public class AuthorityInfo{
    private int authority_id;
    private String authority_code;
    private String authority_name;

    public int getAuthority_id() {
        return authority_id;
    }

    public String getAuthority_code() {
        return authority_code;
    }

    public String getAuthority_name() {
        return authority_name;
    }
}
