package com.webtoonquiz.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Quiz implements Serializable {

	private static final long serialVersionUID = 5474167520502610293L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="quiz_id")
	private Long id;
	
	@Column(name="title")
	private String title;
	
	@Column(name="description")
	private String description;
	
	@Column(name="option_one")
	private String option_one;
	
	@Column(name="option_two")
	private String option_two;
	
	@Column(name="option_three")
	private String option_three;
	
	@Column(name="option_four")
	private String option_four;

	public Quiz(String title, String description, String option_one, String option_two, String option_three, String option_four) {
		super();
		this.title = title;
		this.description = description;
		this.option_one = option_one;
		this.option_two = option_two;
		this.option_three = option_three;
		this.option_four = option_four;
	}
	
}
