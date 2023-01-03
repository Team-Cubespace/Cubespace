package com.team.cubespace.guestbook.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.google.gson.Gson;
import com.team.cubespace.guestbook.model.service.GuestBookService;
import com.team.cubespace.guestbook.model.vo.GuestBook;
import com.team.cubespace.minihome.model.vo.Minihome;

@Controller
public class GuestBookController {

	@Autowired
	private GuestBookService service;
	
	/** 방명록 이동
	 * @return
	 */
	@GetMapping("/guestBook")
	public String guestBook() {
		return "/minihome/guestBook/minihome-guestBook";
	}
	
	
	/** 방명록 작성
	 * @param paramMpa
	 * @return
	 */
	@GetMapping("/writeGuestbook")
	@ResponseBody
	public int writeGuestbook(@RequestParam Map<String, Object> paramMpa,
							@SessionAttribute("minihome") Minihome minihome) {
		
//		int minihomeNo = minihome.getMemberNo();
//		paramMpa.put("minihomeNo", minihomeNo);
		
		paramMpa.put("minihomeNo",minihome.getMemberNo());
		
		
		int writeGuestbook = service.writeGuestbook(paramMpa);
		
		return writeGuestbook; 
	}
	
}
