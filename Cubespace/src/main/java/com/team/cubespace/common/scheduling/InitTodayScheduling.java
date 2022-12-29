package com.team.cubespace.common.scheduling;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.team.cubespace.minihome.model.service.MinihomeService;

@Component
public class InitTodayScheduling {
	@Autowired
	private MinihomeService service;
	
	private Logger logger = LoggerFactory.getLogger(InitTodayScheduling.class);
	
	@Scheduled(fixedRate = 1000 * 60 * 2)	// 2 분마다
	public void initTodayScheduling() {
		int result = service.initToday();
		String message = null;
		if(result > 0) {
			message = "TODAY 초기화 완료";
		} else {
			message = "TODAY 초기화 실패";
		}
		logger.info(message);
	}
}
