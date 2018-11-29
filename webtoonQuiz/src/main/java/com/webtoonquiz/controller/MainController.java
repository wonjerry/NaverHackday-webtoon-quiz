package com.webtoonquiz.controller;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webtoonquiz.model.OptionQuiz;
import com.webtoonquiz.model.OxQuiz;
import com.webtoonquiz.model.Quiz;
import com.webtoonquiz.model.Round;
import com.webtoonquiz.service.OptionQuizService;
import com.webtoonquiz.service.OxQuizService;
import com.webtoonquiz.service.QuizService;
import com.webtoonquiz.service.RoundService;
import com.webtoonquiz.vo.QuizVO;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class MainController {

	@Autowired
	private OxQuizService oxQuizService;
	@Autowired
	private OptionQuizService optionQuizService;
	@Autowired
	private QuizService quizService;
	@Autowired
	private RoundService roundService;

	@GetMapping("/oxQuizzes")
	public List<OxQuiz> oxQuizzes() {
		return oxQuizService.getOxQuizzes();
	}

	@GetMapping("/optionQuizzes")
	public List<OptionQuiz> optionQuizzes() {
		return optionQuizService.getOptionQuizzes();
	}

	@GetMapping("/quizzes/all")
	public List<Quiz> quizzes() {
		return quizService.getAllQuizzes();
	}

	@GetMapping("/quizzes/round")
	public List<QuizVO> roundIdAllQuizzes() {
		return quizService.getLastRoundIdAllQuizzes();
	}

	@GetMapping("/rounds")
	public List<Round> rounds() {
		return roundService.getRounds();
	}

	@PostMapping("/optionQuiz")
	public ResponseEntity<String> createOptionQuiz(@RequestBody OptionQuiz optionQuiz) {
		return quizService.CreateOptionQuiz(optionQuiz);
	}

	@PostMapping("/oxQuiz")
	public ResponseEntity<String> createOxQuiz(@RequestBody OxQuiz oxQuiz) {
		return quizService.CreateOxQuiz(oxQuiz);
	}

	@GetMapping("/startTime")
	public ResponseEntity<Timestamp> startTime() {
		return roundService.LastRoundStart();
	}

}
