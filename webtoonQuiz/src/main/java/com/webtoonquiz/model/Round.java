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
  int id;

  @Column(name="startTime")
  Timestamp  type;

}
