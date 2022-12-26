package com.team.cubespace.login.model.service;

import java.util.Map;

import com.team.cubespace.member.model.vo.Member;

public interface LoginService {

	/** 로그인
	 * @param inputMember
	 * @return loginMember
	 */
	Member login(Member inputMember);
	
	/** 회원가입 입력 정보 제출서비스
	 * @param inputMember
	 * @return
	 */
	int signUp(Member inputMember);

	/** 회원 ID/PW 찾기 회원조회
	 * @param paramMap
	 * @return
	 */
	String infoFindSelect(Map<String, Object> paramMap);

	/** 임시 비밀번호 생성 및 저장
	 * @param authKey
	 * @param inputEmail 
	 * @return
	 */
	int findEmailPw(String authKey, String result);
	
	
	/** 이메일 중복 검사
	 * @param memberEmail
	 * @return result
	 */
	int emailDupCheck(String memberEmail);

	/** 닉네임 중복 검사
	 * @param memberNickname
	 * @return result
	 */
	int nicknameDupCheck(String memberNickname);

	/** 전화번호 중복 검사
	 * @param memberTel
	 * @return result
	 */
	int telDupCheck(String memberTel);

	/** 카카오로그인
	 * @param paramMap
	 * @return loginMember
	 */
	Member kakaoLogin(Map<String, Object> paramMap);

}
