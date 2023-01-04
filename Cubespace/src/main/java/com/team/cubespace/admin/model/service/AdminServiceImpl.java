package com.team.cubespace.admin.model.service;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.team.cubespace.admin.model.dao.AdminDAO;
import com.team.cubespace.admin.model.vo.Block;
import com.team.cubespace.common.Pagination;
import com.team.cubespace.common.Util;
import com.team.cubespace.complain.model.vo.Complain;
import com.team.cubespace.manage.model.vo.Font;
import com.team.cubespace.manage.model.vo.Music;
import com.team.cubespace.member.model.vo.Member;

@Service
public class AdminServiceImpl implements AdminService{

	@Autowired
	private AdminDAO dao;

	/**
	 * 회원 목록 조회
	 */
	@Override
	public Map<String, Object> memberSearch(Map<String, Object> paramMap, int cp) {
		
		// 조건에 맞는 회원 수
		int listCount = dao.getMemberListCount(paramMap);
		
		// 전체 회원수 
		int allMemberCount = dao.getAllMemberCount();
		
		// 전체 회원 수 + cp를 이용해 페이징처리
		Pagination pagination = new Pagination(listCount, cp, 30, 10);
		
		// sort 값 계산
		paramMap.put("order", "MEMBER_NO DESC");
		if(paramMap.get("sort").equals("1")) { // 가입일 역순
			paramMap.put("order", "MEMBER_NO DESC");
		}
		if(paramMap.get("sort").equals("2")) { // 가입일순
			paramMap.put("order", "MEMBER_NO ASC");
		}
		if(paramMap.get("sort").equals("3")) { // 일일방문자순
			paramMap.put("order", "TODAY DESC, MEMBER_NO DESC");
		}
		if(paramMap.get("sort").equals("4")) { // 총방문자순
			paramMap.put("order", "TOTAL DESC, MEMBER_NO DESC");
		}
		
		// 조건에 맞는 회원 목록
		List<Member> memberList = dao.memberSearch(pagination, paramMap);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("memberList", memberList);
		map.put("allMemberCount", allMemberCount);
		map.put("listCount", listCount);
		
		return map;
	}

	/** 
	 * 회원 정보 삭제
	 */
	@Override
	public int deleteMember(int memberNo) {
		
		return dao.deleteMember(memberNo);
	}

	/**
	 * 회원 정보 삭제 복구
	 */
	@Override
	public int deleteMemberBack(int memberNo) {
		
		return dao.deleteMemberBack(memberNo);
	}


	
	
	/**
	 * 신고 목록 조회
	 */
	@Override
	public Map<String, Object> complainSearch(Map<String, Object> paramMap, int cp) {
		
		// 조건에 맞는 신고 수
		int listCount = dao.getComplainListCount(paramMap);
		
		// 
		int allComplainCount = dao.getAllComplainCount();
		
		// 전체 신고 수 + cp를 이용해 페이징처리
		Pagination pagination = new Pagination(listCount, cp, 30, 10);
		
		// sort 값 계산
		paramMap.put("order", "COMPLAIN_NO DESC");
		if(paramMap.get("sort").equals("1")) { // 신고일 최신순
			paramMap.put("order", "COMPLAIN_NO DESC");
		}
		if(paramMap.get("sort").equals("2")) { // 신고일 오래된순
			paramMap.put("order", "COMPLAIN_NO ASC");
		}
		
		// 조건에 맞는 신고 목록
		List<Member> complainList = dao.complainListSearch(pagination, paramMap);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("complainList", complainList);
		map.put("allComplainCount", allComplainCount);
		map.put("listCount", listCount);
		
		return map;
	}

	/**
	 * 처리 상태 변경
	 */
	@Override
	public int updateStatusToggle(Complain inputComplain) {
		
		return dao.updateStatusToggle(inputComplain);
	}

	/**
	 * 회원 차단하기
	 * @throws ParseException 
	 */
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int blockMember(Block inputBlock) throws ParseException {
		
		// 차단할 회원이 이미 차단중인지 확인
		Block isBlockMember = dao.isBlockMember(inputBlock);
		
		if(isBlockMember != null) { // 회원이 이미 차단중이면 update 진행
			
			String[] originalBlockEndArr = isBlockMember.getBlockEnd().split(" ");
			String[] updateBlockEndArr = inputBlock.getBlockEnd().split(" ");
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date originalBlockEnd = sdf.parse(originalBlockEndArr[0]);
			Date updateBlockEnd = sdf.parse(updateBlockEndArr[0]);
			
			if(originalBlockEnd.after(updateBlockEnd)) { // 원래의 차단날짜가 더 크면
				
				return 2;
				
			} else if(originalBlockEnd.equals(updateBlockEnd)){ // 두 차단날짜가 같으면 
				
				return 2;
				
			} else { //  새로 변경할 차단날짜가 더 크면
				
				return dao.updateBlockMember(inputBlock);
			}
			
		} else { // 차단중이 아니면
			
			return dao.blockMember(inputBlock);			
			
		}
	}

