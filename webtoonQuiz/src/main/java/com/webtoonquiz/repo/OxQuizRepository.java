package com.webtoonquiz.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.webtoonquiz.model.OxQuiz;
public interface OxQuizRepository extends JpaRepository<OxQuiz , Integer> {

}
