package com.team.cubespace.folder.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.team.cubespace.folder.model.service.FolderService;
import com.team.cubespace.folder.model.vo.Folder;

@Controller
public class FolderController {
	
	@Autowired
	private FolderService service;
	
	@GetMapping("/selectFolderList")
	@ResponseBody
	public String selectFolderList(@RequestParam Map <String, Integer> paramMap) {
		
		List<Folder> folderList = service.selectFolderList(paramMap);
		return new Gson().toJson(folderList);
	}
}
