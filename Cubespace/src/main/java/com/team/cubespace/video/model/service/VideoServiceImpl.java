package com.team.cubespace.video.model.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.team.cubespace.album.model.vo.Album;
import com.team.cubespace.common.Pagination;
import com.team.cubespace.common.Util;
import com.team.cubespace.video.model.dao.VideoDAO;
import com.team.cubespace.video.model.vo.Video;

import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;

@Service
public class VideoServiceImpl implements VideoService{
	@Autowired
	private VideoDAO dao;

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

	@Override
	public Video selectVideo(int videoNo) {
		return dao.selectVideo(videoNo);
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
		String thumbnailRename = Util.fileRename("1.png");
		
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
			String thumbnailRename = Util.fileRename("1.png");
			
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
}
