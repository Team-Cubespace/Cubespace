package com.team.cubespace.diary.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class Plan {
	
	int planNo;
	int memberNo;
	String startDate;
	String endDate;
	String planTitle;
	int planCategory;
	String allDayFlag;
	String color;
	String planDescription;

}
