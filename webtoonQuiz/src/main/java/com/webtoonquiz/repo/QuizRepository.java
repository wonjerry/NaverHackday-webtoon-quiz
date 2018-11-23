package com.webtoonquiz.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.webtoonquiz.model.Quiz;

public interface QuizRepository extends CrudRepository<Quiz, Long>{
	
	List<Quiz> findByTitle(String title);

}
