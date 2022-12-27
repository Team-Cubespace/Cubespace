package com.team.cubespace.common.scheduling;



import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.team.cubespace.login.model.service.LoginService;
import com.team.cubespace.member.model.vo.Member;

@Component
public class BlockMemberDelScheduling {
	
	private List<Member> memberBlockList;
	
	@Autowired
	private LoginService service;

	
	@Autowired
	private ServletContext application;
	
	// 로그를 출력하는 객체 얻어오기
	private Logger logger = LoggerFactory.getLogger(BlockMemberDelScheduling.class);
	
	
	// 2. 삭제 스케줄링
	@Scheduled(cron = "0 0 18 * * *") // 매일 18시마다 실행
	public void deleteGoodsImageFile() {
		
		// 1. DB에서 BOARD_IMG 테이블의 "날짜가 지난" 차단된 회원목록을 조회
		memberBlockList = service.selectMemberBlockList();
		logger.info("정지기한이 지난 회원 삭제 스케줄링 완료");
				
		int result = service.deleteMemberBlock();
		
		
		if(result != 0) {
			
			for(Member member : memberBlockList) {
				
				logger.info(member.getMemberNickname() + "님의 정지를 해제했습니다");
			}
		}
		
		logger.info("정지기한이 지난 회원 삭제 스케줄링 완료");
		
		
	}

}
