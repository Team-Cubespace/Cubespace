package com.team.cubespace.manage.controller;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.team.cubespace.folder.model.vo.Folder;
import com.team.cubespace.login.model.service.LoginService;
import com.team.cubespace.manage.model.service.ManageService;
import com.team.cubespace.manage.model.vo.Background;
import com.team.cubespace.manage.model.vo.CategoryOrder;
import com.team.cubespace.manage.model.vo.File;
import com.team.cubespace.member.model.vo.Member;
import com.team.cubespace.minihome.model.vo.Minihome;

@Controller
@RequestMapping("/manage")
@SessionAttributes({ "folderList",  "fileList" /* , "friendList", "fontList" */})
public class manageController {
	
	@Autowired
	private ManageService service;
	
	// application scope에 배경색/프레임정보를 담기 위한 객체 생성
	@Autowired
	ServletContext application;
	
	
	@GetMapping("/font")
	public String changeFont(@SessionAttribute("loginMember") Member loginMember, 
			@RequestParam Map<String, Object> paramMap, /*searchInput*/
			Model model) {
		
		paramMap.put("memberNo", loginMember.getMemberNo());
		if(paramMap.containsKey("searchInput")) {
			model.addAttribute("searchInput", paramMap.get("searchInput"));
		}
		
		List<Map<String, Object>> fontList = service.getFontList(paramMap);
		model.addAttribute("fontList", fontList);
		
		return "manage/font";
	}
	
	
	@GetMapping("/music")
	public String changeMusic(@SessionAttribute("loginMember") Member loginMember, 
			@RequestParam Map<String, Object> paramMap, /*searchInput*/
			Model model) {
		
		paramMap.put("memberNo", loginMember.getMemberNo());
		if(paramMap.containsKey("searchInput")) {
			model.addAttribute("searchInput", paramMap.get("searchInput"));
		}
		List<Map<String, Object>> musicList = service.getMusicList(paramMap);
		model.addAttribute("musicList", musicList);
		
		return "manage/music";
	}
	
	/** 깐부관리 페이지 이동
	 * @param inputMember
	 * @param paramMap
	 * @param model
	 * @return
	 */
	@GetMapping("/friend")
	public String changeFriend(@SessionAttribute("loginMember") Member inputMember, 
			@RequestParam Map<String, Object> paramMap, /*searchInput*/
			Model model) {
		
		paramMap.put("memberNo", inputMember.getMemberNo());
		if(paramMap.containsKey("searchInput")) {
			model.addAttribute("searchInput", paramMap.get("searchInput"));
		}
		List<Map<String, String>> friendList = service.getFriendList(paramMap);
		model.addAttribute(friendList);
		
		return "manage/friend";
	}
	
	
//	메뉴 관련-------------------------------------------------------------------------------
	@GetMapping("/menu")
	public String changeMenu(@SessionAttribute("loginMember") Member inputMember, 
			Model model) {
		
		// folderList 얻어옴
		List<Folder> folderList = service.getFolderList(inputMember.getMemberNo());
		
		// categoryOrder 얻어옴
		CategoryOrder categoryOrder = service.getCategoryOrder(inputMember.getMemberNo());
		String realOrder = "";
		realOrder += categoryOrder.getDiary() + "," + categoryOrder.getAlbum() + "," + 
				categoryOrder.getVideo() + "," + categoryOrder.getGuestBook();
		
		
		model.addAttribute("folderList", folderList);
		model.addAttribute("realOrder", realOrder);
		model.addAttribute("categoryOrder", categoryOrder);
		model.addAttribute("fileList", null); // 새로 메뉴탭 열때 fileList 초기화
		
		return "manage/menu";
	}
	@GetMapping("/background")
	public String changeBackground() {
		
		return "manage/background";
	}
	
	/** 카테고리 순서 변경, 폴더순서 변경, 폴더이름 변경
	 * @param categoryOrder
	 * @return
	 * @throws Exception 
	 */
	@PostMapping("/menu/changeCategory")
	public String changeMenu(CategoryOrder categoryOrder,
			@RequestParam Map<String, Object> paramMap,
			RedirectAttributes ra, HttpServletResponse resp) throws Exception {
		
		
		int categoryOrderResult= service.changeCategory(categoryOrder); // 카테고리 순서 변경
		int updateFolderResult = service.updateFolder(paramMap); // 폴더 순서 변경
		
		String message = null;
		
		if(categoryOrderResult * updateFolderResult > 0) {
			message = "카테고리, 폴더 설정 변경 성공";
		} else {
			message = "카테고리, 폴더 설정 변경 실패";
		}
		ra.addFlashAttribute("message", message);
		
		
		resp.setContentType("text/html; charset=UTF-8");
		PrintWriter out = resp.getWriter();
//		out.print("<script>alert(" + message +");</script>");
		out.print("<script>window.parent.location.reload();</script>");
		out.flush();
		
//		return "redirect:/manage/menu";
		return null;
	}
	
