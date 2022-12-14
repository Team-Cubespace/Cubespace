package com.team.cubespace.video.controller;

import java.io.File;
import java.util.HashMap;
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
import com.team.cubespace.album.model.vo.Comment;
import com.team.cubespace.common.Util;
import com.team.cubespace.folder.model.vo.Folder;
import com.team.cubespace.member.model.vo.Member;
import com.team.cubespace.minihome.model.vo.Minihome;
import com.team.cubespace.video.model.service.VideoService;
import com.team.cubespace.video.model.vo.Video;

@Controller
public class VideoController {
	@Autowired
	private VideoService service;
	
	@Autowired
	private AlbumService aService;
	
	@GetMapping("/videoList/{boardTypeNo}")
	public String videoList(@PathVariable("boardTypeNo") int boardTypeNo,
			Model model, @SessionAttribute(value="loginMember", required=false) Member loginMember,
			@SessionAttribute("minihome") Minihome minihome,
//			@SessionAttribute("folderList") List<Folder> folderList,
			@RequestParam(value="folderNo", required=false, defaultValue="-1") int folderNo,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			HttpServletRequest req) {
		System.out.println(req.getRequestURI());
		if(folderNo == -1) {	// ?????? ????????? -1??????
			// ?????????????????? ?????????
			// ?????????????????? 0?????? ???????????? ???????????????
			// folderNo??? ??????
			folderNo = minihome.getVideoFolderList().get(0).getFolderNo();
		}
		
		Map<String, Integer> paramMap = new HashMap<>();
		// loginMember.memberNo??? minihome.memberNo??? ????????? ??? : 3
		// loginMember.memberNo??? minihome.memberNo??? ??????????????? ??? : 2
		// loginMember.memberNo??? minihome.memberNo??? ?????? ????????? ?????? ??? : 1
		int flag = 3;
		
		if(loginMember == null) {	// ????????? ????????? ?????? ???
			flag = 1;
			
		} else if(loginMember.getMemberNo() != minihome.getMemberNo()) {
			// ???????????? ???????????? ????????? ??????
			paramMap.put("loginMemberNo", loginMember.getMemberNo());
			paramMap.put("hostMemberNo", minihome.getMemberNo());
			int result = aService.checkFriend(paramMap);
			if(result > 0) {		// ???????????? ??? ???
				flag = 2;
			} else {		// ?????? ????????? ?????? ???
				flag = 1;
			}
		}
		
		paramMap.put("folderNo", folderNo);
		paramMap.put("flag", flag);
		
		// ????????? ?????? ?????? ????????? ??????
		Map<String, Object> resultMap = service.selectVideoList(paramMap, cp);
		
		// ?????? ?????? ??????
		String folderName = "";
		for(Folder folder : minihome.getVideoFolderList()) {
			if(folder.getFolderNo() == folderNo) {
				folderName = folder.getFolderName();
				break;
			}
		} 
		
		model.addAttribute("resultMap", resultMap);
		model.addAttribute("folderNo", folderNo);
		model.addAttribute("folderName", folderName);
		model.addAttribute("cp", cp);
		return "minihome/video/video-list";
	}
	
	/** ????????? ????????????
	 * @param videoNo
	 * @param model
	 * @param folderNo
	 * @param folderList
	 * @return
	 */
	@GetMapping("/videoDetail/{videoNo}")
	public String videoDetail(@PathVariable("videoNo") int videoNo,
			Model model,
			int folderNo,
			HttpServletRequest request) {
	
		Map<String, Integer> paramMap = new HashMap<>();
		paramMap.put("videoNo", videoNo);
		paramMap.put("folderNo", folderNo);
		// ????????? ????????? ??????
		Video video = service.selectVideo(paramMap);
		model.addAttribute("board", video);
		return "minihome/video/video-detail";
	}
	
	/** ????????? ?????? ?????????
	 * @return minihome/video/video-write ?????????
	 */
	@GetMapping("/videoWrite")
	public String videoWrite() {
		return "minihome/video/video-write";
	}
	
