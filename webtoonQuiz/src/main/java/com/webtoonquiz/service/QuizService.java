package com.webtoonquiz.service;

import java.util.ArrayList;
import java.util.List;

import com.webtoonquiz.model.OptionQuiz;
import com.webtoonquiz.model.OxQuiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.webtoonquiz.model.Quiz;
import com.webtoonquiz.repo.QuizRepository;

import javax.transaction.Transactional;

@Service
public class QuizService {

	@Autowired
	private QuizRepository quizRepository;

	public List<Quiz> getAllQuizzes() {
		return quizRepository.findAll();
	}

  @Transactional
	public ResponseEntity<String> CreateOxQuiz(final OxQuiz oxQuiz){
    quizRepository.save(oxQuiz);
	  return ResponseEntity.ok("ox퀴즈 저장 완료");
  }

  @Transactional
  public ResponseEntity<String> CreateOptionQuiz(final OptionQuiz optionQuiz){
    quizRepository.save(optionQuiz);
    return ResponseEntity.ok("객관식 퀴즈 저장 완료");
  }

}