	/** 카테고리 종류 원래대로
	 * @return result
	 */
	@GetMapping("/menu/categorySelectCancel")
	@ResponseBody
	public int categorySelectCancel(int memberNo) {
		return service.categorySelectCancel(memberNo);
	}

	/** 카테고리 중 보여질것 선택
	 * @param useCategory
	 * @return
	 */
	@GetMapping("/menu/categorySelect")
	@ResponseBody
	public int categorySelect(@RequestParam Map<String, Object> paramMap) {
		
		// paramMap : diary, album, video, guestBook, memberNo
		return service.categorySelect(paramMap);
	}
	
	/** 카테고리에 새 폴더 삽입
	 * @param paramMap
	 * @return
	 */
	@GetMapping("/menu/addFolder")
	@ResponseBody
	public int addFolder(@RequestParam Map<String, Object> paramMap) {
		
		// paramMap : boardTypeNo, folderName, memberNo
		return service.addFolder(paramMap);
	}
	
	/** 카테고리에서 폴더 삭제
	 * @param folderList
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	@GetMapping("/menu/deleteFolder")
	@ResponseBody
	public int deleteFolder(@SessionAttribute("folderList") List<Folder> folderList,
			@RequestParam Map<String, Object> paramMap) throws Exception {
		
		// paramMap : boardTypeNo, folderOrder, folderNo, subCategoryLength, memberNo
		return service.deleteFolder(paramMap);
	}
	
	/** 해당 파일의 폴더목록 조회
	 * @param paramMap
	 * @return
	 */
	@GetMapping("/menu/selectFileList")
	@ResponseBody
	public int selectFileList(File file,
			Model model) {
		
		// file : folderNo, categoryNo(1/2/3)
		List<File> fileList = service.selectFileList(file);
		model.addAttribute("fileList", fileList);
		
		if(fileList.size() != 0) {
			return 1;
		} else {
			return 0;
		}
	}
	
	
	/** 내 폴더의 파일 한개 삭제하기
	 * @param fileNo
	 * @param loginMember
	 * @return
	 */
	@PostMapping("/menu/deleteFile")
	@ResponseBody
	public int deleteFile(@RequestParam("fileNo") String fileNo,
			@RequestParam("categoryNo") String categoryNo,
			@SessionAttribute("loginMember") Member loginMember,
			Model model) {
		File file = new File();
		file.setFileNo(Integer.parseInt(fileNo));
		file.setMemberNo(loginMember.getMemberNo()); //  혹시 남이 파일 삭제할것을 대비
		file.setCategoryNo(Integer.parseInt(categoryNo));
		
		
		// 삭제 성공 후 세션의 fileList 업데이트를 위해 다시 조회
		List<File> fileList = service.selectFileList(file);
		model.addAttribute("fileList", fileList);
		
		return service.deleteFile(file);
	}
	
	
	/** 게시글 공개여부 설정
	 * @param file
	 * @param loginMember
	 * @return
	 */
	@GetMapping("/menu/updateOpenFlag")
	@ResponseBody
	public int updateOpenFlag(File file,
			@SessionAttribute("loginMember") Member loginMember) {
		
		// file : fileNo, memberNo, categoryNo, openFlag
		file.setMemberNo(loginMember.getMemberNo());
		return service.updateOpenFlag(file);
	}
	
//	친구(깐부) 관련-------------------------------------------------------------------------------

	/** 깐부끊기
	 * @param paramMap
	 * @return result
	 */
	@GetMapping("/friend/deleteFriend")
	@ResponseBody
	public int deleteFriend(@RequestParam Map<String, Object> paramMap) {
		return service.deleteFriend(paramMap);
	}
	
	
	
//	폰트 관련-------------------------------------------------------------------------------
	
