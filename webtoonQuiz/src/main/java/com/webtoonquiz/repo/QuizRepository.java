package com.webtoonquiz.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.webtoonquiz.model.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long>{
<<<<<<< HEAD
  List<Quiz> findAllByRoundIdOrderById(int roundId);
}
=======
	List<Quiz> findAllByRoundIdOrderById(int roundId);

	List<Quiz> findByRoundIdAndNum(int roundId, int num);
}
>>>>>>> master
