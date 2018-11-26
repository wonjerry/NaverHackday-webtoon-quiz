package com.webtoonquiz.repo;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.webtoonquiz.model.Quiz;

public interface QuizRepository extends CrudRepository<Quiz, Long>{

	List<Quiz> findByRoundAndNum(int round, int num);
	
	@Query("SELECT Q FROM Quiz Q WHERE round=:round and num=:num and now() > showtime")
	List<Quiz> findByRoundAndNumSQL(@Param("round") int round, @Param("num") int num);
}
