package com.team.cubespace.album.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.team.cubespace.album.model.vo.Album;

/**
 * @author Tonic
 *
 */
public interface AlbumService {


	/** 친구 상태 확인 서비스
	 * @param paramMap
	 * @return result
	 */
	public int checkFriend(Map<String, Integer> paramMap);

	/** 앨범 목록 조회
	 * @param paramMap
	 * @param cp
	 * @return albumList
	 */
	public Map<String, Object> selectAlbumList(Map<String, Integer> paramMap, int cp);

	/** 앨범 상세 조회
	 * @param albumNo
	 * @return album
	 */
	public Album selectAlbum(int albumNo);

	/** 앨범 작성 서비스
	 * @param album
	 * @param imageList
	 * @param webPath
	 * @param folderPath
	 * @return albumNo
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	public int albumWrite(Album album, List<MultipartFile> imageList, String webPath, String folderPath) throws IllegalStateException, IOException;

	/** 앨범 삭제
	 * @param albumNo
	 * @return result
	 */
	public int albumDelete(int albumNo);

}
