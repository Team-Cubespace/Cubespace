package com.team.cubespace.login.model.service;

import java.util.List;
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
	 * @throws Exception 
	 */
	@Override
	@Transactional(rollbackFor = Exception.class)
	public Member login(Member inputMember)  {
		
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
	 * @throws Exception 
	 */
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int signUp(Member inputMember) throws Exception {
		
		// 비밀번호 암호화
		String encPw = bcrypt.encode(inputMember.getMemberPw());
		inputMember.setMemberPw(encPw);
		
		int memberNo = dao.signUp(inputMember);
		int result = 0;
		
		if(memberNo > 0) {
			
			int ownResult = dao.insertOwnGoods(inputMember); // 회원소유품목
			int minihomeResult = dao.insertMinihome(memberNo); // 미니홈
			int folderResult = dao.insertFolder(memberNo); // 폴더
			int categoryOrderResult = dao.insertCategoryOrder(memberNo); // 카테고리순서
			if(ownResult * minihomeResult * folderResult * categoryOrderResult <= 0) {
				
				throw new Exception("회원가입 중 오류 발생");
				
			}  else {
				
				result = memberNo;
			}
		}
		
		
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
	 * @throws Exception 
	 */
	@Override
	@Transactional(rollbackFor = Exception.class)
	public Member kakaoLogin(Member inputMember) throws Exception  {
		
		// paramMap의 email을 기존의 회원과 조회해서 
		// 있다면 -> 기존의 로그인메서드 호출
		// 없다면 -> 카카오 회원가입 진행(비밀번호 = 아이디랑 동일하게) 이후 return loginMember
		
		Member loginMember = dao.login(inputMember.getMemberEmail());
		
		if(loginMember != null) {
			loginMember.setMemberPw(null);
			return loginMember;
			
		} else {
			inputMember.setMemberPw(bcrypt.encode(inputMember.getMemberEmail())); // 비밀번호 자리에 로그인 인코딩정보 넣음
			
			int result = dao.kakaoSignUp(inputMember);
			
			if(result != 0) { // 카카오 회원가입 성공시
				loginMember = dao.login(inputMember.getMemberEmail()); // 방금 회원가입한 회원의 정보를 가져옴
				
				if(loginMember != null) {
					loginMember.setMemberPw(null);
					
					
					int ownResult = dao.insertOwnGoods(loginMember); // 회원소유품목
					int minihomeResult = dao.insertMinihome(loginMember.getMemberNo()); // 미니홈
					int folderResult = dao.insertFolder(loginMember.getMemberNo()); // 폴더
					int categoryOrderResult = dao.insertCategoryOrder(loginMember.getMemberNo()); // 카테고리순서
					
					if(ownResult * minihomeResult * folderResult * categoryOrderResult <= 0) {
						
						throw new Exception("회원가입 중 오류 발생");

					} 
					
				}
			}
		}
		
		return loginMember;
	}


	// 내 회원 정보 수정
		@Override
		@Transactional(rollbackFor = Exception.class)
		public int updateInfo(Member inputMember) {
			
			
			return dao.updateInfo(inputMember);
		}
		
		/**
		 * 회원 비밀번호 변경
		 */
		@Override
		public int changePw(Member inputMember) {
			
			String encPw = bcrypt.encode(inputMember.getMemberPw());
			inputMember.setMemberPw(encPw);
			
			return dao.changePw(inputMember);
		}
		
		// 회원 탈퇴 
		@Transactional
		@Override
		public int secessionSelect(int memberNo, Member inputMember) {
			
			// 1. 회원탈퇴 회원 조회 (아이디/ 비밀번호/이름)
		    	Member memeberInf = dao.getMemberInfo(memberNo);
	 
		    	
				// 2. 입력 값 과 조회된 값이 같은지 확인
	    	// 비밀번호가 맞는지 먼저 확인
			if (bcrypt.matches(inputMember.getMemberPw(), memeberInf.getMemberPw())) {
			
				// map 에서 값 꺼내서 아이디 , 이름 같은지 조회
				if (inputMember.getMemberEmail().equals(memeberInf.getMemberEmail()) &&
						inputMember.getMemberName().equals(memeberInf.getMemberName())	) {
					
					// 같다면 탈퇴 처리 
					int result = dao.secessionDelete(memberNo);
					
	               return result;
				}
			}
			return 0;
		}


		/**
		 * 차단기한이 지난 회원의 정보 리스트
		 */
		@Override
		public List<Member> selectMemberBlockList() {
			
			return dao.selectMemberBlockList();
		}


		/**
		 * 차단기한이 지난 회원의 정보 삭제
		 */
		@Override
		public int deleteMemberBlock() {

			return dao.deleteMemberBlock();
		}





}
