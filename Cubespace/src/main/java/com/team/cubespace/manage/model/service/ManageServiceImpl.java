package com.team.cubespace.manage.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.manage.model.dao.ManageDAO;
import com.team.cubespace.manage.model.vo.CategoryOrder;
import com.team.cubespace.manage.model.vo.Folder;

@Service
public class ManageServiceImpl implements ManageService{
	
	@Autowired
	private ManageDAO dao;

	/**
	 * 폴더 리스트 조회
	 */
	@Override
	public List<Folder> getFolderList(int memberNo) {
		
		return dao.getFolderList(memberNo);
	}

	/**
	 * 카테고리 순서 조회
	 */
	@Override
	public CategoryOrder getCategoryOrder(int memberNo) {
		
		return dao.getCategoryOrder(memberNo);
	}

}
