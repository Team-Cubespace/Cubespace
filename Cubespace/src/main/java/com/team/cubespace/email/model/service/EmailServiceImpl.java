package com.team.cubespace.email.model.service;

import java.util.Map;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team.cubespace.login.model.service.LoginService;

@Service
public class EmailServiceImpl implements EmailService {
	
	@Autowired
    private JavaMailSender mailSender; // email-context.xml에서 생성한 bean
    
	@Autowired
	public LoginService lService;
    
    private String fromEmail = "khadbanan@gmail.com";
    private String fromUsername = "Cubespace";

    @Override
    public String createAuthKey() {
        String key = "";
        for(int i=0 ; i< 6 ; i++) {
            
            int sel1 = (int)(Math.random() * 3); // 0:숫자 / 1,2:영어
            
            if(sel1 == 0) {
                
                int num = (int)(Math.random() * 10); // 0~9
                key += num;
                
            }else {
                
                char ch = (char)(Math.random() * 26 + 65); // A~Z
                
                int sel2 = (int)(Math.random() * 2); // 0:소문자 / 1:대문자
                
                if(sel2 == 0) {
                    ch = (char)(ch + ('a' - 'A')); // 대문자로 변경
                }
                
                key += ch;
            }
            
        }
        return key;
    }

    @Transactional
    @Override
    public String signUp(String email) {
        
        //6자리 난수 인증번호 생성
        String authKey = createAuthKey();
        try {

            //인증메일 보내기
            MimeMessage mail = mailSender.createMimeMessage();
            
            // 제목
            String subject = "[Final Project] Cubespace 회원가입 인증번호";
            
            // 문자 인코딩
            String charset = "UTF-8";
            
            // 메일 내용
            String mailContent 
                = "<p>Cubespace 회원 가입 인증번호입니다.</p>"
                + "<h3 style='color:blue'>" + authKey + "</h3>";
            
            
            
            // 송신자(보내는 사람) 지정
            mail.setFrom(new InternetAddress(fromEmail, fromUsername));
            
            // 수신자(받는사람) 지정
            mail.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
            
            
            // 이메일 제목 세팅
            mail.setSubject(subject, charset);
            
            // 내용 세팅
            mail.setText(mailContent, charset, "html"); //"html" 추가 시 HTML 태그가 해석됨
            
            mailSender.send(mail); // 메일 발송
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return authKey;
    }
    
    
    /**
     * 아이디 찾기 이메일 발송
     */
    @Transactional
	@Override
	public String findEmailId(String result, Map<String, Object> paramMap) {
    	
    	String inputEmail = (String) paramMap.get("memberNewEmail");
        
		try {

            //인증메일 보내기
            MimeMessage mail = mailSender.createMimeMessage();
            
            // 제목
            String subject = "[Final Project] Cubespace 회원 ID 찾기";
            
            // 문자 인코딩
            String charset = "UTF-8";
            
            // 메일 내용
            String mailContent 
                = "<p>Cubespace 회원 가입한 아이디입니다.</p>"
                + "<h3 style='color:blue'>" + result + "</h3>"
                + "<p> 로그인 페이지로 이동 : http://kh-classa.xyz/ </p>";
            
            // 송신자(보내는 사람) 지정
            mail.setFrom(new InternetAddress(fromEmail, fromUsername));
            
            // 수신자(받는사람) 지정
            mail.addRecipient(Message.RecipientType.TO, new InternetAddress(inputEmail));
            
            // 이메일 제목 세팅
            mail.setSubject(subject, charset);
            
            // 내용 세팅
            mail.setText(mailContent, charset, "html"); //"html" 추가 시 HTML 태그가 해석됨
            
            mailSender.send(mail); // 메일 발송
            
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return null;
	}

    
    
    @Transactional
	@Override
	public int findEmailPw(String result, Map<String, Object> paramMap) {
        //6자리 난수 인증번호 생성
        String authKey = createAuthKey();
        String inputEmail = (String) paramMap.get("memberNewEmail");
        int result1 = -1;
        
        try {

            //인증메일 보내기
            MimeMessage mail = mailSender.createMimeMessage();
            
            // 제목
            String subject = "[Final Project] Cubespace 회원 PW 찾기";
            
            // 문자 인코딩
            String charset = "UTF-8";
            
            // 메일 내용
            String mailContent 
            = "<p>Cubespace 회원 임시 비밀번호 입니다.</p>"
            + "<h3 style='color:blue'>" + authKey + "</h3>"
            + "<p> 내정보 수정에서 비밀번호를 꼭 변경해 주세요. </p>"
            + "<p> 로그인 페이지로 이동 : http://kh-classa.xyz/ </p>";
            
            
            // 송신자(보내는 사람) 지정
            
            mail.setFrom(new InternetAddress(fromEmail, fromUsername));
            
            // 수신자(받는사람) 지정
            mail.addRecipient(Message.RecipientType.TO, new InternetAddress(inputEmail));
            
            // 이메일 제목 세팅
            mail.setSubject(subject, charset);
            
            // 내용 세팅
            mail.setText(mailContent, charset, "html"); //"html" 추가 시 HTML 태그가 해석됨
            
            mailSender.send(mail); // 메일 발송
            
            //  암호화 ->디비에 보내기 
            result1 = lService.findEmailPw(authKey,result);
            
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
        return result1;
    }



}
