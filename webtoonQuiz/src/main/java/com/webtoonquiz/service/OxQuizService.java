package com.webtoonquiz.service;

import com.webtoonquiz.model.OxQuiz;
import com.webtoonquiz.repo.OxQuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OxQuizService {


    @Autowired
    private OxQuizRepository oxQuizRepository;

    public List<OxQuiz> getOxQuizzes() {
        return oxQuizRepository.findAll();
    }
    
    public OxQuiz findOne(long id) {
    	return oxQuizRepository.findOne(id);
    }

}
