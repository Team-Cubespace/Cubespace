package com.team.cubespace.manage.model.service;

import java.util.List;

import com.team.cubespace.manage.model.vo.CategoryOrder;
import com.team.cubespace.manage.model.vo.Folder;

public interface ManageService {

	/** 폴더 리스트 조회
	 * @param memberNo
	 * @return folderList
	 */
	List<Folder> getFolderList(int memberNo);

	/** 카테고리 순서 조회
	 * @param memberNo
	 * @return categoryOrder
	 */
	CategoryOrder getCategoryOrder(int memberNo);

}
