package com.team.cubespace.miniroom.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.team.cubespace.main.model.vo.ShopMiniroom;
import com.team.cubespace.member.model.vo.Member;
import com.team.cubespace.minihome.model.service.MinihomeMainService;
import com.team.cubespace.minihome.model.vo.Minihome;
import com.team.cubespace.miniroom.model.service.MiniroomService;
import com.team.cubespace.miniroom.model.vo.Minimee;
import com.team.cubespace.miniroom.model.vo.Miniroom;
import com.team.cubespace.miniroom.model.vo.MiniroomPlace;

/**
 * 미니룸 기능 관련 컨트롤러
 * @author HJ
 */
@Controller
@RequestMapping("/miniroom")
public class MiniroomController {
	@Autowired
	private MiniroomService service;
	
	@Autowired
	private MinihomeMainService homeservice;
	
	// 미니룸 꾸미기 이동
	@GetMapping("/decorating/{memberNo}")
	public String miniroom(@SessionAttribute("minihome") Minihome minihome,
		       			   @PathVariable("memberNo") int memberNo, Model model) {
		
		// 프로필 + 깐부 목록 조회
		Map<String, Object> profileMap = homeservice.profile(memberNo);
		model.addAttribute("profileMap", profileMap);	
		return "minihome/miniroom/miniroom";
	}
	
	// 미니룸 벽지, 바닥 조회
	@GetMapping("/room")
	@ResponseBody
	public Miniroom room(@SessionAttribute("minihome") Minihome minihome) {
		return service.room(minihome.getMemberNo());
	}
	
	// 배치된 소품 좌표 조회
	@GetMapping("/placeList")
	@ResponseBody
	public List<MiniroomPlace> placeList(@SessionAttribute("minihome") Minihome minihome) {
		return service.placeList(minihome.getMemberNo());
	}
	
	// 미니미 목록 조회
	@GetMapping("/minimeeList")
	@ResponseBody
	public List<Minimee> minimeeList() {
		return service.minimeeList();
	}
	
	// 소유한 소품 목록 조회
	@GetMapping("/goodsList")
	@ResponseBody
	public List<ShopMiniroom> goodsList(@SessionAttribute("minihome") Minihome minihome) {
		return service.goodsList(minihome.getMemberNo());
	}
	
	// 현재 상태 저장
	@PostMapping("/save")
	public String save(@SessionAttribute("minihome") Minihome minihome, 								 // 미니홈피 주인 번호
					   @RequestParam(value="inputWallColor", required=false) String wallColor, 			 // 벽지 색상
					   @RequestParam(value="inputWallImage", required=false) MultipartFile wallImage,	 // 벽지 이미지
					   @RequestParam(value="inputFloorColor", required=false) String floorColor,		 // 바닥 색상
					   @RequestParam(value="inputFloorImage", required=false) MultipartFile floorImage,  // 바닥 이미지
					   @RequestParam(value="wall", required=false, defaultValue="0") int wallPattern,	 // 벽지 패턴
					   @RequestParam(value="floor", required=false, defaultValue="0") int floorPattern,	 // 바닥 패턴
					   @RequestParam(value="propsArray", required=false) String[] props,				 // 소품 배열
					   @RequestParam(value="wallFlag", required=false) String wallFlag,					 // 벽지 업데이트 플래그
					   @RequestParam(value="floorFlag", required=false) String floorFlag,				 // 바닥 업데이트 플래그
				   	   HttpServletRequest req) throws Exception {
		
		// 회원 번호, 소품 번호, 카테고리 번호, 자리번호 insert
		int result1 = service.props(minihome.getMemberNo(), props);
		
		// 벽지, 바닥 경로 지정
		String webPath1 = "/resources/images/wallImage/";
		String filePath1 = req.getSession().getServletContext().getRealPath(webPath1);
		
		String webPath2 = "/resources/images/floorImage/";
		String filePath2 = req.getSession().getServletContext().getRealPath(webPath2);
		
		Miniroom miniroom = new Miniroom();
		
		miniroom.setMemberNo(minihome.getMemberNo());
		
		int result2 = service.updateRoom(webPath1, filePath1, webPath2, filePath2, wallColor, wallImage, floorColor, floorImage,
										 wallPattern, floorPattern, wallFlag, floorFlag, miniroom);
		
		if(result1 > 0 && result2 > 0) {
			return "redirect:/minihome/home/" + minihome.getMemberNo();
		} else {
			return "redirect:/miniroom/decorating/" + minihome.getMemberNo();
		}
	}
}