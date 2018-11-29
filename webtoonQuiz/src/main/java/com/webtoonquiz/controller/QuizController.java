package com.webtoonquiz.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webtoonquiz.model.Quiz;
import com.webtoonquiz.service.QuizService;

@RestController
@RequestMapping("/api")
public class QuizController {

	static Logger logger = LoggerFactory.getLogger(QuizController.class);

	@Autowired
	private QuizService quizService;
	
}
