package com.webtoonquiz.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webtoonquiz.model.Quiz;
import com.webtoonquiz.service.QuizService;

@RestController
@RequestMapping("/api")
public class QuizController {

	static Logger logger = LoggerFactory.getLogger(QuizController.class);

	@Autowired
	private QuizService quizService;

	@GetMapping(value = "/quizs/{round}/{num}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Quiz>> findByTitle(@PathVariable int round, @PathVariable int num) {
		logger.debug("Calling findByTitle( )");
		List<Quiz> quizs = quizService.findByRoundAndNumSQL(round, num);

		return new ResponseEntity<List<Quiz>>(quizs, HttpStatus.OK);
	}
	
	@GetMapping(value = "/quizs", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Quiz>> getAll() {
		logger.debug("Calling getAll( )");
		return new ResponseEntity<List<Quiz>>(quizService.getAllQuizs(), HttpStatus.OK);
	}

	@PostMapping(value = "/quizs")
	public ResponseEntity<Void> postQuiz(@RequestBody Quiz quiz) {
		logger.debug("Calling postQuiz( )");

		boolean flag = quizService.addQuiz(quiz);
        if (flag == false) {
        	return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }

		return new ResponseEntity<Void>(HttpStatus.CREATED);
	}

	@PutMapping(value = "/quizs")
	public ResponseEntity<Quiz> putQuiz(@RequestBody Quiz quiz) {
		quizService.updateQuiz(quiz);
		
		return new ResponseEntity<Quiz>(quiz, HttpStatus.OK);		
	}

	@DeleteMapping(value = "/quizs/{id}")
	public ResponseEntity<Void> deleteQuiz(@PathVariable long id) {
		logger.debug("Calling deleteQuiz( )");
		quizService.deleteQuiz(id);
		
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
}