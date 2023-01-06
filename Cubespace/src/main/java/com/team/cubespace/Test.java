package com.team.cubespace;

import java.util.ArrayList;
import java.util.List;

import com.team.cubespace.common.Util;

public class Test {
	public static void main(String[] args) {
		
		for(int i=0; i<25; i++) {
			System.out.printf("%d.%s\n", i, Util.fileRename("1.png"));			
		}
	}
}
