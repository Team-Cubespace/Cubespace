package com.team.cubespace.miniroom.model.service;

import java.io.IOException;
import java.util.List;

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
	 * @return minimeeList
	 */
	List<Minimee> minimeeList();

	/**
	 * 소유한 소품 목록 조회
	 * @param memberNo
	 * @return goodsList
	 */
	List<ShopMiniroom> goodsList(int memberNo);

	int props(int memberNo, String[] props);

	int updateRoom(String webPath1, String filePath1, String webPath2, String filePath2,
				   String wallColor, MultipartFile wallImage, String floorColor, MultipartFile floorImage,
				   int wallPattern, int floorPattern, String wallFlag, String floorFlag, Miniroom miniroom) throws Exception;

}