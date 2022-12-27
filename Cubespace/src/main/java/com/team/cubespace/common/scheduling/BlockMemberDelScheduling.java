//package com.team.cubespace.common.scheduling;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//@Component
//public class BlockMemberDelScheduling {
//	
//	@Autowired
//	private BoardService boardservice;
//	
//	@Autowired
//	private GoodsService goodsService;
//	
//	@Autowired
//	private ServletContext application;
//	
//	// 로그를 출력하는 객체 얻어오기
//	private Logger logger = LoggerFactory.getLogger(ImageDeleteScheduling.class);
//
//	
//	@Scheduled(cron = "0 0 0/1 * * *") // 1시간마다 실행
//	public void deleteBoardImageFile() {
//		
//		// 1. DB에서 BOARD_IMG 테이블의 모든 이미지 변경명.을 조회
//		List<String> dbBoardList = boardservice.selectImageList();
//		
//		// 2. server에 저장된 모든 이미지 파일 조회
//		String folderPath = application.getRealPath("/resources/images/board");
//		;
//		// 		- 지정된 경로에 존재하는 모든 파일 목록을 배열로 반환
//		File[] arr = new File(folderPath).listFiles();
//		
//		//		- 배열->list로 반환
//		List<File> fileList = Arrays.asList(arr);
//		
//		// 3. 둘을 비교하여 Server 이미지 목록 중 DB에 없는 이미지를 삭제
//		if(!fileList.isEmpty()) {
//			
//			for(File file : fileList) {
//				
//				file.toString();
//				
//				String fileName = file.getName();
//				if(dbBoardList.indexOf(fileName) == -1) { // dbList에서 fileName과 일치하는 파일명이 없다면
//					
//					// ==  서버에는 있는데 DB에는 없는 파일
//					logger.info(fileName + " 삭제");
//					
//					file.delete();
//					
//				}
//			}
//		}
//		logger.info("게시판(board) 이미지 파일 삭제 스케줄링 완료");
//	}
//	
//	
//	@Scheduled(cron = "0 0 0/1 * * *") // 1시간마다 실행
//	public void deleteGoodsImageFile() {
//		
//		
//		List<String> temp = goodsService.selectImageList();
//		
//		List<String> dbGoodsList = new ArrayList<>();
//		
//		for(String dbGoods : temp) {
//			
//			int idx = dbGoods.lastIndexOf("/");
//			
//			dbGoodsList.add(dbGoods.substring(idx + 1));
//		}
//		
//		String folderPath = application.getRealPath("/resources/images/goodsImage");
//		File[] arr = new File(folderPath).listFiles();
//		List<File> fileList = Arrays.asList(arr);
//		
//		
//		if(!fileList.isEmpty()) {
//			
//			for(File file : fileList) {
//				
//				file.toString();
//				String fileName = file.getName();
//				
//				if(dbGoodsList.indexOf(fileName) == -1) {
//					
//					logger.info(fileName + " 삭제"); 
//				}
//			}
//		}
//		
//		logger.info("상품(goods)이미지 파일 삭제 스케줄링 완료");
//		
//		
//	}
//
//}
