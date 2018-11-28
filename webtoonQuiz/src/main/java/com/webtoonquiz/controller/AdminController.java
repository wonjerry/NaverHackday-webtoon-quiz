//package com.webtoonquiz.controller;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//
//@Controller
//public class AdminController {
//
//	static Logger logger = LoggerFactory.getLogger(AdminController.class);
//
//	// @RequestMapping(value="/", method = RequestMethod.GET)
//	@GetMapping("/")
//	public String home(Model model) {
//		logger.debug("Calling get admin" );
//
//		model.addAttribute("message", "hello world");
//		return "index";
//
//	}
//
//	@PostMapping("/")
//	public String postHome(Model model) {
//		logger.debug("Calling post admin" );
//
//		model.addAttribute("message", "hello world");
//		return "index";
//
//	}
//}
