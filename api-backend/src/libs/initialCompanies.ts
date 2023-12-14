import Company from "..//models/Company"
export const createCompany = async () => {
    try {
      const numb = await Company.estimatedDocumentCount();
      if (numb > 0) return;
  
      const value = await Promise.all([
        new Company({ name: "Zernike America Latina S.A."}).save(),
        new Company({ name: "Test Company"}).save()
      ]);
  
      console.log(value);
    } catch (error) {
      console.error(error);
    }
  }
  