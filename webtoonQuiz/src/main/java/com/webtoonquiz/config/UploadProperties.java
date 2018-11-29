package com.webtoonquiz.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
@ConfigurationProperties(prefix = "com.webtooonquiz.upload")
public class UploadProperties {
  String localPath;
  String urlPath;
}
