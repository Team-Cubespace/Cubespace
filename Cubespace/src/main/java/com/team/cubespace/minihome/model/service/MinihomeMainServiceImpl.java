package com.team.cubespace.minihome.model.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.team.cubespace.common.Util;
import com.team.cubespace.member.model.vo.Member;
import com.team.cubespace.minihome.model.dao.MinihomeMainDAO;
import com.team.cubespace.minihome.model.vo.FriendMessage;
import com.team.cubespace.minihome.model.vo.NewPost;

/**
 * @author HJ
 */
@Service
public class MinihomeMainServiceImpl implements MinihomeMainService{
	@Autowired
	private MinihomeMainDAO dao;

	// 프로필 + 깐부 목록 조회
	@Override
	public Map<String, Object> profile(int memberNo) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		Member profile = dao.selectProfile(memberNo);
		List<Member> friendList = dao.selectFriendList(memberNo);
		
		map.put("profile", profile);
		map.put("friendList", friendList);
		
		return map;
	}

	// 최근 게시물 조회
	@Override
	public List<NewPost> newPost(Map<String, Integer> paramMap) {
		int friendFlag = dao.selectFriendFlag(paramMap);
		
		paramMap.put("friendFlag", friendFlag);
		
		return dao.selectNewPost(paramMap);
	}
	
	// 깐부 메시지 조회
	@Override
	public List<FriendMessage> friendMessage(int memberNo) {
		return dao.selectFriendMessage(memberNo);
	}

	// 기분 변경
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int emotion(Map<String, Object> paramMap) {
		return dao.updateEmotion(paramMap);
	}

	// 프로필 수정
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int updateProfile(String webPath, String filePath, MultipartFile profileImage, Member loginMember) throws Exception {
		// 실패를 대비해서 이전 이미지 경로 저장
        String temp = loginMember.getProfileImage();
        
        // 중복 파일명 업로드를 대비하기 위해서 파일명 변경
        String rename = null;
        
        // 업로드된 파일이 없는 경우
        if(profileImage.getSize() == 0) {
            loginMember.setProfileImage(null);
            
        // 업로드된 파일이 있을 경우
        }else {
            
        // 원본파일명을 이용해서 새로운 파일명 생성
        rename = Util.fileRename(profileImage.getOriginalFilename());
        loginMember.setProfileImage(webPath + rename);
        }
        
		int result = dao.updateProfileImage(loginMember);
        
        if(result > 0) {
        	// 변경된 이미지명이 존재 == 새로운 파일 업로드
            if(rename != null) {
            	// 메모리에 임시 저장된 파일을 지정된 경로에 파일 형태로 변환
                profileImage.transferTo(new File(filePath + rename));
            }
            
            result = dao.updateComment(loginMember);
            
        }else {
            // 실패 시 다시 이전 이미지를 세팅
            loginMember.setProfileImage(temp);
            throw new Exception(); 
        }
        
        return result;
	}
}