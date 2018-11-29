package com.webtoonquiz.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import com.webtoonquiz.model.OptionQuiz;
import com.webtoonquiz.model.OxQuiz;
import com.webtoonquiz.model.Quiz;
import com.webtoonquiz.service.OptionQuizService;
import com.webtoonquiz.service.OxQuizService;
import com.webtoonquiz.service.QuizService;

@Controller
@RequestMapping("/admin")
public class AdminController {

	static Logger logger = LoggerFactory.getLogger(AdminController.class);

	@Autowired
	private QuizService quizService;
	
	@Autowired
	private OxQuizService oxQuizService;
	
	@Autowired
	private OptionQuizService optionQuizService;

	@GetMapping("/")
	public String home(Model model) {
		logger.debug("Calling get admin");

		model.addAttribute("message", "hello world");
		return "index";
	}

	@GetMapping(value = "/dashboard")
	public String dashboard(Model model) {
		List<Quiz> quizs = quizService.getRoundIdAllQuizzes(1);
		model.addAttribute("quizs", quizs);
		return "dashboard";
	}

	@GetMapping(value = "/dashboard/{roundId}")
	public String dashboardByRound(@PathVariable int roundId, Model model) {
		List<Quiz> quizs = quizService.getRoundIdAllQuizzes(roundId);
		model.addAttribute("quizs", quizs);
		return "dashboard";
	}

	@GetMapping(value = "/viewQuiz/{id}")
	public String findQuizById(@PathVariable int id, Model model) {
		Quiz quiz = quizService.findQuizById(id);
		System.out.println(quiz);
		model.addAttribute("quiz", quiz);
		return "viewQuiz";
	}

	@GetMapping(value = "/addOptionQuiz/{roundId}")
	public String getAddOptionQuiz(@PathVariable int roundId, Model model) {
		OptionQuiz quiz = new OptionQuiz();
		quiz.setType("option");
		quiz.setRoundId(roundId);
		model.addAttribute("quiz", quiz);

		return "addOptionQuiz";
	}

	@GetMapping(value = "/addOxQuiz/{roundId}")
	public String getAddOxQuiz(@PathVariable int roundId, Model model) {
		OxQuiz quiz = new OxQuiz();
		quiz.setType("ox");
		quiz.setRoundId(roundId);
		model.addAttribute("quiz", quiz);

		return "addOxQuiz";
	}

	@PostMapping(value = "/addOptionQuiz/{roundId}")
	public String postAddOptionQuiz(@PathVariable int roundId, @Valid OptionQuiz quiz, BindingResult result,
			HttpServletRequest request) {

		if (result.hasErrors()) {
			System.out.println("Form data has some errors");
			List<ObjectError> errors = result.getAllErrors();

			for (ObjectError error : errors) {
				System.out.print(error.getDefaultMessage());
			}

			return "addOptionQuiz";
		}

		imageLoading(quiz, request);
		quiz.setRoundId(roundId);
		quiz.setType("option");

		quizService.addOptionQuiz(quiz);

		return "redirect:/admin/dashboard/" + roundId;
	}

	@PostMapping(value = "/addOxQuiz/{roundId}")
	public String postAddOxQuiz(@PathVariable int roundId, @Valid OxQuiz quiz, BindingResult result,
			HttpServletRequest request) {
		if (result.hasErrors()) {
			System.out.println("Form data has some errors");
			List<ObjectError> errors = result.getAllErrors();

			for (ObjectError error : errors) {
				System.out.print(error.getDefaultMessage());
			}

			return "addOptionQuiz";
		}

		imageLoading(quiz, request);
		quiz.setRoundId(roundId);
		quiz.setType("ox");

		quizService.addOxQuiz(quiz);

		return "redirect:/admin/dashboard/" + roundId;
	}

	private void imageLoading(Quiz quiz, HttpServletRequest request) {
		MultipartFile quizImage = quiz.getFile();
		String rootDirectory = request.getSession().getServletContext().getRealPath("/");
		Path savePath = Paths.get(rootDirectory + "\\ui\\static\\images\\" + quizImage.getOriginalFilename());

		if (quizImage.isEmpty() == false) {
			System.out.println("------------file start---------------");
			System.out.println("name : " + quizImage.getName());
			System.out.println("filename : " + quizImage.getOriginalFilename());
			System.out.println("size : " + quizImage.getSize());
			System.out.println("savePath : " + savePath);
			System.out.println("------------file end ----------------");
			// FileCopyUtils.copy(quiz.getFile().getBytes(), new
			// File("C:/Users/Park/dev/workspace2/eStore/src/main/webapp/resources/images/"+quiz.getFile().getOriginalFilename()));
		}

		if (quizImage != null && !quizImage.isEmpty()) {
			try {
				quizImage.transferTo(new File(savePath.toString()));
			} catch (IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}

		quiz.setImageName(quizImage.getOriginalFilename());
	}

	@RequestMapping(value = "/deleteQuiz/{id}/{roundId}")
	public String deleteQuiz(@PathVariable int id, @PathVariable int roundId) {
		quizService.deleteQuiz(id);
		return "redirect:/admin/dashboard/" + roundId;
	}

	@RequestMapping(value = "/updateOxQuiz/{id}")
	public String updateOxQuiz(@PathVariable int id, Model model) {
		OxQuiz quiz = oxQuizService.findOne(id);
		model.addAttribute("quiz", quiz);
		return "updateOxQuiz";
	}

	@RequestMapping(value = "/updateOxQuiz", method = RequestMethod.POST)
	public String updateOxQuizPost(@Valid OxQuiz quiz, BindingResult result, HttpServletRequest request) { // controller
		if (result.hasErrors()) {
			System.out.println("Form data has some errors");
			List<ObjectError> errors = result.getAllErrors();

			for (ObjectError error : errors) {
				System.out.print(error.getDefaultMessage());
			}

			return "updateOxQuiz";
		}
		imageLoading(quiz, request);
		quiz.setType("ox");
		quizService.updateOxQuiz(quiz);

		return "redirect:/admin/dashboard/" + quiz.getRoundId();
	}

	@RequestMapping(value = "/updateOptionQuiz/{id}")
	public String updateOptionQuiz(@PathVariable int id, Model model) {
		OptionQuiz quiz = optionQuizService.findOne(id);
		model.addAttribute("quiz", quiz);
		return "updateOptionQuiz";
	}

	@RequestMapping(value = "/updateOptionQuiz", method = RequestMethod.POST)
	public String updateOptionQuizPost(@Valid OptionQuiz quiz, BindingResult result, HttpServletRequest request) { // controller
		if (result.hasErrors()) {
			System.out.println("Form data has some errors");
			List<ObjectError> errors = result.getAllErrors();

			for (ObjectError error : errors) {
				System.out.print(error.getDefaultMessage());
			}

			return "updateOxQuiz";
		}
		imageLoading(quiz, request);
		quiz.setType("option");
		quizService.updateOptionQuiz(quiz);

		return "redirect:/admin/dashboard/" + quiz.getRoundId();
	}
	
	@PostMapping("/")
	public String postHome(Model model) {
		logger.debug("Calling post admin");

		model.addAttribute("message", "hello world");
		return "index";
	}
}
