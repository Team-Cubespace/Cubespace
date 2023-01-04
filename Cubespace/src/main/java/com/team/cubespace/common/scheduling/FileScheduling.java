package com.team.cubespace.common.scheduling;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.team.cubespace.album.model.service.AlbumService;
import com.team.cubespace.video.model.service.VideoService;

@Component
public class FileScheduling {
	@Autowired
	private AlbumService aService;
	
	@Autowired
	private VideoService vService;
	
	@Autowired 
	private ServletContext application;
	
	@Scheduled(fixedRate = 1000 * 60 * 5)
	public void deleteAlbumImage() {
		// DB에서 album의 모든 이미지 변경명을 조회
		List<String> dbImageList = aService.selectImageList();
		
		// Server에 저장된 모든 이미지 파일 조회
		String folderPath = application.getRealPath("/resources/images/album");
		
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
				if(dbImageList.indexOf(fileName) == -1) {
					file.delete();
					System.out.println(fileName + "삭제");
				}
			}
		}
	}
	@Scheduled(fixedRate = 1000 * 60 * 5)
	public void deleteVideo() {
		// DB에서 album의 모든 이미지 변경명을 조회
		List<String> dbVideoList = vService.selectVideoList();
		
		// Server에 저장된 모든 이미지 파일 조회
		String videoFolderPath = application.getRealPath("/resources/video/");
		String thumbnailFolderPath = application.getRealPath("/resources/videothumbnail/");
		
		// 지정된 경로에 존재하는 파일 목록을 배열로 변환
		File[] videoArr = new File(videoFolderPath).listFiles();
		List<File> videoList = Arrays.asList(videoArr);

		File[] thumbnailArr = new File(thumbnailFolderPath).listFiles();
		List<File> thumbnailList = Arrays.asList(thumbnailArr);
		
		
		// 둘을 비교하여 Server이미지 목록 중 DB에 없는 이미지를 삭제
		if(!videoList.isEmpty()) {
			for(File file : videoList) {
				// 파일 이름 가져오기
				String fileName = file.getName();
				// dbImageList에 fileName이 없다면 
				// db에는 없는데 server에는 있는 파일
				if(dbVideoList.indexOf(fileName) == -1) {
					file.delete();
					System.out.println(fileName + "삭제");
				}
			}
		}
		if(!thumbnailList.isEmpty()) {
			for(File file : thumbnailList) {
				String tempName = file.getName();
				String fileName = tempName.substring(0, tempName.lastIndexOf(".")) + ".mp4";
				System.out.println(fileName);
				
				if(dbVideoList.indexOf(fileName) == -1) {
					file.delete();
					System.out.println(fileName + "삭제");
				}
			}
		}
	}
}
