package com.team.cubespace.video.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.album.model.vo.Album;
import com.team.cubespace.common.Pagination;

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
}