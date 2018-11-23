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
	private QuizRepository repository;

	public List<Quiz> getAllQuizs() {
		List<Quiz> list = new ArrayList<>();
		Iterable<Quiz> Quizs = repository.findAll();

		Quizs.forEach(list::add);

		return list;
	}

	public synchronized boolean addQuiz(Quiz quiz) {
		List<Quiz> list = repository.findByTitle(quiz.getTitle());
		if (list.size() > 0) {
			return false;
		} else {
			repository.save(quiz);
			return true;
		}
	}
	
	public List<Quiz> findByTitle(String title){
		return repository.findByTitle(title);
	}
	
	public void updateQuiz(Quiz quiz) {
		repository.save(quiz);
	}
	
	public void deleteQuiz(long quizId) {
		repository.delete(quizId);
	}
}