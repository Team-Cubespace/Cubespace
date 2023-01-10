package com.team.cubespace.miniroom.model.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.team.cubespace.common.Pagination;
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
	public Map<String, Object> minimeeList(int cp) {
        // 1. 특정 게시판의 전체 게시글 수 조회(단, 삭제 제외)
        int listCount = dao.minimeeCount();
        
        // 2. 전체 게시글 수 + cp(현재 페이지)를 이용해서 페이징 처리 객체 생성
        Pagination pagination = new Pagination(listCount, cp);
        
        // 3. 페이징 처리 객체를 이용해서 게시글 목록 조회
		List<Minimee> minimeeList = dao.selectMinimeeList(pagination);
		
		Map<String, Object> map = new HashMap<String, Object>();
        map.put("pagination", pagination);
        map.put("minimeeList", minimeeList);
		
		return map;
	}

	// 소유한 소품 목록 조회
	@Override
	public Map<String, Object> goodsList(int memberNo, int cp) {
        // 1. 특정 게시판의 전체 게시글 수 조회(단, 삭제 제외)
        int listCount = dao.goodsListCount(memberNo);
        
        // 2. 전체 게시글 수 + cp(현재 페이지)를 이용해서 페이징 처리 객체 생성
        Pagination pagination = new Pagination(listCount, cp);
        
        // 3. 페이징 처리 객체를 이용해서 게시글 목록 조회
		List<ShopMiniroom> goodsList = dao.selectGoodsList(pagination, memberNo);
		
		Map<String, Object> map = new HashMap<String, Object>();
        map.put("pagination", pagination);
        map.put("goodsList", goodsList);
		
		return map;
	}
	
	// 소품 삭제
	@Override
	public int deleteGoods(Map<String, Object> paramMap) {
		return dao.deleteGoods(paramMap);
	}

	// 미니미, 소품 좌표 저장
	@Transactional(rollbackFor = Exception.class)
	@Override
	public void props(int memberNo, String[] props) {
		// 기존의 소품 좌표 모두 삭제
		dao.deleteProps(memberNo);
		
		if(props != null) {
			// parameter를 담을 객체, 배열 생성;
			MiniroomPlace miniroomPlace = new MiniroomPlace();
			miniroomPlace.setMemberNo(memberNo);
			String[] propsArr;
			
			// 소품의 수 만큼 insert
			for(int i = 0; i < props.length; i++) {
				propsArr = props[i].split(("-"));
				
				miniroomPlace.setLocationNo(Integer.parseInt(propsArr[0]));
				miniroomPlace.setShopCathNo(Integer.parseInt(propsArr[1]));
				miniroomPlace.setGoodsNo(Integer.parseInt(propsArr[2]));
				
				dao.insertProps(miniroomPlace);
			}
		}
	}

	// 벽지, 바닥 저장
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateRoom(String webPath1, String filePath1, String webPath2, String filePath2,
						  String wallColor, MultipartFile wallImage, String floorColor, MultipartFile floorImage,
						  int wallPattern, int floorPattern, String wallFlag, String floorFlag, Miniroom miniroom) throws Exception {
		String rename1 = null;
		String rename2 = null;
		
		// 벽지, 바닥의 이미지 존재 여부에 따라서 값 세팅
		if(wallImage.getSize() == 0) {
			miniroom.setWall(wallColor);
		} else {
			rename1 = Util.fileRename(wallImage.getOriginalFilename());
			miniroom.setWall(webPath1 + rename1);
		}
		
		if(floorImage.getSize() == 0) {
			miniroom.setFloor(floorColor);
		} else {
			rename2 = Util.fileRename(floorImage.getOriginalFilename());
			miniroom.setFloor(webPath2 + rename2);
		}
		
		// miniroom 객체에 값 세팅
		miniroom.setWallPattern(wallPattern);
		miniroom.setFloorPattern(floorPattern);
		miniroom.setWallFlag(wallFlag);
		miniroom.setFloorFlag(floorFlag);
		
		int result = dao.updateRoom(miniroom);
		
		// dao 정상수행 후 rename이 null이 아닐 경우 서버에 이미지 파일 저장
		if(result > 0) {
			if(rename1 != null) {wallImage.transferTo(new File(filePath1 + rename1));}
			if(rename2 != null) {floorImage.transferTo(new File(filePath2 + rename2));}
			
		} else {throw new Exception();}

		return result;
	}
}