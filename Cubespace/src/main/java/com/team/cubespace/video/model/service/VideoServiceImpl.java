package com.team.cubespace.video.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.team.cubespace.album.model.service.CommentService;
import com.team.cubespace.album.model.vo.Album;
import com.team.cubespace.album.model.vo.Comment;
import com.team.cubespace.common.Pagination;
import com.team.cubespace.common.Util;
import com.team.cubespace.main.model.vo.Notifications;
import com.team.cubespace.video.model.dao.VideoDAO;
import com.team.cubespace.video.model.vo.Video;

@Service
public class VideoServiceImpl implements VideoService{
	@Autowired
	private VideoDAO dao;

	@Autowired
	private CommentService cService;
	@Override
	public Map<String, Object> selectVideoList(Map<String, Integer> paramMap, int cp) {
		
		// 특정 폴더의 동영성 갯수 구하기
		int listCount = dao.getListCount(paramMap);
		
		// 페이징 처리 객체 생성
		Pagination pagination = new Pagination(listCount, cp, 9, 10);
		
		// 페이징 처리객체 사용하여 앨범 게시글 목록 조회
		List<Album> videoList = dao.selectVideoList(pagination, paramMap);
			
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("videoList", videoList);
		
		return resultMap;
	}

	// 비디오 상세 조회
	@Override
	public Video selectVideo(Map<String, Integer> paramMap) {
		return dao.selectVideo(paramMap);
	}

	// 비디오 글 작성
	@Override
	public int videoWrite(Video video, MultipartFile inputVideo, String videoWebPath, String videoFolderPath,
			String ffmpegPath, String thumbnailWebPath, String thumbnailFolderPath) throws Exception {
		// 비디오 글 내용 XSS, Line 처리
		video.setVideoTitle(Util.XSSHandling(video.getVideoTitle()));
		if(video.getVideoContent() != null) {
			video.setVideoContent(Util.XSSHandling(video.getVideoContent()));
			video.setVideoContent(Util.newLineHandling(video.getVideoContent()));
		}
		// 임시 파일 
		String tempRename = Util.fileRename(inputVideo.getOriginalFilename());
		String fileRename = Util.fileRename(inputVideo.getOriginalFilename().substring(0, inputVideo.getOriginalFilename().lastIndexOf("."))+".mp4");
		String thumbnailRename = fileRename.substring(0, fileRename.lastIndexOf(".")) + ".png";
		System.out.println("fileName =" + fileRename);
		System.out.println("thumbnailRename = " + thumbnailRename);
		
		
		video.setVideoPath(videoWebPath);
		video.setVideoOriginalName(inputVideo.getOriginalFilename());
		video.setVideoRename(fileRename);
		video.setVideoThumbnail(thumbnailWebPath + thumbnailRename);
		
		int videoNo = dao.albumWrite(video);
		
		if(videoNo > 0) { 	// DB에 video 정보 등록 성공 시
			
			// 영상 인코딩 후 서버에 저장
			try {
				Util.uploadVideo(ffmpegPath, videoFolderPath, tempRename, fileRename, thumbnailFolderPath, thumbnailRename, inputVideo);				
			}catch(Exception e) {
				throw new Exception();
			}
		}
		return videoNo;
	}

	@Override
	public int videoUpdate(Video video, MultipartFile inputVideo, String videoWebPath, String videoFolderPath,
			String ffmpegPath, String thumbnailWebPath, String thumbnailFolderPath) throws Exception {
		
		video.setVideoTitle(Util.XSSHandling(video.getVideoTitle()));
		if(video.getVideoContent() != null) {
			video.setVideoContent(Util.XSSHandling(video.getVideoContent()));
			video.setVideoContent(Util.newLineHandling(video.getVideoContent()));
		}
		
		int result = dao.videoUpdate(video);	// 제목, 내용, 공개여부, 폴더번호, 스크랩 허용 여부
		
		if(result > 0 && inputVideo.getSize() != 0) {
			// 임시 파일 
			String tempRename = Util.fileRename(inputVideo.getOriginalFilename());
			String fileRename = Util.fileRename(inputVideo.getOriginalFilename().substring(0, inputVideo.getOriginalFilename().lastIndexOf("."))+".mp4");
			String thumbnailRename = fileRename.substring(0, fileRename.lastIndexOf(".")) + ".png";

			video.setVideoPath(videoWebPath);
			video.setVideoOriginalName(inputVideo.getOriginalFilename());
			video.setVideoRename(fileRename);
			video.setVideoThumbnail(thumbnailWebPath + thumbnailRename);
			
			result = dao.videoUpdateFile(video);
			
			if(result > 0) {
				// 영상 인코딩 후 서버에 저장
				try {
					Util.uploadVideo(ffmpegPath, videoFolderPath, tempRename, fileRename, thumbnailFolderPath, thumbnailRename, inputVideo);				
				}catch(Exception e) {
					throw new Exception();
				}
			}
		}
		return result;
	}

	// 비디오 글 삭제
	@Override
	public int videoDelete(int videoNo) {
		return dao.videoDelete(videoNo);
	}

	// 동영상 조회수 증가
	@Override
	public int updateReadCount(int videoNo) {
		return dao.updateReadCount(videoNo);
	}

	// 동영상 글 스크랩
	@Override
	public int videoScrap(Video video, Comment comment, int hostMemberNo) {
		System.out.println("동영상 스크랩");
		// 동영상 글 스크랩
		int result = dao.videoScrap(video);
		
		if(result > 0) {
			Notifications alarm = new Notifications();
			alarm.setSenderNo(video.getMemberNo());
			alarm.setReceiverNo(hostMemberNo);
			alarm.setBoardTypeNo(comment.getBoardTypeNo());
			alarm.setBoardNo(video.getScrapVideoNo());
			alarm.setAlarmType(2);
			
			result = cService.sendAlarm(alarm);
			System.out.println("알람 보내기 성공");
		}
		
		// 글 스크랩 완료 후 댓글이 비어있지 않다면
		if( result > 0 && comment.getCommentContent() != null) {
			comment.setCommentContent(Util.XSSHandling(comment.getCommentContent()));
			comment.setCommentContent(Util.newLineHandling(comment.getCommentContent()));
			result = cService.insertComment(comment, hostMemberNo);
		}
		
		return result;
	}

	// 동영상 변경명 목록 조회
	@Override
	public List<String> selectVideoList() {
		return dao.selectVideoList();
	}
}