	/** 새 폰트 적용하기
	 * @param paramMap
	 * @return
	 */
	@GetMapping("/font/useFont")
	@ResponseBody
	public int useFont(@RequestParam Map<String, Object> paramMap,
			@SessionAttribute("loginMember") Member loginMember,
			Model model) {
		int result =  service.useFont(paramMap);
		if(result > 0) {
			loginMember.setOwnFontNo(Integer.parseInt((String)paramMap.get("fontNo")));
			model.addAttribute("loginMember", loginMember);
		}
		
		
		
		return result;
	}

	
//	배경색/이미지 관련-------------------------------------------------------------------------------
	
	/** 배경색/이미지 초기화하기
	 * @param loginMember
	 * @return
	 */
	@GetMapping("/background/resetBGColor")
	@ResponseBody
	public int resetBGColor(@SessionAttribute("loginMember") Member loginMember) {
		
		Background backgroundInfo = (Background) application.getAttribute("backgroundColorInfo");
		backgroundInfo.setMemberNo(loginMember.getMemberNo());
		
		return service.resetBGColor(backgroundInfo);
	}
	
	/** 프레임 초기화하기
	 * @param loginMember
	 * @return
	 */
	@GetMapping("/background/resetFrameColor")
	@ResponseBody
	public int resetFrameColor(@SessionAttribute("loginMember") Member loginMember) {
		
		Background backgroundInfo = (Background) application.getAttribute("backgroundColorInfo");
		backgroundInfo.setMemberNo(loginMember.getMemberNo());
		
		return service.resetFrameColor(backgroundInfo);
	}
	
	
	/** 프레임 메뉴색 초기화하기
	 * @param loginMember
	 * @return
	 */
	@GetMapping("/background/resetFrameMenuColor")
	@ResponseBody
	public int resetFrameMenuColor(@SessionAttribute("loginMember") Member loginMember) {
		
		Background backgroundInfo = (Background) application.getAttribute("backgroundColorInfo");
		backgroundInfo.setMemberNo(loginMember.getMemberNo());
		
		return service.resetFrameMenuColor(backgroundInfo);
	}
	
	
	/** 배경색 변경
	 * @param loginMember
	 * @param newBGColor
	 * @return
	 */
	@GetMapping("/background/updateBGColor")
	@ResponseBody
	public int updateBGColor(@SessionAttribute("loginMember") Member loginMember,
			String newBGColor) {
		
		Background backgroundInfo = new Background();
		backgroundInfo.setBackgroundSkin(newBGColor);
		backgroundInfo.setMemberNo(loginMember.getMemberNo());
		
		return service.updateBGColor(backgroundInfo);
	}
	
	/** 배경이미지 변경
	 * @param loginMember
	 * @param newBGColor
	 * @return
	 * @throws Exception 
	 */
	@PostMapping("/background/updateBGImage")
	@ResponseBody
	public int updateBGImage(@SessionAttribute("loginMember") Member loginMember,
		MultipartHttpServletRequest request,
		HttpSession session) throws Exception{ 
		
		
		List<MultipartFile> newImgList = request.getFiles("newBGImage");
		
		String webPath = "/resources/images/frameImage/";
		String folderPath = session.getServletContext().getRealPath(webPath);
		
		Background backgroundInfo = new Background();
		backgroundInfo.setMemberNo(loginMember.getMemberNo());
		
		
		return service.updateBGImage(webPath, folderPath, backgroundInfo, newImgList.get(0));
	}
	
	/** 프레임색 변경
	 * @param loginMember
	 * @param newFrameColor
	 * @return
	 */
	@GetMapping("/background/updateFrameColor")
	@ResponseBody
	public int updateFrameColor(@SessionAttribute("loginMember") Member loginMember,
			String newFrameColor) {
		
		Background backgroundInfo = new Background();
		backgroundInfo.setFrameColor(newFrameColor);
		backgroundInfo.setMemberNo(loginMember.getMemberNo());
		
		return service.updateFrameColor(backgroundInfo);
	}
	
	/** 프레임 메뉴색 변경
	 * @param loginMember
	 * @param newFrameMenuColor, newFrameFontColor
	 * @return
	 */
	@GetMapping("/background/updateFrameMenuColor")
	@ResponseBody
	public int updateFrameMenuColor(@SessionAttribute("loginMember") Member loginMember,
			String newFrameMenuColor, String newFrameFontColor) {
		
		Background backgroundInfo = new Background();
		backgroundInfo.setFrameMenuColor(newFrameMenuColor);
		backgroundInfo.setFrameFontColor(newFrameFontColor);
		backgroundInfo.setMemberNo(loginMember.getMemberNo());
		
		return service.updateFrameMenuColor(backgroundInfo);
	}
}
