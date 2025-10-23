package com.ecommerce.project.service;

import com.ecommerce.project.repositories.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String uploadImage(String path, MultipartFile file) throws IOException {
        //File names of Current/original
        String originalFileName = file.getOriginalFilename();
        //Generate unique File name
        String randomId = UUID.randomUUID().toString();
        //map.jpg --> 1234 = 1234.jpg
        String filename =randomId.concat(originalFileName.substring(originalFileName.lastIndexOf('.')));
        String filePath = path + File.separator + filename;
        //Check if path exists and create
        File folder = new File(path);
        if(!folder.exists())
            folder.mkdir();
        //Upload to server
        Files.copy(file.getInputStream(), Paths.get(filePath));
        //Returning File name
        return filename;
    }
}
