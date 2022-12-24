package com.team.cubespace.email.model.service;

import java.util.Map;

public interface EmailService {
	
	String createAuthKey();
    
    String signUp(String email);

    
	/** 아이디 찾기 이메일 발송
	 * @param result
	 * @param paramMap
	 * @return
	 */
	String findEmailId(String result, Map<String, Object> paramMap);

	/** 비밀번호 찾기 이메일 발송
	 * @param result
	 * @param paramMap
	 */
	int findEmailPw(String result, Map<String, Object> paramMap);

}
