package com.team.cubespace.minihome.model.service;

import java.util.List;
import java.util.Map;

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
}