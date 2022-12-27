package com.team.cubespace.folder.model.service;

import java.util.List;
import java.util.Map;

import com.team.cubespace.folder.model.vo.Folder;

/**
 * @author Tonic
 * 
 */
public interface FolderService {
	
	/** 폴더 목록 조회
	 * @param paramMap
	 * @return folderList
	 */
	public List<Folder> selectFolderList(Map<String, Integer> paramMap);
}
