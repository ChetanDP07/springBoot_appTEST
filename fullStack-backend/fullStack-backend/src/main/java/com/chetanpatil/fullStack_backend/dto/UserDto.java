package com.chetanpatil.fullStack_backend.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String userName;
    private String name;
    private String email;
    @JsonFormat(pattern = "dd MMM yyyy")
    private LocalDateTime regDate;
}
