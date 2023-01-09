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
	public String save(@SessionAttribute("minihome") Minihome minihome, 
					   @RequestParam(value="inputWallColor", required=false) String wallColor,
					   @RequestParam(value="inputWallImage", required=false) MultipartFile wallImage,
					   @RequestParam(value="inputFloorColor", required=false) String floorColor,
					   @RequestParam(value="inputFloorImage", required=false) MultipartFile floorImage,
					   @RequestParam(value="wall", required=false) int wallPattern,
					   @RequestParam(value="floor", required=false) int floorPattern,
					   @RequestParam(value="propsArray", required=false) String[] props,
					   @RequestParam(value="wallFlag", required=false) String wallFlag,
					   @RequestParam(value="floorFlag", required=false) String floorFlag,
				   	   HttpServletRequest req) throws IllegalStateException, IOException, Exception {
		
		// 회원 번호, 소품 번호, 카테고리 번호, 자리번호 insert
		int result1 = service.props(minihome.getMemberNo(), props);
		
		// 벽지 바닥 업데이트
		String webPath1 = "/resources/images/wallImage/";
		String filePath1 = req.getSession().getServletContext().getRealPath(webPath1);
		
		String webPath2 = "/resources/images/floorImage/";
		String filePath2 = req.getSession().getServletContext().getRealPath(webPath1);
		
		Miniroom miniroom = new Miniroom();
		
		miniroom.setMemberNo(minihome.getMemberNo());
		
		int result2 = service.updateRoom(webPath1, filePath1, webPath2, filePath2, wallColor, wallImage, floorColor, floorImage,
											wallPattern, floorPattern, wallFlag, floorFlag, miniroom);
		
		return "redirect:/minihome/home/" + minihome.getMemberNo();
	}
}