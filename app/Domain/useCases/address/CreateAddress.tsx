import { AddressRepositoryImpl } from "../../../Data/repositories/AdressRepository";
import { Address } from "../../entities/Address";

const { create } = new AddressRepositoryImpl();

export const CreateAddressUseCase = async (address: Address) => {
  return await create(address);
};
