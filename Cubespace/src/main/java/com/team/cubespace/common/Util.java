package com.team.cubespace.common;

import java.io.File;
import java.text.SimpleDateFormat;

import javax.mail.Multipart;

import org.springframework.web.multipart.MultipartFile;

import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;

public class Util {
	
	// 파일명 변경 메소드
	public static String fileRename(String originFileName) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		String date = sdf.format(new java.util.Date(System.currentTimeMillis()));
		
		int ranNum = (int) (Math.random() * 100000); // 5자리 랜덤 숫자 생성
		
		String str = "_" + String.format("%05d", ranNum);
		
		String ext = originFileName.substring(originFileName.lastIndexOf("."));
		
		return date + str + ext;
	}
	// XSS 방지 처리 : HTML에서 해석되는 문자를 단순 글자로 변경
	public static String XSSHandling(String content) {
		
		if(content != null) {
			content = content.replaceAll("&", "&amp;");
			content = content.replaceAll("<", "&lt;");
			content = content.replaceAll(">", "&gt;");
			content = content.replaceAll("\"", "&quot;");
		}
		
		return content; 
	}	
	
	// 개행문자 처리 : \r\n, \n, \r, \n\r -> <br> 로 변경
	public static String newLineHandling(String content) {
		return content.replaceAll("(\r\n|\n|\r|\n\r)", "<br>").replaceAll(" ", "&nbsp;");
	}
	
	public static String newLineClear(String content) {
		return content.replaceAll("<br>", "\n");
	}
	
	public static void uploadVideo(String ffmpegPath, String videoFolderPath, String tempVideoName, String videoName, 
								String thumbnailFolderPath, String thumbnailName, MultipartFile inputVideo) throws Exception {
		
		File tempFile = new File(videoFolderPath + tempVideoName);
		inputVideo.transferTo(tempFile);
		
		FFmpeg ffmpeg = new FFmpeg(ffmpegPath+ "/ffmpeg");
		FFprobe ffprobe = new FFprobe(ffmpegPath + "/ffprobe");
		FFmpegBuilder builder = new FFmpegBuilder().setInput(videoFolderPath + tempVideoName)	// 파일 경로
				.overrideOutputFiles(true)	// 오버라이드
				.addOutput(videoFolderPath + videoName)	// 저장경로
				.setFormat("mp4")								// 포맷(확장자)
				.setVideoCodec("libx264")
				.setAudioChannels(2)						// 오디오 채널(1ㅣ모노, 2:스테레오)
//				.setVideoResolution(1280, 720)					// 동영상 해상도
				.setVideoBitRate(1464800)						// 동영상 비트레이트 (프레임)
				.setStrict(FFmpegBuilder.Strict.EXPERIMENTAL)	// ffmpeg 빌더 실행 허용
				.done();
		
		FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffprobe);
		executor.createJob(builder).run();
		tempFile.delete();
		
		// 썸네일 이미지 추출 후 서버에 저장
		FFmpegBuilder thumbnailBuilder = new FFmpegBuilder()
					.overrideOutputFiles(true)
					.setInput(videoFolderPath + videoName)
					.addExtraArgs("-ss", "00:00:01")
					.addOutput(thumbnailFolderPath + thumbnailName)
					.setFrames(1)
					.done();
		FFmpegExecutor thumbnailExecutor = new FFmpegExecutor(ffmpeg, ffprobe);
		thumbnailExecutor.createJob(thumbnailBuilder).run();
	}
}
