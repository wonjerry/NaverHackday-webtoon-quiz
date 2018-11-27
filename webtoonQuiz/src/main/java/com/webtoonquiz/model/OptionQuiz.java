package com.webtoonquiz.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@DiscriminatorValue("option")
public class OptionQuiz extends Quiz implements Serializable{

	private static final long serialVersionUID = -1881049959289747162L;

	@Column(name="option_one")
	private String optionOne;
	
	@Column(name="option_two")
	private String optionTwo;
	
	@Column(name="option_three")
	private String optionThree;
	
	@Column(name="option_four")
	private String optionFour;
	
	@Column(name="solution")
	private int solution;
	
}
