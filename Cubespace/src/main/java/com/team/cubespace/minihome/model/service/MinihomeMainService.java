package com.team.cubespace.minihome.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.team.cubespace.member.model.vo.Member;
import com.team.cubespace.minihome.model.vo.FriendMessage;
import com.team.cubespace.minihome.model.vo.NewPost;

/**
 * @author HJ
 */
public interface MinihomeMainService {
	/**
	 * 프로필 + 깐부 목록 조회
	 * @param memberNo
	 * @return profileMap
	 */
	Map<String, Object> profile(int memberNo);

	/**
	 * 깐부 상태 확인 (최근 게시물 공개 여부, 깐부 메시지 등록)
	 * @param paramMap
	 * @return friendFlag
	 */
	int friendFlag(Map<String, Integer> paramMap);
	
	/**
	 * 최근 게시물 조회
	 * @param loginNo
	 * @param memberNo
	 * @return newPost
	 */
	List<NewPost> newPost(Map<String, Integer> paramMap);

	/**
	 * 깐부 메시지 조회
	 * @param memberNo
	 * @return friendMessage
	 */
	List<FriendMessage> friendMessage(int memberNo);
	
	/**
	 * 기분 변경
	 * @param paramMap
	 * @return result
	 */
	int emotion(Map<String, Object> paramMap);

	/**
	 * 프로필 수정
	 * @param webPath
	 * @param filePath
	 * @param profileImage
	 * @param loginMember
	 * @return result
	 * @throws Exception
	 */
	int updateProfile(String webPath, String filePath, MultipartFile profileImage,
					  String updateFlag, Member loginMember) throws Exception;

	/**
	 * 깐부 메시지 등록
	 * @param paramMap
	 * @param loginMember
	 * @return friendMessage
	 */
	FriendMessage insertMessage(Map<String, Object> paramMap, Member loginMember);

	/**
	 * 깐부 메시지 삭제
	 * @param commentNo
	 * @return result
	 */
	int deleteMessage(int commentNo);
}