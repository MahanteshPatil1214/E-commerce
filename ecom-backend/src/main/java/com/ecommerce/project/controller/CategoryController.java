package com.ecommerce.project.controller;

import com.ecommerce.project.config.AppConstants;
import com.ecommerce.project.model.Category;
import com.ecommerce.project.payload.CategoryDTO;
import com.ecommerce.project.payload.CategoryResponse;
import com.ecommerce.project.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

//    @GetMapping("/echo")
//    public ResponseEntity<String> echoMessage(@RequestParam(name = "message" , required = true) String message){
//       return new ResponseEntity<>("Echoed message:" + message,HttpStatus.OK);
//    }


    @Tag(name="Category APIS",description = "APIs for managing categories")
    @Operation(summary = "GET all category" , description = "API to get all categories")
    @GetMapping("/public/categories")
    public ResponseEntity<CategoryResponse> getAllCategories(
            @RequestParam(name = "pageNumber" ,defaultValue = AppConstants.PAGE_NUMBER ,required = false)Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = AppConstants.PAGE_SIZE ,required = false )Integer pageSize,
            @RequestParam(name = "sortBy",defaultValue = AppConstants.SORT_CATEGORIES_BY ,required = false )String sortBY,
            @RequestParam(name = "sortOrder" ,defaultValue = AppConstants.SORT_DIR ,required = false) String sortOrder
    ) {
        CategoryResponse categoryResponse = categoryService.getAllCategories(pageNumber,pageSize,sortBY,sortOrder);
        return new ResponseEntity<>(categoryResponse,HttpStatus.OK);
    }

    @Tag(name="Category APIS",description = "APIs for managing categories")
    @Operation(summary = "Create category" , description = "API to create new category")
    @ApiResponses({
            @ApiResponse(responseCode = "201" , description = "Category created successfully"),
            @ApiResponse(responseCode = "401" , description = "Invalid Input" , content = @Content),
            @ApiResponse(responseCode = "500" , description = "Internal Server Error" , content = @Content)
    })
    @PostMapping("/public/categories")
    public ResponseEntity<CategoryDTO> createCategory(@Valid @RequestBody CategoryDTO categoryDTO) {
        CategoryDTO savedCategoryDTO = categoryService.createCategory(categoryDTO);
        return  new ResponseEntity<>(savedCategoryDTO,HttpStatus.CREATED);
    }


    @DeleteMapping("/admin/categories/{categoryId}")
    public ResponseEntity<CategoryDTO> deleteCategory(@Parameter(description = "Category that u wish to delete")
            @PathVariable Long categoryId) {
            CategoryDTO deleteCategory = categoryService.deletecategory(categoryId);
            return new ResponseEntity<>(deleteCategory, HttpStatus.OK);

    }

    @PutMapping("/admin/categories/{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(@Valid @RequestBody CategoryDTO categoryDTO,@PathVariable Long categoryId){
            CategoryDTO savedCategoryDTO = categoryService.updateCategory(categoryDTO,categoryId);
            return new ResponseEntity<>(savedCategoryDTO, HttpStatus.OK);

    }


}

