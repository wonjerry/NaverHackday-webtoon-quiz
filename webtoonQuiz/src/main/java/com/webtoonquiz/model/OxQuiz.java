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
public class OxQuiz extends Quiz {

<<<<<<< HEAD
  @Builder
  public OxQuiz(String title , String description, String img, int num, String type , int roundId ,int solution ) {
    super.title =title;
    super.description =description;
    super.img = img;
    super.type = type ;
    super.roundId = roundId;
    super.num = num;
    this.solution =solution;
  }
=======
	@Builder
	public OxQuiz(String title, String description, String type, 
			int roundId, int solution, int num, String imageName ) {
		super.title = title;
		super.description = description;
		super.type = type;
		super.roundId = roundId;
		super.num = num;
		super.imageName = imageName;
		this.solution = solution;
	}
>>>>>>> master

	@Column(name = "solution")
	int solution;
}
