package com.webtoonquiz.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper=true)
@Entity
@Table(name = "OptionQuiz")
public class OptionQuiz extends Quiz {

	@Column(name="option_one")
	 String optionOne;
	
	@Column(name="option_two")
	String optionTwo;
	
	@Column(name="option_three")
	 String optionThree;
	
	@Column(name="option_four")
	 String optionFour;
	
	@Column(name="solution")
	 int solution;
	
}
