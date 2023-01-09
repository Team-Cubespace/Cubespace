package com.team.cubespace.miniroom.model.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.team.cubespace.common.Util;
import com.team.cubespace.main.model.vo.ShopMiniroom;
import com.team.cubespace.miniroom.model.dao.MiniroomDAO;
import com.team.cubespace.miniroom.model.vo.Minimee;
import com.team.cubespace.miniroom.model.vo.Miniroom;
import com.team.cubespace.miniroom.model.vo.MiniroomPlace;

/**
 * @author HJ
 */
@Service
public class MiniroomServiceImpl implements MiniroomService {
	@Autowired
	private MiniroomDAO dao;

	// 미니룸 벽지, 바닥 조회
	@Override
	public Miniroom room(int memberNo) {
		Miniroom room = dao.selectRoom(memberNo);
		return room;
	}

	// 배치된 소품 좌표 조회
	@Override
	public List<MiniroomPlace> placeList(int memberNo) {
		List<MiniroomPlace> placeList = dao.selectPlaceList(memberNo);
		return placeList;
	}

	// 미니미 목록 조회
	@Override
	public List<Minimee> minimeeList() {
		List<Minimee> minimeeList = dao.selectMinimeeList();
		return minimeeList;
	}

	// 소유한 소품 목록 조회
	@Override
	public List<ShopMiniroom> goodsList(int memberNo) {
		List<ShopMiniroom> goodsList = dao.selectGoodsList(memberNo);
		return goodsList;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int props(int memberNo, String[] props) {
		int result = 0;
		
		result = dao.deleteprops(memberNo);
		
		MiniroomPlace miniroomPlace = new MiniroomPlace();
		String[] pArr;
		
		for(int i=0; i < props.length; i++) {
			miniroomPlace.setMemberNo(memberNo);
			pArr = props[i].split(("-"));
			miniroomPlace.setLocationNo(Integer.parseInt(pArr[0]));
			miniroomPlace.setShopCathNo(Integer.parseInt(pArr[1]));
			miniroomPlace.setGoodsNo(Integer.parseInt(pArr[2]));
			
			result = dao.insertprops(miniroomPlace);
		}
		
		return result;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateRoom(String webPath1, String filePath1, String webPath2, String filePath2, String wallColor, MultipartFile wallImage,
			String floorColor, MultipartFile floorImage, int wallPattern, int floorPattern, String wallFlag,
			String floorFlag, Miniroom miniroom) throws Exception {
		
		int result = 0;

		String rename1 = null;
		String rename2 = null;
		
		if(wallImage.getSize() == 0) {
			miniroom.setWall(wallColor);
		}else {
			rename1 = Util.fileRename(wallImage.getOriginalFilename());
			miniroom.setWall(webPath1 + rename1);
		}
		
		if(wallImage.getSize() == 0) {
			miniroom.setFloor(floorColor);
		}else {
			rename2 = Util.fileRename(floorImage.getOriginalFilename());
			miniroom.setFloor(webPath2 + rename2);
		}
		
		miniroom.setWallPattern(wallPattern);
		miniroom.setFloorPattern(floorPattern);
				
		result = dao.updateRoom(miniroom);
				
		if(result > 0) {
			if(rename1 != null) {
				wallImage.transferTo(new File(filePath1 + rename1));
			}
			if(rename1 != null) {
				wallImage.transferTo(new File(filePath2 + rename2));
			}
			
		}else {
			throw new Exception(); 
		}			

		return result;
	}
}