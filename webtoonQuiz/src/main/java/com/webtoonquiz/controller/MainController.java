package com.webtoonquiz.controller;

import com.webtoonquiz.model.OptionQuiz;
import com.webtoonquiz.model.OxQuiz;
import com.webtoonquiz.model.Quiz;
import com.webtoonquiz.repo.OxQuizRepository;
import com.webtoonquiz.service.OptionQuizService;
import com.webtoonquiz.service.OxQuizService;
import com.webtoonquiz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MainController {

   @Autowired
    OxQuizService oxQuizService;
    @Autowired
    OptionQuizService optionQuizService;
    @Autowired
    QuizService quizService;

    @RequestMapping("/oxQuiz")
    public List<OxQuiz> oxQuizs() {
        return oxQuizService.getOxQuizs();
    }

    @RequestMapping("/optionQuiz")
    public List<OptionQuiz> optionQuizs() {
        return optionQuizService.getOptionQuizs();}

    @RequestMapping("/quizes")
    public List<Quiz> quizes() {
        return quizService.getAllQuizs();
    }

}
