package com.webtoonquiz.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webtoonquiz.model.Quiz;
import com.webtoonquiz.repo.QuizRepository;

@Service
public class QuizService {

	@Autowired
	private QuizRepository quizRepository;

	public List<Quiz> getAllQuizs() {
		return quizRepository.findAll();
	}

}
