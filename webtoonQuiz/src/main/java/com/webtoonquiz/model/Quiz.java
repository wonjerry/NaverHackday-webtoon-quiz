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
import javax.persistence.Lob;
import javax.persistence.Basic;
import javax.persistence.FetchType;

@Data
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name="type")
public class Quiz implements Serializable {

	private static final long serialVersionUID = 5474167520502610293L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;

  @Column(name="title")
  protected String title;

  @Column(name="description")
  protected String description;

  @Basic(fetch = FetchType.LAZY)
  @Lob
  protected byte[] img;

  @Column(name="type")
  protected String type;

  @Column(name="roundId")
  protected int roundId;

}
