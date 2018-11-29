package com.webtoonquiz.model;


import javax.persistence.*;

import lombok.Data;

@Data
@Inheritance(strategy = InheritanceType.JOINED)
@Entity
@Table(name = "Quiz")
public class Quiz {

	@Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	int id;

  @Column(name="title")
  String title;

  @Column(name="description")
   String description;

    @Column(name="imageName")
    String img;

    @Column(name="num")
    int num;

    @Column(name="type")
   String type;

  @Column(name="roundId")
  int roundId;

}
