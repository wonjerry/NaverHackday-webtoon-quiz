package com.webtoonquiz.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.webtoonquiz.model.OptionQuiz;
public interface OptionQuizRepository extends JpaRepository<OptionQuiz,Integer> {

}
