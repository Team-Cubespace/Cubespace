package com.team.cubespace.video.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.team.cubespace.album.model.vo.Comment;
import com.team.cubespace.video.model.vo.Video;

public interface VideoService {

	/** 동영상 목록 조회
	 * @param paramMap
	 * @param cp
	 * @return resultMap
	 */
	Map<String, Object> selectVideoList(Map<String, Integer> paramMap, int cp);

	/** 동영상 상세 조회
	 * @param videoNo
	 * @return video
	 */
	Video selectVideo(Map<String, Integer> paramMap);

	/** 동영상 글 작성
	 * @param video
	 * @param inputVideo
	 * @param videoWebPath
	 * @param videoFolderPath
	 * @param ffmpegPath
	 * @param thumbnailWebPath
	 * @param thumbnailFolderPath
	 * @return videoNo
	 * @throws IOException 
	 */
	int videoWrite(Video video, MultipartFile inputVideo, String videoWebPath, String videoFolderPath,
			String ffmpegPath, String thumbnailWebPath, String thumbnailFolderPath) throws Exception;

	/** 동영상 글 수정
	 * @param video
	 * @param inputVideo
	 * @param videoWebPath
	 * @param videoFolderPath
	 * @param ffmpegPath
	 * @param thumbnailWebPath
	 * @param thumbnailFolderPath
	 * @return result
	 * @throws Exception 
	 */
	int videoUpdate(Video video, MultipartFile inputVideo, String videoWebPath, String videoFolderPath,
			String ffmpegPath, String thumbnailWebPath, String thumbnailFolderPath) throws Exception;

	/** 동영상 글 삭제
	 * @param videoNo
	 * @return result
	 */
	int videoDelete(int videoNo);

	/** 동영상 조회수 증가
	 * @param videoNo
	 * @return result
	 */
	int updateReadCount(int videoNo);

	/** 동영상 글 스크랩
	 * @param video
	 * @param comment
	 * @param hostMemberNo
	 * @return result
	 */
	int videoScrap(Video video, Comment comment, int hostMemberno);

	/** 동영상 변경명 목록 조회
	 * @return
	 */
	List<String> selectVideoList();
	
	
	
}
