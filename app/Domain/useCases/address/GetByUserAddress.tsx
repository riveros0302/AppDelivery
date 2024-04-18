import { AddressRepositoryImpl } from "../../../Data/repositories/AdressRepository";

const { getByUser } = new AddressRepositoryImpl();

export const GetByUserAddressUseCase = async (idUser: string) => {
  return await getByUser(idUser);
};
