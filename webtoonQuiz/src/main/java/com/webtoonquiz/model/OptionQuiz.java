package com.webtoonquiz.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.*;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@NoArgsConstructor
@Table(name = "OptionQuiz")
public class OptionQuiz extends Quiz {
	@Builder
	public OptionQuiz(String title, String description, String type, int roundId, String optionOne, String optionTwo,
			String optionThree, String optionFour, int solution, int num, String imageName) {
		super.title = title;
		super.description = description;
		super.type = type;
		super.roundId = roundId;
		super.num = num;
		super.imageName = imageName;
		this.optionOne = optionOne;
		this.optionTwo = optionTwo;
		this.optionThree = optionThree;
		this.optionFour = optionFour;
		this.solution = solution;

	}

	@Column(name = "option_one")
	String optionOne;

	@Column(name = "option_two")
	String optionTwo;

	@Column(name = "option_three")
	String optionThree;

	@Column(name = "option_four")
	String optionFour;

	@Column(name = "solution")
	int solution;

}
