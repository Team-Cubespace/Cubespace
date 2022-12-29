package com.team.cubespace.album.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.team.cubespace.album.model.dao.AlbumDAO;
import com.team.cubespace.album.model.vo.Album;
import com.team.cubespace.album.model.vo.AlbumImage;
import com.team.cubespace.album.model.vo.Comment;
import com.team.cubespace.common.Pagination;
import com.team.cubespace.common.Util;

/**
 * @author Tonic
 *
 */
@Service
public class AlbumServiceImpl implements AlbumService{
	@Autowired
	private AlbumDAO dao; 
	@Autowired CommentService cService;

	// 친구 상태 확인 서비스
	@Override
	public int checkFriend(Map<String, Integer> paramMap) {
		return dao.checkFriend(paramMap);
	}

	// 앨범 목록 조회
	@Override
	public Map<String, Object> selectAlbumList(Map<String, Integer> paramMap, int cp) {
		// 특정 폴더의 앨범 게시글 갯수 구하기
		int listCount  = dao.getListCount(paramMap);
		
		// 페이징 처리 객체 생성
		Pagination pagination = new Pagination(listCount, cp, 12, 10);
		
		// 페이징 처리객체 사용하여 앨범 게시글 목록 조회
		List<Album> albumList = dao.selectAlbumList(pagination, paramMap);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("albumList", albumList);
		
		return resultMap;
	}
	
	// 앨범 상세 조회
	@Override
	public Album selectAlbum(int albumNo) {
		return dao.selectAlbum(albumNo);
	}

	// 앨범 작성 서비스
	@Transactional
	@Override
	public int albumWrite(Album album, List<MultipartFile> imageList, String webPath, String folderPath) throws IllegalStateException, IOException {
		
		// 앨범 관련 처리
		// 앨범의 내용이 비어있지 않으면
		album.setAlbumTitle(Util.XSSHandling(album.getAlbumTitle()));
		if(album.getAlbumContent() != null) {
			album.setAlbumContent(Util.XSSHandling(album.getAlbumContent()));
			album.setAlbumContent(Util.newLineHandling(album.getAlbumContent()));
		}
		
		int albumNo = dao.albumWrite(album);
		
		
		
		if(albumNo > 0) {	// 앨범 작성에 성공했으면
			// 이미지 저장
			List<AlbumImage> albumImageList = new ArrayList<>();
			
			for(int i =0; i< imageList.size(); i++) {
				if(imageList.get(i).getSize() > 0) {
					// AlbumImage 객체 생성
					AlbumImage albumImage = new AlbumImage();
					
					// 값 세팅
					// 이미지 순서
					albumImage.setImageOrder(i);
					// 웹 경로
					albumImage.setImagePath(webPath);
					// 파일 원본명
					albumImage.setImageOriginalName(imageList.get(i).getOriginalFilename());
					// 변경된 파일명
					albumImage.setImageRename(Util.fileRename(imageList.get(i).getOriginalFilename()));
					// 작성된 앨범 번호
					albumImage.setAlbumNo(albumNo);
					
					// 리스트에 추가
					albumImageList.add(albumImage);					
				}
			}
			// 업로드한 이미지가 있으면
			if(!albumImageList.isEmpty()) {
				// DB에 파일정보 업로드
				int result = dao.insertAlbumImageList(albumImageList);
				
				// 삽입 결과 행의 수 == 이미지 리스트의 크기
				// 전부다 삽입된 경우
				if(result == albumImageList.size()) {
					
					// 파일 변환 작업
					for(int i =0; i<albumImageList.size(); i++) {
						// 순서 == imageList의 인덱스
						int index = albumImageList.get(i).getImageOrder();
						
						// 실제 파일로 변환
						imageList.get(index).transferTo(new File(folderPath + albumImageList.get(i).getImageRename()));
					}
				}
			}
		}
		
		return albumNo;
	}

