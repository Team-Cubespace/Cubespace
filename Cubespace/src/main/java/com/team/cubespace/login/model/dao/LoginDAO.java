package com.team.cubespace.login.model.dao;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.member.model.vo.Member;

@Repository
public class LoginDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 로그인 DAO
	 * @param memberEmail
	 * @return loginMember
	 */
	public Member login(String memberEmail) {
		return sqlSession.selectOne("loginMapper.login", memberEmail);
	}
	
	/** 회원가입 입력 정보 제출 DAO
	 * @param inputMember
	 * @return
	 */
	public int signUp(Member inputMember) {
		return sqlSession.insert("loginMapper.signUp", inputMember);
	}

	/** 회원 ID/PW 찾기 회원조회
	 * @param paramMap
	 * @return 
	 */
	public String infoFindSelect(Map<String, Object> paramMap) {
		System.out.println(paramMap);
		return sqlSession.selectOne("loginMapper.infoFindSelect",paramMap);
	}

	/** 임시 비밀번호 생성 및 저장
	 * @param encPw
	 * @param inputEmail 
	 * @return
	 */
	public int findEmailPw(String encPw, String result) {
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("encPw", encPw);
		map.put("result", result);
		
		
		
		return sqlSession.update("loginMapper.findEmailPw",map);
	}
	

	/** 이메일 중복 검사
	 * @param memberEmail
	 * @return result
	 */
	public int emailDupcheck(String memberEmail) {
		return sqlSession.selectOne("loginMapper.emailDupCheck", memberEmail);
	}


	/** 닉네임 중복 검사
	 * @param memberNickname
	 * @return
	 */
	public int nicknameDupCheck(String memberNickname) {
		return sqlSession.selectOne("loginMapper.nicknameDupCheck", memberNickname);
	}


	/** 전화번호 중복 검사
	 * @param memberTel
	 * @return
	 */
	public int telDupCheck(String memberTel) {
		return sqlSession.selectOne("loginMapper.telDupCheck",memberTel);
	}

	/** 카카오 회원가입
	 * @param paramMap
	 * @return
	 */
	public int kakaoSignUp(Member inputMember) {
		
		return sqlSession.insert("loginMapper.kakaoSignUp", inputMember);
	}
	
	/** 내 회원 정보 수정 (비밀번호 포함)
	 * @param inputMember
	 * @return
	 */
	public int updateInfoPw(Member inputMember) {
		return sqlSession.update("myPageMapper.updateInfoPw",inputMember);
	}

	/** 내 회원 정보 수정 (비밀번호 제외)
	 * @param inputMember
	 * @return
	 */
	public int updateInfoNoPw(Member inputMember) {
		return sqlSession.update("myPageMapper.updateInfoNoPw",inputMember);
	}
	
	/** 마이페이지 자기소개 수정 
	 * @param member
	 * @return
	 */
	public int changeIntroduce(Member member) {
		return sqlSession.update("myPageMapper.changeIntroduce",member);
	}
	
	/** 회원탈퇴 회원 조회
	 * @param memberNo
	 * @return 
	 */
	public Member secessionSelect(int memberNo) {
		return sqlSession.selectOne("memberMapper.secessionSelect", memberNo);
	}

	/** 회원 탈퇴
	 * @param memberNo
	 * @return result
	 */
	public int secession(int memberNo) {
		return sqlSession.update("myPageMapper.secession",memberNo);
	}
	
	/** 회원 탈퇴
	 * @param memberNo
	 * @return
	 */
	public int secessionDelete(int memberNo) {
		return sqlSession.update("memberMapper.secessionDelete",memberNo);
	}
}
