package com.webtoonquiz.model;
import lombok.Data;
import java.sql.Timestamp;
import javax.persistence.*;

@Data
@Entity
public class Round {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="id")
  private int id;

  @Column(name="startTime")
  protected Timestamp  type;

}
