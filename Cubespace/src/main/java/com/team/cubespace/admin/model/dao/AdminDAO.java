package com.team.cubespace.admin.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team.cubespace.admin.model.vo.Block;
import com.team.cubespace.common.Pagination;
import com.team.cubespace.complain.model.vo.Complain;
import com.team.cubespace.main.model.vo.ShopMiniroom;
import com.team.cubespace.manage.model.vo.Font;
import com.team.cubespace.manage.model.vo.Music;
import com.team.cubespace.member.model.vo.Member;

@Repository
public class AdminDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 특정 조건 회원수 조회
	 * @param paramMap
	 * @return listCount
	 */
	public int getMemberListCount(Map<String, Object> paramMap) {
		
		return sqlSession.selectOne("loginMapper.getMemberListCount", paramMap);
	}

	/** 전체 회원수 조회
	 * @return allMemberCount
	 */
	public int getAllMemberCount() {
		
		return sqlSession.selectOne("loginMapper.getAllMemberCount");
	}

	/** 조건에 맞는 회원 목록
	 * @param pagination
	 * @param paramMap
	 * @return memberList
	 */
	public List<Member> memberSearch(Pagination pagination, Map<String, Object> paramMap) {
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		
		return sqlSession.selectList("loginMapper.memberSearch", paramMap, rowBounds);
	}

	/** 회원 정보 삭제
	 * @param memberNo
	 * @return
	 */
	public int deleteMember(int memberNo) {
		
		return sqlSession.update("loginMapper.secessionDelete", memberNo);
	}

	/** 회원 정보 삭제 복구
	 * @param memberNo
	 * @return
	 */
	public int deleteMemberBack(int memberNo) {
		
		return sqlSession.update("loginMapper.deleteMemberBack", memberNo);
	}

	/** 조건에 맞는 신고 수
	 * @param paramMap
	 * @return
	 */
	public int getComplainListCount(Map<String, Object> paramMap) {
		
		return sqlSession.selectOne("complainMapper.getComplainListCount", paramMap);
	}

	/** 전체 신고수 
	 * @return
	 */
	public int getAllComplainCount() {
		
		return sqlSession.selectOne("complainMapper.getAllComplainCount");
	}

	/** 조건에 맞는 신고 목록
	 * @param pagination
	 * @param paramMap
	 * @return
	 */
	public List<Member> complainListSearch(Pagination pagination, Map<String, Object> paramMap) {

		int offset = (pagination.getCurrentPage() -1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return  sqlSession.selectList("complainMapper.complainListSearch", paramMap, rowBounds);
	}

	/** 처리 상태 변경
	 * @param inputComplain
	 * @return
	 */
	public int updateStatusToggle(Complain inputComplain) {
		
		return sqlSession.update("complainMapper.updateStatusToggle", inputComplain);
	}

	/** 회원 차단하기
	 * @param inputBlock
	 * @return
	 */
	public int blockMember(Block inputBlock) {
		
		return sqlSession.insert("adminMapper.blockMember", inputBlock);
	}

	/** 차단할 회원이 이미 차단중인지 확인
	 * @param inputBlock
	 * @return
	 */
	public Block isBlockMember(Block inputBlock) {
		
		return sqlSession.selectOne("adminMapper.isBlockMember", inputBlock);
	}

	/** 이미 차단중인 회원 추가로 차단하기
	 * @param inputBlock
	 * @return
	 */
	public int updateBlockMember(Block inputBlock) {
		
		return sqlSession.update("adminMapper.updateBlockMember", inputBlock);
	}

	/** 조건에 맞는 폰트 수 
	 * @param paramMap
	 * @return
	 */
	public int getFontListCount(Map<String, Object> paramMap) {
		
		return sqlSession.selectOne("adminMapper.getFontListCount", paramMap);
	}

	/** 전체 폰트수
	 * @return
	 */
	public int getAllFontCount() {
		
		return sqlSession.selectOne("adminMapper.getAllFontCount");
	}

	/** 조건에 맞는 폰트 리스트
	 * @param pagination
	 * @param paramMap
	 * @return
	 */
	public List<Member> fontSearch(Pagination pagination, Map<String, Object> paramMap) {

		int offset = (pagination.getCurrentPage() -1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return  sqlSession.selectList("adminMapper.fontSearch", paramMap, rowBounds);

	}

	/** 새 폰트 등록
	 * @param inputFont
	 * @return
	 */
	public int insertFont(Font inputFont) {
		
		return sqlSession.insert("adminMapper.insertFont", inputFont);
	}

	/** 폰트 삭제
	 * @param fontNo
	 * @return
	 */
	public int deleteFont(int fontNo) {
		
		return sqlSession.delete("adminMapper.deleteFont", fontNo);
	}

	/** 조건에 맞는 음악 수
	 * @param paramMap
	 * @return
	 */
	public int getMusicListCount(Map<String, Object> paramMap) {

		return sqlSession.selectOne("adminMapper.getMusicListCount", paramMap);
	}

	/** 전체 음악수 
	 * @return
	 */
	public int getAllMusicCount() {

		return sqlSession.selectOne("adminMapper.getAllMusicCount");
	}

	/** 조건에 맞는 음악 목록
	 * @param pagination
	 * @param paramMap
	 * @return
	 */
	public List<Member> musicSearch(Pagination pagination, Map<String, Object> paramMap) {

		int offset = (pagination.getCurrentPage() -1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return  sqlSession.selectList("adminMapper.musicSearch", paramMap, rowBounds);
	}

	/** 내 배경음악 등록
	 * @param inputMusic
	 * @return
	 */
	public int insertMusic(Music inputMusic) {
		
		return sqlSession.insert("adminMapper.insertMusic", inputMusic);
	}

	/** 배경음악 삭제
	 * @param musicNo
	 * @return
	 */
	public int deleteMusic(int musicNo) {
		
		return sqlSession.delete("adminMapper.deleteMusic", musicNo);
	}

	/** 조건에 맞는 소품 수
	 * @param paramMap
	 * @return
	 */
	public int getGoodsListCount(Map<String, Object> paramMap) {

		return sqlSession.selectOne("adminMapper.getGoodsListCount", paramMap);
	}

	/** 전체 소품수 
	 * @return
	 */
	public int getAllGoodsCount() {

		return sqlSession.selectOne("adminMapper.getAllGoodsCount");
	}

	/** 조건에 맞는 음악 목록
	 * @param pagination
	 * @param paramMap
	 * @return
	 */
	public List<ShopMiniroom> goodsSearch(Pagination pagination, Map<String, Object> paramMap) {

		int offset = (pagination.getCurrentPage() -1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return  sqlSession.selectList("adminMapper.goodsSearch", paramMap, rowBounds);
	}

	/** 새 소품 등록
	 * @param inputGoods
	 * @return
	 */
	public int insertGoods(ShopMiniroom inputGoods) {

		return sqlSession.insert("adminMapper.insertGoods", inputGoods);
	}

	/** 소품 삭제
	 * @param goodsNo
	 * @return
	 */
	public int deleteGoods(int goodsNo) {
		
		return sqlSession.delete("adminMapper.deleteGoods", goodsNo);
	}

	/** font의 모든 이미지 변경명을 조회
	 * @return
	 */
	public List<String> selectFontPathList() {
		
		return sqlSession.selectList("adminMapper.selectFontPathList");
	}

	/** music의 모든 변경명 조회
	 * @return
	 */
	public List<String> selectMusicPathList() {

		return sqlSession.selectList("adminMapper.selectMusicPathList");
	}

	/** musicThumnail의 모든 변경명 조회
	 * @return
	 */
	public List<String> selectMusicThumnailPathList() {

		return sqlSession.selectList("adminMapper.selectMusicThumnailPathList");
	}

	/** goods의 모든 변경명 조회
	 * @return
	 */
	public List<String> selectGoodsPathList() {
		
		return sqlSession.selectList("adminMapper.selectGoodsPathList");

	}

	
}
