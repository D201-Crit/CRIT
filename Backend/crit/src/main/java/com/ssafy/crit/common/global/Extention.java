package com.ssafy.crit.common.global;

import java.util.Arrays;

import org.springframework.stereotype.Component;
import lombok.Getter;

@Getter
@Component
public class Extention {
	private String[] imageExtentions = {"jpg", "jpeg", "png", "gif", "bmp", "tif", "webp"};
	private String[] aviExtentions = {"mp4", "mkv", "fiv", "avi", "mov", "wmv", "mpg", "mpeg", "webm"};

	public boolean isImageExtension(String ext) {
		return Arrays.asList(imageExtentions).contains(ext.toLowerCase());
	}

	public boolean isAviExtension(String ext) {
		return Arrays.asList(aviExtentions).contains(ext.toLowerCase());
	}
}