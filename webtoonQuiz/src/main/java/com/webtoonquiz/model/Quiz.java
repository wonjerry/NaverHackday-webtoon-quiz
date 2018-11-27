package com.webtoonquiz.model;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name="type")
public class Quiz implements Serializable {

	private static final long serialVersionUID = 5474167520502610293L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="quiz_id")
	private Long id;
	
	@Column(name="round")
	protected int round;
	
	@Column(name="num")
	protected int num;
	
	@Column(name="type")
	protected String type;
	
	@Column(name="description")
	protected String description;
	
	@Column(name="showtime")
	private Timestamp showTime;
	
}
