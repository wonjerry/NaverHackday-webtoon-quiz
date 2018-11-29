package com.webtoonquiz.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "OxQuiz")
@NoArgsConstructor
public class OxQuiz extends Quiz {

	@Builder
	public OxQuiz(String title, String description, String imageName, int num, String type, int roundId, int solution) {
		super.title = title;
		super.description = description;
		super.imageName = imageName;
		super.type = type;
		super.roundId = roundId;
		super.num = num;
		this.solution = solution;
	}

	@Column(name = "solution")
	int solution;
}
