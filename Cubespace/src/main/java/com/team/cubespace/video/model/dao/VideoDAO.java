package com.team.cubespace.video.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.album.model.vo.Album;
import com.team.cubespace.common.Pagination;
import com.team.cubespace.video.model.vo.Video;

@Repository
public class VideoDAO {
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 특정 폴더 동영상 개시글 갯수 조회
	 * @param paramMap
	 * @return listCount
	 */
	public int getListCount(Map<String, Integer> paramMap) {
		return sqlSession.selectOne("videoMapper.getListCount", paramMap);
	}

	/** 특정 폴더 게시글 조회
	 * @param pagination
	 * @param paramMap
	 * @return videoList
	 */
	public List<Album> selectVideoList(Pagination pagination, Map<String, Integer> paramMap) {
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		return sqlSession.selectList("videoMapper.selectVideoList", paramMap, rowBounds);
	}

	/** 동영상 상세 조회
	 * @param videoNo
	 * @return video
	 */
	public Video selectVideo(int videoNo) {
		return sqlSession.selectOne("videoMapper.selectVideo", videoNo);
	}

	/** 동영상 글 작성
	 * @param video
	 * @return videoNo
	 */
	public int albumWrite(Video video) {
		int result = sqlSession.insert("videoMapper.insertVideo", video);
		if(result > 0) {
			result = video.getVideoNo();
		}
		return result;
	}

	/** 동영상 글 수정 (제목, 내용, 공개여부, 폴더번호, 스크랩 허용 여부)
	 * @param video
	 * @return result
	 */
	public int videoUpdate(Video video) {
		return sqlSession.update("videoMapper.videoUpdate", video);
	}

	/** 동영상 파일 수정(비디오 웹경로, 비디오 파일변경명, 비디오 파일원본명, 썸네일 경로) 
	 * @param video
	 * @return result
	 */
	public int videoUpdateFile(Video video) {
		return sqlSession.update("videoMapper.videoUpdateFile", video);
	}
}
