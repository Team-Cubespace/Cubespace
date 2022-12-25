package com.team.cubespace.email.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import com.team.cubespace.email.model.service.EmailService;
import com.team.cubespace.login.model.service.LoginService;



@Controller
@RequestMapping("/sendEmail")
@SessionAttributes("authKey")
public class EmailController {
    
    @Autowired
    private EmailService service;
    
    @Autowired
    private  LoginService lService;
    
    
    
    
    /** 회원가입
     * @param email
     * @param model
     * @return
     */
    @GetMapping("/signUp")
    @ResponseBody
    public int signUp(String email, Model model) {
        
    	
        String authKey = service.signUp(email);
        
        if(authKey != null) {
            model.addAttribute("authKey", authKey);
            
            
            return 1;
        }else {
            return 0;
        }
    }
    
    
    @GetMapping("/checkAuthKey")
    @ResponseBody
    public int checkAuthKey(String inputKey, @SessionAttribute("authKey") String authKey, 
            SessionStatus status){
        
        if(inputKey.equals(authKey)) {
            status.setComplete();
            return 1;
        }
        
        return 0;
    }    
}