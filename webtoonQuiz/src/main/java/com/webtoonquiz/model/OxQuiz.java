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
@DiscriminatorValue("ox")
public class OxQuiz extends Quiz implements Serializable {
	
	private static final long serialVersionUID = 1059539352613133985L;

	@Column(name="solution")
	private int solution;
}
