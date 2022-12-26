package com.team.cubespace.manage.model.service;

import java.util.List;
import java.util.Map;

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

	/** 카테고리 순서 변경
	 * @param memberNo
	 * @return result
	 */
	int changeCategory(int memberNo);

	/** 카테고리 종류 원래대로
	 * @return result
	 */
	int categorySelectCancel(int memberNo);

	/** 내 친구 목록 조회
	 * @param memberNo
	 * @return
	 */
	List<Map<String, String>> getFriendList(Map<String, Object> paramMap);

	/** 깐부끊기
	 * @param paramMap
	 * @return result
	 */
	int deleteFriend(Map<String, Object> paramMap);

}
