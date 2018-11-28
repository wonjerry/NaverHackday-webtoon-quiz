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

    public List<OxQuiz> getOxQuizs() {
        return oxQuizRepository.findAll();
    }

}
