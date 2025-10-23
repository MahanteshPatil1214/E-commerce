package com.ecommerce.project.service;

import com.ecommerce.project.model.Users;
import com.ecommerce.project.payload.AddressDTO;
import jakarta.validation.Valid;

import java.util.List;

public interface AddressService {
    AddressDTO createAddress(AddressDTO addressDTO, Users user);

    List<AddressDTO> getAddresses();

    AddressDTO getAddressesById(Long addressId);

    List<AddressDTO> getUserAddresses(Users user);

    AddressDTO updateAddress(Long addressId, @Valid AddressDTO addressDTO);

    String deleteAddress(Long addressId);
}
