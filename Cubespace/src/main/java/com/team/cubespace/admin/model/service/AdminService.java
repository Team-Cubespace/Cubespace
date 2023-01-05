package com.team.cubespace.admin.model.service;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.team.cubespace.admin.model.vo.Block;
import com.team.cubespace.complain.model.vo.Complain;
import com.team.cubespace.manage.model.vo.Font;
import com.team.cubespace.manage.model.vo.Music;
import com.team.cubespace.member.model.vo.Member;

public interface AdminService {

	/** 회원 목록 조회
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> memberSearch(Map<String, Object> paramMap, int cp);

	/** 회원 정보 삭제
	 * @param memberNo
	 * @return
	 */
	int deleteMember(int memberNo);

	/** 회원 정보 삭제 복구
	 * @param memberNo
	 * @return
	 */
	int deleteMemberBack(int memberNo);


	/** 신고 목록 조회
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> complainSearch(Map<String, Object> paramMap, int cp);

	/** 처리 상태 변경
	 * @param inputComplain
	 * @return
	 */
	int updateStatusToggle(Complain inputComplain);

	/** 회원 차단하기
	 * @param block
	 * @return
	 * @throws ParseException 
	 */
	int blockMember(Block inputBlock) throws ParseException;

	/** 폰트 목록 조회
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> fontSearch(Map<String, Object> paramMap, int cp);

	
	/** 새 폰트 등록
	 * @param webPath
	 * @param folderPath
	 * @param inputFont
	 * @param fontPath
	 * @return
	 * @throws Exception 
	 */
	int insertFont(String rename, String folderPath, Font inputFont, MultipartFile fontFile) throws Exception;

	/** 폰트 삭제
	 * @param fontNo
	 * @return
	 */
	int deleteFont(int fontNo);

	/**  배경음악 페이지 
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> musicSearch(Map<String, Object> paramMap, int cp);

	/** 새 배경음악 등록
	 * @param renameList
	 * @param folderPathList
	 * @param inputMusic
	 * @param musicFileList
	 * @return
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	int insertMusic(List<String> renameList, List<String> folderPathList, Music inputMusic, MultipartFile musicThumnailFile, MultipartFile musicPathFile) throws Exception;

	/** 배경음악 삭제
	 * @param musicNo
	 * @return
	 */
	int deleteMusic(int musicNo);

}