	@Override
	public int albumDelete(int albumNo) {
		return dao.albumDelete(albumNo);
	}

	
	// 앨범 수정
	@Transactional
	@Override
	public int albumUpdate(Album album, String webPath, String folderPath, List<MultipartFile> imageList,
			List<String> deleteImageList, int prevLength) throws IllegalStateException, IOException {
		
		album.setAlbumTitle(Util.XSSHandling(album.getAlbumTitle()));
		if(album.getAlbumContent() != null) {
			album.setAlbumContent(Util.XSSHandling(album.getAlbumContent()));
			album.setAlbumContent(Util.newLineHandling(album.getAlbumContent()));
		}
		
		// 앨범 글 수정(이미지 x)
		int result = dao.albumUpdate(album);
		// 삭제할 이미지 리스트의 길이
		int deleteImageLength = 0;
		
		if(result > 0) {	// 수정 된 경우
			if(!deleteImageList.isEmpty()) {	// 삭제된 이미지가 있을 경우
				// 삭제한 이미지 길이
				deleteImageLength = deleteImageList.size();
				
				String deleteImageStr = String.join(",", deleteImageList);
				
				String condition = "WHERE ALBUM_NO = " + album.getAlbumNo()
									+ " AND IMG_ORDER IN (" + deleteImageStr + ")";
				
				result = dao.albumImageDelete(condition);
				
				System.out.println(result);
				if(result == 0) {
					// 예외 발생
				} else {
					// 이미지 순서 초기화
					result = dao.initImageOrder(album.getAlbumNo());
				}
			}
			
			if(result == prevLength - deleteImageLength) {
				// 새로운 이미지 추가
			} else {
				// 예외 발생
			}
			
			if(imageList != null) {	// 새롭게 추가된 이미지가 있으면
				int startImageOrder = prevLength - deleteImageLength;
				List<AlbumImage> albumImageList = new ArrayList<>();
				for(int i =0; i< imageList.size(); i++) {
					if(imageList.get(i).getSize() > 0) {
						// AlbumImage 객체 생성
						AlbumImage albumImage = new AlbumImage();
						
						// 값 세팅
						// 이미지 순서
						albumImage.setImageOrder(i + startImageOrder);
						// 웹 경로
						albumImage.setImagePath(webPath);
						// 파일 원본명
						albumImage.setImageOriginalName(imageList.get(i).getOriginalFilename());
						// 변경된 파일명
						albumImage.setImageRename(Util.fileRename(imageList.get(i).getOriginalFilename()));
						// 작성된 앨범 번호
						albumImage.setAlbumNo(album.getAlbumNo());
						
						// 리스트에 추가
						albumImageList.add(albumImage);			
					}
				}
				
				// 업로드한 이미지가 있으면
				if(!albumImageList.isEmpty()) {
					// DB에 파일정보 업로드
					result = dao.insertAlbumImageList(albumImageList);
					
					// 삽입 결과 행의 수 == 이미지 리스트의 크기
					// 전부다 삽입된 경우
					if(result == albumImageList.size()) {
						
						// 파일 변환 작업
						for(int i =0; i<albumImageList.size(); i++) {
							// 순서 == imageList의 인덱스
							int index = albumImageList.get(i).getImageOrder() - startImageOrder;
							
							// 실제 파일로 변환
							imageList.get(index).transferTo(new File(folderPath + albumImageList.get(i).getImageRename()));
						}
					}
				}
			}
		}
		return result;
	}

	// 게시글 스크랩
	@Transactional
	@Override
	public int albumScrap(Album album, Comment comment) {
		
		// 게시글 스크랩 dao 호출
		int result = dao.albumScrap(album);
		// 게시글이 스크랩 되고 흔적남기기 값이 비어있지 않을 때
		if(result > 0) {	// 게시글 스크랩 성공 시
			// 이미지 정보 복사해오기
			result = dao.albumImageScrap(album);
			
			if(result > 0 && comment.getCommentContent() != null) {	// 댓글 작성 시
				comment.setCommentContent(Util.XSSHandling(comment.getCommentContent()));
				comment.setCommentContent(Util.newLineHandling(comment.getCommentContent()));
				result = cService.insertComment(comment);
			} else {
				// 예외 발생 시켜 롤백
			}
		}
		return result;
	}
}
