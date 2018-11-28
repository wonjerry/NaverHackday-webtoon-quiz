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
		List<Quiz> list = new ArrayList<>();
		Iterable<Quiz> Quizs = quizRepository.findAll();

		Quizs.forEach(list::add);

		return list;
	}
//
//	public synchronized boolean addQuiz(Quiz quiz) {
//		List<Quiz> list = quizRepository.findByRoundAndNum(quiz.getRound(),quiz.getNum());
//		if (list.size() > 0) {
//			return false;
//		} else {
//			quizRepository.save(quiz);
//			return true;
//		}
//	}
//
//	public List<Quiz> findByRoundAndNumSQL(int round, int num) {
//		return quizRepository.findByRoundAndNumSQL(round, num);
//	}
//
//	public void updateQuiz(Quiz quiz) {
//		quizRepository.save(quiz);
//	}
//
//	public void deleteQuiz(long quizId) {
//		quizRepository.delete(quizId);
//	}
}
