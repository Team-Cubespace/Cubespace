package com.team.cubespace.album.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.google.gson.Gson;
import com.team.cubespace.album.model.service.AlbumService;
import com.team.cubespace.album.model.vo.Album;
import com.team.cubespace.album.model.vo.Comment;
import com.team.cubespace.common.Util;
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
			@RequestParam(value="cp", required=false, defaultValue="1") int cp
			/*HttpServletRequest req*/) {
		
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
	
	@ResponseBody
	@PostMapping("/albumWrite")
	public String albumWrite(Album album,
			@RequestParam("imageList") List<MultipartFile> imageList,
			@SessionAttribute("loginMember") Member loginMember,
			HttpSession session) throws IllegalStateException, IOException {
		
		// 작성된 앨범에 작성자 번호 세팅
		album.setMemberNo(loginMember.getMemberNo());
		
		// 업로드된 파일의 웹 접근경로 / 서버 내부 경로 저장
		String webPath = "/resources/images/album/";
		String folderPath = session.getServletContext().getRealPath(webPath);
		
		// 앨범 작성 서비스 호출 후 앨범 번호 반환
		int albumNo = service.albumWrite(album, imageList, webPath, folderPath);
		Map<String, Integer> resultMap = new HashMap<>();
		resultMap.put("albumNo", albumNo);
		resultMap.put("folderNo", album.getFolderNo());
		return new Gson().toJson(resultMap);
	}
	
	/** 앨범 상세조회
	 * @return minihome/album/album-write 포워드
	 */
	@GetMapping("/albumDetail/{albumNo}")
	public String albumDetail(@PathVariable("albumNo") int albumNo,
			Model model,
			int folderNo,
			@SessionAttribute
			("folderList") List<Folder> folderList) {
		
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
		model.addAttribute("board", album);
		return "minihome/album/album-detail";
	}
	
	@GetMapping("/albumDelete/{albumNo}")
	public String albumDelete(@PathVariable("albumNo") int albumNo,
			@RequestHeader("referer") String referer,
			int folderNo,
			int cp,
			RedirectAttributes ra) {
		
		// 삭제 서비스 호출
		int result = service.albumDelete(albumNo);
		
		String message = "";
		String path = "";
		if(result > 0) {
			// 삭제 성공
			message = "삭제에 성공했습니다.";
			path = "/albumList/2?folderNo=" + folderNo + "&cp=" + cp;
		} else {
			// 삭제 실패
			message = "삭제에 실패했습니다.";
			path = referer;
		}
		
		ra.addFlashAttribute("message", message);
		return "redirect:" + path;
	}
	
	
	@GetMapping("/albumUpdate/{albumNo}")
	public String albumUpdate(@PathVariable("albumNo") int albumNo,
			Model model,
			@RequestHeader("referer") String referer) {
		// 앨범 조회
		Album album = service.selectAlbum(albumNo);
		
		if(album.getAlbumContent() != null) {
			album.setAlbumContent(Util.newLineClear(album.getAlbumContent()));
		}
		model.addAttribute("album", album);
		model.addAttribute("referer", referer);
		return "/minihome/album/album-update";
	}
	
	@ResponseBody
	@PostMapping("/albumUpdate")
	public String albumUpdate(Album album, 
			@SessionAttribute("loginMember") Member loginMember,
			@RequestParam(value="deleteImageList", required=false) List<String> deleteImageList,
			@RequestParam(value="imageList", required=false) List<MultipartFile> imageList,
			int prevLength,
			int albumNo,
			HttpSession session
			) throws IllegalStateException, IOException {
		// 앨범 번호 세팅
		album.setAlbumNo(albumNo);
		album.setMemberNo(loginMember.getMemberNo());
		
		// 웹/서버 경로 지정
		String webPath = "/resources/images/album/";
		String folderPath = session.getServletContext().getRealPath(webPath);
		
		// 앨범 수정 서비스 호출
		int result = service.albumUpdate(album, webPath, folderPath, imageList, deleteImageList, prevLength);
		
		Map<String, Integer> resultMap = new HashMap<>();
		resultMap.put("folderNo", album.getFolderNo());
		resultMap.put("albumNo", albumNo);
		
		return new Gson().toJson(resultMap);
	}
	
	@ResponseBody
	@PostMapping("/boardScrap")
	public int boardScrap(Album album, Comment comment) {
		
		album.setScrapAlbumNo(comment.getBoardNo());
		int result = service.albumScrap(album, comment);
		return result;
	}
}
