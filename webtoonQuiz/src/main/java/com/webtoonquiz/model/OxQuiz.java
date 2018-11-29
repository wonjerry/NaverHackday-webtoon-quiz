package com.webtoonquiz.model;

import java.io.Serializable;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import lombok.*;

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
