package com.team.cubespace.common.scheduling;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.team.cubespace.admin.model.service.AdminService;
import com.team.cubespace.album.model.service.AlbumService;
import com.team.cubespace.video.model.service.VideoService;

@Component
public class FontMusicGoodsScheduling {
	
	@Autowired
	private AdminService service;
	
	
	@Autowired 
	private ServletContext application;
	
	@Scheduled(fixedRate = 1000 * 60 * 5)
	public void deleteFont() {
		
		// DB에서 font의 모든 이미지 변경명을 조회
		List<String> dbFontPathList = service.selectFontPathList();
		
		// Server에 저장된 모든 이미지 파일 조회
		String folderPath = application.getRealPath("/resources/font/");
		
		// 지정된 경로에 존재하는 파일 목록을 배열로 변환
		File[] arr = new File(folderPath).listFiles();
		List<File> fileList = Arrays.asList(arr);

		// 둘을 비교하여 Server이미지 목록 중 DB에 없는 이미지를 삭제
		if(!fileList.isEmpty()) {
			for(File file : fileList) {
				// 파일 이름 가져오기
				String fileName = file.getName();
				// dbImageList에 fileName이 없다면 
				// db에는 없는데 server에는 있는 파일
				if(dbFontPathList.indexOf(fileName) == -1) {
					file.delete();
					System.out.println(fileName + "삭제");
				}
			}
		}
	}
	
	
	@Scheduled(fixedRate = 1000 * 60 * 5)
	public void deleteMusic() {
		
		// DB에서 music의 모든 이미지 변경명을 조회
		List<String> dbMusicPathList = service.selectMusicPathList();
		List<String> dbMusicThumnailPathList = service.selectMusicThumnailPathList();
		
		// Server에 저장된 모든 이미지 파일 조회
		String musicFolderPath = application.getRealPath("/resources/music/");
		String thumbnailFolderPath = application.getRealPath("/resources/musicThumnail/");
		
		// 지정된 경로에 존재하는 파일 목록을 배열로 변환
		File[] musicArr = new File(musicFolderPath).listFiles();
		List<File> musicList = Arrays.asList(musicArr);

		File[] thumbnailArr = new File(thumbnailFolderPath).listFiles();
		List<File> thumbnailList = Arrays.asList(thumbnailArr);
		
		
		// 둘을 비교하여 Server이미지 목록 중 DB에 없는 이미지를 삭제
		if(!musicList.isEmpty()) {
			for(File file : musicList) {
				// 파일 이름 가져오기
				String fileName = file.getName();
				// dbImageList에 fileName이 없다면 
				// db에는 없는데 server에는 있는 파일
				if(dbMusicPathList.indexOf(fileName) == -1) {
					file.delete();
					System.out.println(fileName + "삭제");
				}
			}
		}
		if(!thumbnailList.isEmpty()) {
			for(File file : thumbnailList) {
				String fileName = file.getName();
				
				if(dbMusicThumnailPathList.indexOf(fileName) == -1) {
					file.delete();
					System.out.println(fileName + "삭제");
				}
			}
		}
	}
	
	@Scheduled(fixedRate = 1000 * 60 * 5)
	public void deleteGoods() {
		// DB에서 album의 모든 이미지 변경명을 조회
		List<String> dbGoodsList = service.selectGoodsPathList();
		
		// Server에 저장된 모든 이미지 파일 조회
		String folderPath = application.getRealPath("/resources/miniroomGoods/");
		
		// 지정된 경로에 존재하는 파일 목록을 배열로 변환
		File[] arr = new File(folderPath).listFiles();
		List<File> fileList = Arrays.asList(arr);
		
		// 둘을 비교하여 Server이미지 목록 중 DB에 없는 이미지를 삭제
		if(!fileList.isEmpty()) {
			for(File file : fileList) {
				// 파일 이름 가져오기
				String fileName = file.getName();
				// dbImageList에 fileName이 없다면 
				// db에는 없는데 server에는 있는 파일
				if(dbGoodsList.indexOf(fileName) == -1) {
					file.delete();
					System.out.println(fileName + "삭제");
				}
			}
		}
	}

}
