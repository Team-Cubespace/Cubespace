package com.team.cubespace.main.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.cubespace.main.model.dao.ShopDAO;

@Service
public class ShopServiceImpl  implements ShopService{

	@Autowired
	private ShopDAO dao;
}