	/**
	 * 폰트 목록 조회
	 */
	@Override
	public Map<String, Object> fontSearch(Map<String, Object> paramMap, int cp) {
		
		// 조건에 맞는 폰트 수
		int listCount = dao.getFontListCount(paramMap);
		
		// 전체 폰트수 
		int allFontCount = dao.getAllFontCount();
		
		// 전체 폰트 수 + cp를 이용해 페이징처리
		Pagination pagination = new Pagination(listCount, cp, 30, 10);
		
		// sort 값 계산
		paramMap.put("order", "FONT_USE_COUNT DESC ,FONT_NO DESC");
		if(paramMap.get("sort") != null) {
			
			if(paramMap.get("sort").equals("1")) { // 사용횟수 많은순
				paramMap.put("order", "FONT_USE_COUNT DESC ,FONT_NO DESC");
			}
			if(paramMap.get("sort").equals("2")) { // 사용횟수 적은순
				paramMap.put("order", "FONT_USE_COUNT ASC, FONT_NO DESC");
			}
			if(paramMap.get("sort").equals("3")) { // 등록일 빠른순
				paramMap.put("order", "FONT_NO DESC");
			}
			if(paramMap.get("sort").equals("4")) { // 등록일 느린순
				paramMap.put("order", "FONT_NO ASC");
			}
		}
		
		// 조건에 맞는 폰트 목록
		List<Member> fontList = dao.fontSearch(pagination, paramMap);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("fontList", fontList);
		map.put("allFontCount", allFontCount);
		map.put("listCount", listCount);
		
		return map;
	}

	/**
	 * 새 폰트 등록
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@Override
	public int insertFont(String rename, String folderPath, Font inputFont, MultipartFile fontFile
			) throws Exception{
		
		int result = dao.insertFont(inputFont);
		
		if(result > 0) {
			fontFile.transferTo(new File(folderPath + rename));
//			result = inputFont.getFontNo();
			
		}
		
		return result;
	}

	/**
	 * 폰트 삭제
	 */
	@Override
	public int deleteFont(int fontNo) {
		
		return dao.deleteFont(fontNo);
	}

	/**
	 *  배경음악 페이지 
	 */
	@Override
	public Map<String, Object> musicSearch(Map<String, Object> paramMap, int cp) {
		
		// 조건에 맞는 음악 수
		int listCount = dao.getMusicListCount(paramMap);
		
		// 전체 음악수 
		int allMusicCount = dao.getAllMusicCount();
		
		// 전체 음악 수 + cp를 이용해 페이징처리
		Pagination pagination = new Pagination(listCount, cp, 30, 10);
		
		// sort 값 계산
		paramMap.put("order", "MUSIC_USE_COUNT DESC ,MUSIC_NO DESC");
		if(paramMap.get("sort") != null) {
			
			if(paramMap.get("sort").equals("1")) { // 사용횟수 많은순
				paramMap.put("order", "MUSIC_USE_COUNT DESC ,MUSIC_NO DESC");
			}
			if(paramMap.get("sort").equals("2")) { // 사용횟수 적은순
				paramMap.put("order", "MUSIC_USE_COUNT ASC, MUSIC_NO DESC");
			}
			if(paramMap.get("sort").equals("3")) { // 등록일 빠른순
				paramMap.put("order", "MUSIC_NO DESC");
			}
			if(paramMap.get("sort").equals("4")) { // 등록일 느린순
				paramMap.put("order", "MUSIC_NO ASC");
			}
		}
		
		// 조건에 맞는 음악 목록
		List<Member> musicList = dao.musicSearch(pagination, paramMap);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("musicList", musicList);
		map.put("allMusicCount", allMusicCount);
		map.put("listCount", listCount);
		
		return map;
	}

	/**
	 * 새 배경음악 등록
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@Override
	public int insertMusic(List<String> renameList, List<String> folderPathList, Music inputMusic, MultipartFile musicThumnailFile, MultipartFile musicPathFile) throws Exception {

		int result = dao.insertMusic(inputMusic); // result = musicNo
				
		if(result > 0) { 
			musicThumnailFile.transferTo(new File(folderPathList.get(0) + renameList.get(0))); // 썸네일
			musicPathFile.transferTo(new File(folderPathList.get(1) + renameList.get(1))); // 음악
		}
		return result;
	}
}
