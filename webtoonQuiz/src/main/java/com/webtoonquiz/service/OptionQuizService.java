package com.webtoonquiz.service;

import com.webtoonquiz.model.OptionQuiz;
import com.webtoonquiz.repo.OptionQuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OptionQuizService {

    @Autowired
    OptionQuizRepository optionQuizRepository;

    public List<OptionQuiz> getOptionQuizs() {
        return optionQuizRepository.findAll();
    }

}
