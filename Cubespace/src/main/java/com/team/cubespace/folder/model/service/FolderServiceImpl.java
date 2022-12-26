package com.team.cubespace.folder.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.folder.model.dao.FolderDAO;
import com.team.cubespace.folder.model.vo.Folder;

/**
 * @author Tonic
 *
 */
@Service
public class FolderServiceImpl implements FolderService{
	@Autowired
	private FolderDAO dao;

	@Override
	public List<Folder> selectFolderList(Map<String, Integer> paramMap) {
		return dao.selectFolderList(paramMap);
	}
	
	
}
