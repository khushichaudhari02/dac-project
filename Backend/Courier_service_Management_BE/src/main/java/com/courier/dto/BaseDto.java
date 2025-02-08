package com.courier.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BaseDto {
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDate createdOn;
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDateTime updatedOn;
}
