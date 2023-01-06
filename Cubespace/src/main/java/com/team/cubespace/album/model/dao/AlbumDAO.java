package com.team.cubespace.album.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.album.model.vo.Album;
import com.team.cubespace.album.model.vo.AlbumImage;
import com.team.cubespace.common.Pagination;

/**
 * @author Tonic
 *
 */
@Repository
public class AlbumDAO {
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 깐부 여부 체크
	 * @param paramMap
	 * @return result (0 이상이면 깐부)
	 */
	public int checkFriend(Map<String, Integer> paramMap) {
		return sqlSession.selectOne("albumMapper.checkFriend", paramMap);
	}

	/** 특정 폴더 게시글 갯수 조회
	 * @param paramMap
	 * @return listCount
	 */
	public int getListCount(Map<String, Integer> paramMap) {
		return sqlSession.selectOne("albumMapper.getListCount", paramMap);
	}

	/** 특정 폴더 게시글 조회
	 * @param pagination
	 * @param paramMap
	 * @return albumList
	 */
	public List<Album> selectAlbumList(Pagination pagination, Map<String, Integer> paramMap) {
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		return sqlSession.selectList("albumMapper.selectAlbumList", paramMap, rowBounds);
	}

	/** 앨범 상세 조회
	 * @param albumNo
	 * @return album
	 */
	public Album selectAlbum(Map<String, Integer> paramMap) {
		return sqlSession.selectOne("albumMapper.selectAlbum", paramMap);
	}

	/** 앨범 개시글 삽입 (이미지 제외)
	 * @param album
	 * @return results
	 */
	public int albumWrite(Album album) {
		int result = sqlSession.insert("albumMapper.albumWrite", album);
		
		if(result > 0) {
			result = album.getAlbumNo();
		}

		return result; 
	}

	/** 앨범 작성 이미지 정보 업로드
	 * @param albumImageList
	 * @return result
	 */
	public int insertAlbumImageList(List<AlbumImage> albumImageList) {
		return sqlSession.insert("albumMapper.insertAlbumImageList", albumImageList);
	}

	/** 앨범 삭제
	 * @param albumNo
	 * @return result
	 */
	public int albumDelete(int albumNo) {
		return sqlSession.update("albumMapper.albumDelete", albumNo);
	}

	/** 앨범 수정
	 * @param album
	 * @return result
	 */
	public int albumUpdate(Album album) {
		return sqlSession.update("albumMapper.albumUpdate", album);
	}

	/** 앨범 이미지 삭제
	 * @param condition
	 * @return result
	 */
	public int albumImageDelete(String condition) {
		return sqlSession.delete("albumMapper.albumImageDelete", condition);
	}

	/** 앨범 이미지 순서 초기화
	 * @param albumNo
	 * @return result
	 */
	public int initImageOrder(int albumNo) {
		return sqlSession.update("albumMapper.initImageOrder", albumNo);
	}

	/** 게시글 스크랩
	 * @param paramMap
	 * @return result
	 */
	public int albumScrap(Album album) {
		int result = sqlSession.insert("albumMapper.albumScrap", album);
		if(result > 0) {
			result = album.getAlbumNo();
		}
		return result;
	}

	/** 앨범 이미지 스크랩
	 * @param album
	 * @return result
	 */
	public int albumImageScrap(Album album) {
		return sqlSession.insert("albumMapper.albumImageScrap", album);
	}

	/** 사진첩 이미지변경명 목록 조회
	 * @return imageList
	 */
	public List<String> selectImageList() {
		return sqlSession.selectList("albumMapper.selectImageList");
	}
}
