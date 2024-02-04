import BaseComponent from "../../../components/BaseComponent";

export default class AddCarPopup extends BaseComponent {
  constructor(page) {
    super(page, page.locator("app-add-car-modal"));
    this.brandDropdown = this.container.locator("#addCarBrand");
    this.modelDropdown = this.container.locator("#addCarModel");
    this.mileageInput = this.container.locator("#addCarMileage");
    this.addButton = this.container.locator(".btn-primary");
  }
  // альтернативний варіант:
  async fill(brandName, modelName, mileage) {
    // оскільки метод філл - await this.addButton.click() не викликаємо
    await this.brandDropdown.selectOption({ label: brandName });
    await this.modelDropdown.selectOption({ label: modelName });
    await this.mileageInput.fill(mileage.toString());
  }

  // якщо хочу заповнити та підтвердити:
  async fillAndSubmit(brandName, modelName, mileage) {
    await this.fill(brandName, modelName, mileage);
    await this.addButton.click();
  }
}
