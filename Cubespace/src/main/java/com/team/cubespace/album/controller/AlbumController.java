package com.team.cubespace.album.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.team.cubespace.album.model.service.AlbumService;
import com.team.cubespace.album.model.vo.Album;
import com.team.cubespace.folder.model.vo.Folder;
import com.team.cubespace.member.model.vo.Member;
import com.team.cubespace.minihome.model.vo.Minihome;

/** 앨범 페이지 기능 관련 컨트롤러
 * @author Tonic
 *
 */
@Controller
public class AlbumController {
	@Autowired
	private AlbumService service;
	/** 앨범 목록 조회 페이지
	 * @return minihome/album/album-list 포워드
	 */
	@GetMapping("/albumList/{boardTypeNo}")
	public String albumList(@PathVariable("boardTypeNo") int boardTypeNo, 
			Model model, @SessionAttribute(value="loginMember", required=false) Member loginMember,
			@SessionAttribute("minihome") Minihome minihome,
			@SessionAttribute("folderList") List<Folder> folderList,
			@RequestParam(value="folderNo", required=false, defaultValue="-1") int folderNo,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			HttpServletRequest req) {
		
		if(folderNo == -1) {	// 폴더 번호가 -1이면
			// 폴더리스트를 가져와
			// 폴더리스트의 0번째 인덱스의 폴더번호를
			// folderNo로 지정
			folderNo = folderList.get(0).getFolderNo();
		}
		
		Map<String, Integer> paramMap = new HashMap<>();
		// loginMember.memberNo와 minihome.memberNo가 일치할 때 : 3
		// loginMember.memberNo와 minihome.memberNo가 깐부사이일 때 : 2
		// loginMember.memberNo와 minihome.memberNo가 아무 사이도 아닐 때 : 1
		int flag = 3;
		
		if(loginMember == null) {	// 로그인 상태가 아닐 때
			flag = 1;
			
		} else if(loginMember.getMemberNo() != minihome.getMemberNo()) {
			// 깐부사이 조회하는 서비스 호출
			paramMap.put("loginMemberNo", loginMember.getMemberNo());
			paramMap.put("hostMemberNo", minihome.getMemberNo());
			int result = service.checkFriend(paramMap);
			if(result > 0) {		// 깐부사이 일 때
				flag = 2;
			} else {		// 아무 사이도 아닐 때
				flag = 1;
			}
		}
		
		paramMap.put("folderNo", folderNo);
		paramMap.put("flag", flag);
		
		// 앨범 목록 조회 서비스 호출
		Map<String, Object> resultMap = service.selectAlbumList(paramMap, cp); 
		
		// 폴더 이름 찾기
		String folderName = "";
		for(Folder folder : folderList) {
			if(folder.getFolderNo() == folderNo) {
				folderName = folder.getFolderName();
				break;
			}
		}
		model.addAttribute("resultMap", resultMap);
		model.addAttribute("folderNo", folderNo);
		model.addAttribute("folderName", folderName);
		model.addAttribute("cp", cp);
		return "minihome/album/album-list";
	}
	
	/** 앨범 작성 페이지
	 * @return minihome/album/album-write 포워드
	 */
	@GetMapping("/albumWrite")
	public String albumWrite() {
		return "minihome/album/album-write";
	}
	
	/** 앨범 상세조회
	 * @return minihome/album/album-write 포워드
	 */
	@GetMapping("/albumDetail/{albumNo}")
	public String albumDetail(@PathVariable("albumNo") int albumNo,
			Model model,
			int folderNo,
			@SessionAttribute("folderList") List<Folder> folderList) {
		
		// 폴더 이름 찾기
		String folderName = "";
		for(Folder folder : folderList) {
			if(folder.getFolderNo() == folderNo) {
				folderName = folder.getFolderName();
				break;
			}
		}
		
		// 앨범 서비스 호출
		Album album = service.selectAlbum(albumNo);
		model.addAttribute("folderName", folderName);
		model.addAttribute("album", album);
		
		
		return "minihome/album/album-detail";
	}
}
