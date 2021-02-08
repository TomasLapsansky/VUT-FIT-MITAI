package com.vut.fit.pis2020.controller.restController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;

@RestController
public class FileUploaderController {

    @Autowired
    private HttpServletRequest request;

    @PostMapping(value = "/api/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public HashMap<String, String> uploadFile(@RequestParam MultipartFile file) {

        HashMap<String, String> returnCode = new HashMap<>();
        String filePath;

        if(!file.isEmpty()) {
            try {
                String uploadDir = "/data/";
                String realPathUploadDir = request.getServletContext().getRealPath(uploadDir);

                if(! new File(realPathUploadDir).exists()) {
                    new File(realPathUploadDir).mkdir();
                }

                String name = file.getOriginalFilename();
                filePath = realPathUploadDir + name;
                File dest = new File(filePath);
                file.transferTo(dest);
            } catch (IOException e) {
                returnCode.put("400", "File can't be created");

                e.printStackTrace();
                return returnCode;
            }
        } else {
            returnCode.put("400", "File is empty");

            return returnCode;
        }

        returnCode.put("201", filePath);
        return returnCode;
    }
}