	@ResponseBody
	@PostMapping("/videoWrite")
	public String videoWrite(Video video,
			@RequestParam("inputVideo") MultipartFile inputVideo,
			@SessionAttribute("loginMember") Member loginMember,
			HttpSession session) throws Exception {
		
		// ????????? ???????????? ????????? ?????? ??????
		video.setMemberNo(loginMember.getMemberNo());
		
		String videoWebPath = "/resources/video/";
		String videoFolderPath = session.getServletContext().getRealPath(videoWebPath);
		
		String ffmpegPath = "/resources/ffmpeg-5.1.2-essentials_build";
		ffmpegPath = session.getServletContext().getRealPath(ffmpegPath);
		
		String thumbnailWebPath = "/resources/videothumbnail/";
		String thumbnailFolderPath = session.getServletContext().getRealPath(thumbnailWebPath);
		
		int videoNo = service.videoWrite(video, inputVideo, videoWebPath, 
				videoFolderPath, ffmpegPath, thumbnailWebPath, thumbnailFolderPath);
		
		Map<String, Integer> resultMap = new HashMap<>();
		resultMap.put("folderNo", video.getFolderNo());
		resultMap.put("videoNo", videoNo);
		
		return new Gson().toJson(resultMap);
	}
	
	@GetMapping("/videoUpdate/{videoNo}")
	public String videoUpdate(@PathVariable("videoNo") int videoNo,
			Model model,
			int folderNo,
			HttpSession session) {
		// ????????? ??????
		Map<String, Integer> paramMap = new HashMap<>();
		paramMap.put("videoNo", videoNo);
		paramMap.put("folderNo", folderNo);
		Video video = service.selectVideo(paramMap);
		
		String videoPath = session.getServletContext().getRealPath(video.getVideoPath());
		File videoFile = new File(videoPath);
		
		System.out.println(videoPath);
		int videoSize = (int) (videoFile.length() / 1024 / 1024);
		if(video.getVideoContent() != null) {
			video.setVideoContent(Util.newLineClear(video.getVideoContent()));
		}
		model.addAttribute("video", video);
		model.addAttribute("videoSize", videoSize);
		return "/minihome/video/video-update";
	}
	
	@ResponseBody
	@PostMapping("/videoUpdate")
	public String videoUpdate(Video video,
			@RequestParam("inputVideo") MultipartFile inputVideo,
			@SessionAttribute("loginMember") Member loginMember,
			int videoNo,
			HttpSession session) throws Exception{
		video.setMemberNo(loginMember.getMemberNo());
		video.setVideoNo(videoNo);
		
		// ????????? ???????????? ????????? ?????? ??????
		video.setMemberNo(loginMember.getMemberNo());
		
		String videoWebPath = "/resources/video/";
		String videoFolderPath = session.getServletContext().getRealPath(videoWebPath);
		
		String ffmpegPath = "/resources/ffmpeg-5.1.2-essentials_build";
		ffmpegPath = session.getServletContext().getRealPath(ffmpegPath);
		
		String thumbnailWebPath = "/resources/videothumbnail/";
		String thumbnailFolderPath = session.getServletContext().getRealPath(thumbnailWebPath);
		
		int result = service.videoUpdate(video, inputVideo, videoWebPath, 
				videoFolderPath, ffmpegPath, thumbnailWebPath, thumbnailFolderPath);
		
		Map<String, Integer> resultMap = new HashMap<>();
		resultMap.put("folderNo", video.getFolderNo());
		resultMap.put("videoNo", videoNo);
		
		return new Gson().toJson(resultMap);
	}
	
	/** ????????? ??? ??????
	 * @param videoNo
	 * @param referer
	 * @param folderNo
	 * @param cp
	 * @param ra
	 * @return path
	 */
	@GetMapping("/videoDelete/{videoNo}")
	public String videoDelete(@PathVariable("videoNo") int videoNo,
			@RequestHeader("referer") String referer,
			int folderNo,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			RedirectAttributes ra) {
		
		int result = service.videoDelete(videoNo);
		
		String message = "";
		String path = "";
		if(result > 0) {
			message = "????????? ??????????????????.";
			path = "/videoList/3?folderNo=" + folderNo + "&cp=" + cp;
		} else {
			message = "????????? ??????????????????.";
			path = referer;
		}
		
		ra.addFlashAttribute("message", message);
		return "redirect:" + path;
	}
	
	/** ????????? ?????????
	 * @param video
	 * @param comment
	 * @return result
	 */
	@ResponseBody
	@PostMapping("/boardScrap/3")
	public int videoScrap(Video video, Comment comment, @SessionAttribute("minihome") Minihome minihome) {
		video.setScrapVideoNo(comment.getBoardNo());
		
		int result = service.videoScrap(video, comment, minihome.getMemberNo());
		return result;
	}
}