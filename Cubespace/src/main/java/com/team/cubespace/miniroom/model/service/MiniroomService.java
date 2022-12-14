package com.team.cubespace.miniroom.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.team.cubespace.main.model.vo.ShopMiniroom;
import com.team.cubespace.miniroom.model.vo.Minimee;
import com.team.cubespace.miniroom.model.vo.Miniroom;
import com.team.cubespace.miniroom.model.vo.MiniroomPlace;

/**
 * @author HJ
 */
public interface MiniroomService {

	/**
	 * 미니룸 벽지, 바닥 조회
	 * @param memberNo
	 * @return room
	 */
	Miniroom room(int memberNo);

	/**
	 * 배치된 소품 좌표 조회
	 * @param memberNo
	 * @return placeList
	 */
	List<MiniroomPlace> placeList(int memberNo);

	/**
	 * 미니미 목록 조회
	 * @return map
	 */
	Map<String, Object> minimeeList(int cp);

	/**
	 * 소유한 소품 목록 조회
	 * @param memberNo
	 * @return map
	 */
	Map<String, Object> goodsList(int memberNo, int cp);

	/**
	 * 소품 삭제
	 * @param paramMap
	 * @return result
	 */
	int deleteGoods(Map<String, Object> paramMap);
	
	/**
	 * 미니미, 소품 좌표 저장
	 * @param memberNo
	 * @param props
	 */
	void props(int memberNo, String[] props);

	/**
	 * 벽지, 바닥 저장
	 * @param webPath1
	 * @param filePath1
	 * @param webPath2
	 * @param filePath2
	 * @param wallColor
	 * @param wallImage
	 * @param floorColor
	 * @param floorImage
	 * @param wallPattern
	 * @param floorPattern
	 * @param wallFlag
	 * @param floorFlag
	 * @param miniroom
	 * @return result
	 * @throws Exception
	 */
	int updateRoom(String webPath1, String filePath1, String webPath2, String filePath2,
				   String wallColor, MultipartFile wallImage, String floorColor, MultipartFile floorImage,
				   int wallPattern, int floorPattern, String wallFlag, String floorFlag, Miniroom miniroom) throws Exception;
}