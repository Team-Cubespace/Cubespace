package com.team.cubespace.common.interceptor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import com.team.cubespace.folder.model.service.FolderService;
import com.team.cubespace.folder.model.vo.Folder;
import com.team.cubespace.minihome.model.vo.Minihome;

public class FolderInterceptor implements HandlerInterceptor{

	@Autowired
	private HttpSession session;
	
	@Autowired
	private FolderService fService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		// 미니홈의 주인 회원번호 가져오기
		int hostMemberNo = ((Minihome)session.getAttribute("minihome")).getMemberNo();
		
		// 카테고리타입 번호 가져오기
		Map<String, String> pathVariable = (Map<String, String>)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		int boardTypeNo = Integer.parseInt(pathVariable.get("boardTypeNo"));   
		
		// paramMap 세팅
		Map<String, Integer> paramMap = new HashMap<>();
		paramMap.put("hostMemberNo", hostMemberNo);
		paramMap.put("boardTypeNo", boardTypeNo);
		
		// 폴더 목록 조회 서비스 호출
		List<Folder> folderList = fService.selectFolderList(paramMap);
		
		session.setAttribute("folderList", folderList);
		
		return HandlerInterceptor.super.preHandle(request, response, handler);
	}
	
}
