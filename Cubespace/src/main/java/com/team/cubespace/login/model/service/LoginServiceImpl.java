package com.team.cubespace.login.model.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.cubespace.login.model.dao.LoginDAO;
import com.team.cubespace.member.model.vo.Member;

@Service
public class LoginServiceImpl implements LoginService{
	

	@Autowired
	private LoginDAO dao;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;

	/**
	 * 로그인 서비스
	 */
	@Override
	public Member login(Member inputMember) {
		
		Member loginMember = dao.login(inputMember.getMemberEmail());
		
		
		if(loginMember != null) {
			if(bcrypt.matches(inputMember.getMemberPw(), loginMember.getMemberPw())) {
				loginMember.setMemberPw(null);
			} else {
				loginMember = null;
			}
		}
		
		return loginMember;
	}
	
	
	/**
	 * 회원가입 입력 정보 제출 서비스
	 */
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int signUp(Member inputMember) {
		
		// 비밀번호 암호화
		String encPw = bcrypt.encode(inputMember.getMemberPw());
		inputMember.setMemberPw(encPw);
		
		int result = dao.signUp(inputMember);
		
		return result;
	}

	/**
	 * 회원 ID/PW 찾기 회원조회
	 */
	@Override
	public String infoFindSelect(Map<String, Object> paramMap) {
		return dao.infoFindSelect(paramMap);
	}

	/**
	 * 임시 비밀번호 생성 및 저장
	 */
	@Override
	public int findEmailPw(String authKey,String result) {
		
		String encPw = bcrypt.encode(authKey);
		
		return dao.findEmailPw(encPw,result);
	}
	
	
	// 이메일 중복 검사
	@Override
	public int emailDupCheck(String memberEmail) {
		return dao.emailDupcheck(memberEmail);
	}

	// 닉네임 중복 검사
	@Override
	public int nicknameDupCheck(String memberNickname) {
		return dao.nicknameDupCheck(memberNickname);
	}

	// 전화번호 중복 검사
	@Override
	public int telDupCheck(String memberTel) {
		return dao.telDupCheck(memberTel);
	}


	/**
	 * 카카오 로그인
	 */
	@Override
	public Member kakaoLogin(Map<String, Object> paramMap) {
		
		// paramMap의 email을 기존의 회원과 조회해서 
		// 있다면 -> 기존의 로그인메서드 호출
		// 없다면 -> 카카오 회원가입 진행(비밀번호 = 아이디랑 동일하게) 이후 return loginMember
		
		Member loginMember = dao.login((String)paramMap.get("email"));
		if(loginMember != null) {
			
			loginMember.setMemberPw(null);
			return loginMember;
			
		} else {
			
			paramMap.put("memberPw", bcrypt.encode((String) paramMap.get("email")));
			paramMap.put("newKakaoMember", 1); // 처음 카카오 회원가입시->추가정보 입력을 위한 flag
			
			int result = dao.kakaoSignUp(paramMap);
			
			if(result != 0) {
				loginMember = dao.login((String)paramMap.get("email"));
				if(loginMember != null) {
					
					loginMember.setMemberPw(null);
					return loginMember;
				}
			}
		}
		
		return loginMember;
	}


	

}
