package com.team.cubespace.guestbook.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.google.gson.Gson;
import com.team.cubespace.guestbook.model.service.GuestBookService;
import com.team.cubespace.guestbook.model.vo.GuestBook;
import com.team.cubespace.minihome.model.service.MinihomeMainService;
import com.team.cubespace.minihome.model.vo.Minihome;

@Controller
public class GuestBookController {

	@Autowired
	private GuestBookService service;
	
	 @Autowired
     private MinihomeMainService serviceMinihome;
	
	/** 방명록 이동
	 * @return
	 */
	@GetMapping("/guestBook")
	public String guestBook(Model model,
			@SessionAttribute("minihome") Minihome minihome) {
		
		
		Map<String, Object> profileMap = serviceMinihome.profile(minihome.getMemberNo());
        model.addAttribute("profileMap", profileMap);

		return "/minihome/guestBook/minihome-guestBook";
	}
	
	
	/** 방명록 작성
	 * @param paramMpa
	 * @return
	 */
	@GetMapping("/writeGuestBook")
	@ResponseBody
	public int writeGuestBook(@RequestParam Map<String, Object> paramMpa,
							@SessionAttribute("minihome") Minihome minihome) {
		
//		int minihomeNo = minihome.getMemberNo();
//		paramMpa.put("minihomeNo", minihomeNo);
		
		paramMpa.put("minihomeNo",minihome.getMemberNo());
		
		int writeGuestBook = service.writeGuestBook(paramMpa);
		
		return writeGuestBook; 
	}

	
	/** 방명록 목록 조회
	 * @return
	 */
	@GetMapping("/listGuestBook")
	@ResponseBody
	public String listGuestBook(@SessionAttribute("minihome") Minihome minihome) {
	
		int minihomeNo = minihome.getMemberNo();
		
		List<GuestBook> listGuestbook = service.listGuestBook(minihomeNo);
		
		return new Gson().toJson(listGuestbook); 
	}
	
	
	/** 기존 방명록 비밀글로 변경
	 * @param gbNo
	 * @return
	 */
	@GetMapping("/secretGuestBook")
	@ResponseBody
	public int secretGuestBook(int gbNo) {
		
		int secretChange = service.secretGuestBook(gbNo);
		
		return secretChange;
	}
	
	/** 방명록 삭제
	 * @param gbNo
	 * @return
	 */
	@GetMapping("/deleteGuestBook")
	@ResponseBody
	public int deleteGuestBook(int gbNo) {
		
		int guestBookDelete =service.deleteGuestBook(gbNo);
		
		return guestBookDelete;
	}
	
	
	/** 방명록 수정
	 * @param paramMpa
	 * @return
	 */
	@GetMapping("/modifyGuestBook")
	@ResponseBody
	public int modifyGuestBook(@RequestParam Map<String, Object> paramMpa) {
		
		int result = service.modifyGuestBook(paramMpa);
		
		return result;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
