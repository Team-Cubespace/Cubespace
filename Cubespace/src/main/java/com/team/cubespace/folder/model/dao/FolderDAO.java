package com.team.cubespace.folder.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.folder.model.vo.Folder;

@Repository
public class FolderDAO {
	@Autowired
	SqlSessionTemplate sqlSession;
	
	/** 폴더 목록 조회
	 * @param paramMap
	 * @return folderList
	 */
	public List<Folder> selectFolderList(Map<String, Integer> paramMap) {
		return sqlSession.selectList("albumMapper.selectFolderList", paramMap);
	}
}
