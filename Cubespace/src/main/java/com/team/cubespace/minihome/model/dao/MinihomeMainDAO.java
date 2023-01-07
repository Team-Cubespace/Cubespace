package com.team.cubespace.minihome.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.member.model.vo.Member;
import com.team.cubespace.minihome.model.vo.FriendMessage;
import com.team.cubespace.minihome.model.vo.NewPost;

/**
 * @author HJ
 */
@Repository
public class MinihomeMainDAO {
	@Autowired
	private SqlSessionTemplate sqlSession;

	/**
	 * 프로필 조회
	 * @param memberNo
	 * @return profile
	 */
	public Member selectProfile(int memberNo) {
		return sqlSession.selectOne("minihomeMainMapper.selectProfile", memberNo);
	}

	/**
	 * 깐부 목록 조회
	 * @param memberNo
	 * @return friendList
	 */
	public List<Member> selectFriendList(int memberNo) {
		return sqlSession.selectList("minihomeMainMapper.selectFriendList", memberNo);
	}

	/**
	 * 깐부 상태 확인 (최근 게시물 공개 여부, 깐부 메시지 등록)
	 * @param paramMap
	 * @return friendFlag
	 */
	public int selectFriendFlag(Map<String, Integer> paramMap) {
		return sqlSession.selectOne("minihomeMainMapper.selectFriendFlag", paramMap);
	}

	/**
	 * 최근 게시물 조회
	 * @param paramMap
	 * @return newPost
	 */
	public List<NewPost> selectNewPost(Map<String, Integer> paramMap) {
		return sqlSession.selectList("minihomeMainMapper.selectNewPost", paramMap);
	}
	
	/**
	 * 깐부 메시지 조회
	 * @param memberNo
	 * @return friendMessage
	 */
	public List<FriendMessage> selectFriendMessage(int memberNo) {
		return sqlSession.selectList("minihomeMainMapper.selectFriendMessage", memberNo);
	}

	/**
	 * 기분 변경
	 * @param paramMap
	 * @return result
	 */
	public int updateEmotion(Map<String, Object> paramMap) {
		return sqlSession.update("minihomeMainMapper.updateEmotion", paramMap);
	}

	/**
	 * 프로필 이미지 수정
	 * @param loginMember
	 * @return result
	 */
	public int updateProfileImage(Member loginMember) {
		return sqlSession.update("minihomeMainMapper.updateProfileImage", loginMember);
	}

	/**
	 * 프로필 메시지 수정
	 * @param loginMember
	 * @return result
	 */
	public int updateComment(Member loginMember) {
		return sqlSession.update("minihomeMainMapper.updateComment", loginMember);
	}

	/**
	 * 깐부 메시지 번호 조회
	 * @return commentNo
	 */
	public int selectCommentNo() {
		return sqlSession.selectOne("minihomeMainMapper.selectCommentNo");
	}

	/**
	 * 깐부 메시지 등록
	 * @param paramMap
	 * @return result
	 */
	public int insertMessage(Map<String, Object> paramMap) {
		return sqlSession.insert("minihomeMainMapper.insertMessage", paramMap);
	}

	/**
	 * 깐부 메시지 삭제
	 * @param commentNo
	 * @return result
	 */
	public int deleteMessage(int commentNo) {
		return sqlSession.delete("minihomeMainMapper.deleteMessage", commentNo);
	}
}