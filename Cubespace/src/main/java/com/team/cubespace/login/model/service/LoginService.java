package com.team.cubespace.login.model.service;

import java.util.List;
import java.util.Map;

import com.team.cubespace.member.model.vo.Member;

public interface LoginService {

	/** 로그인
	 * @param paramMap
	 * @return loginMember
	 * @throws Exception 
	 */
	Member login(Member inputMember);
	
	/** 회원가입 입력 정보 제출서비스
	 * @param inputMember
	 * @return
	 * @throws Exception 
	 */
	int signUp(Member inputMember) throws Exception;

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
	 * @throws Exception 
	 */
	Member kakaoLogin(Member inputMember) throws Exception;
	
	/** 내 회원 정보 수정
	 * @param inputMember
	 * @return
	 */
	int updateInfo(Member inputMember);
	
	/** 회원 탈퇴
	 * @param memberNo
	 * @return result
	 */
	int secessionSelect(int memberNo, Member inputMember);

	/** 회원 비밀번호 변경
	 * @param paramMap
	 * @return
	 */
	int changePw(Member inputMember);

	/** 차단기한이 지난 회원의 정보 리스트
	 * @return memberBlockList
	 */
	List<Member> selectMemberBlockList();

	/** 차단기한이 지난 회원의 정보 삭제
	 * @return
	 */
	int deleteMemberBlock();

}
