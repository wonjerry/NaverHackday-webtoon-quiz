package com.webtoonquiz.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.webtoonquiz.service.QuizService;

@Controller
@RequestMapping("/admin")
public class AdminController {

	static Logger logger = LoggerFactory.getLogger(AdminController.class);

	@Autowired
	private QuizService quizService;
	
	@GetMapping("/")
	public String home(Model model) {
		logger.debug("Calling get admin");

		model.addAttribute("message", "hello world");
		return "index";

	}

	@RequestMapping(value = "/dashboard", method = RequestMethod.GET)
	public String dashboard(Model model) {
		/*quizService.get
		model.addObject("users", getUsers());
		model.setViewName("dashboard");*/
		return "dashboard";
	}

	@PostMapping("/")
	public String postHome(Model model) {
		logger.debug("Calling post admin");

		model.addAttribute("message", "hello world");
		return "index";

	}
}
