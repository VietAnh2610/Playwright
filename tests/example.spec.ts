import { test, expect } from '@playwright/test';

// Hàm kiểm thử chung
async function loginWithValidAccount(page) {
  await page.goto('https://fptshop.com.vn/dang-nhap');

  await page.fill('#username', 'your_username');
  await page.fill('#password', 'your_password');

  await page.click('.btn-login');

  await expect(page).toHaveText('Đăng nhập thành công');
}

// Kiểm tra chức năng đăng nhập/đăng ký
test('login with valid account', async ({ page }) => {
  await loginWithValidAccount(page);
});

test('login with invalid account', async ({ page }) => {
  await page.goto('https://fptshop.com.vn/dang-nhap');

  await page.fill('#username', 'invalid_username');
  await page.fill('#password', 'invalid_password');

  await page.click('.btn-login');

  await expect(page).toHaveText('Tên đăng nhập hoặc mật khẩu không chính xác');
});

test('register new account', async ({ page }) => {
  await page.goto('https://fptshop.com.vn/dang-ky');

  await page.fill('#fullname', 'Your Full Name');
  await page.fill('#email', 'your_email@example.com');
  await page.fill('#password', 'your_password');
  await page.fill('#confirmPassword', 'your_password');

  await page.click('.btn-register');

  await expect(page).toHaveText('Đăng ký thành công');
});

// Kiểm tra chức năng tìm kiếm
test('search product by name', async ({ page }) => {
  await page.goto('https://fptshop.com.vn/');

  await page.fill('.search-bar__input', 'iPhone 14 Pro Max');
  await page.keyboard.press('Enter');

  await expect(page).toHaveText(/iPhone 14 Pro Max/);
});

test('search product by code', async ({ page }) => {
  await page.goto('https://fptshop.com.vn/');

  await page.fill('.search-bar__input', 'SP123456');
  await page.keyboard.press('Enter');

  await expect(page).toHaveText(/SP123456/);
});

test('search product by brand', async ({ page }) => {
  await page.goto('https://fptshop.com.vn/');

  await page.fill('.search-bar__input', 'Apple');
  await page.keyboard.press('Enter');

  await expect(page).toHaveText(/Apple/);
});

// Kiểm tra chức năng xem chi tiết sản phẩm
test('display product information', async ({ page }) => {
  await page.goto('https://fptshop.com.vn/dien-thoai/apple-iphone-14-pro-max');

  // Kiểm tra xem có hiển thị đầy đủ thông tin sản phẩm (hình ảnh, mô tả, giá bán, khuyến mãi)
  await expect(page).toHaveImage('.product-image__img');
  await expect(page).toHaveText('.product-info__name');
  await expect(page).toHaveText('.product-info__price');
  await expect(page).toHaveText('.product-info__promotion');
});

// Kiểm tra chức năng so sánh sản phẩm
test('compare products', async ({ page }) => {
  await page.goto('https://fptshop.com.vn/dien-thoai/apple-iphone-14-pro-max');

  // Click nút "So sánh"
  await page.click('.btn-compare');

  // Chọn sản phẩm khác để so sánh
  await page.goto('https://fptshop.com.vn/dien-thoai/samsung-galaxy-s23-ultra');
  await page.click('.btn-compare');

  // Kiểm tra xem có bảng so sánh sản phẩm được hiển thị không
  await expect(page).toHaveText('So sánh sản phẩm');
});

// Kiểm tra chức năng đánh giá sản phẩm
test('add product review', async ({ page }) => {
  await loginWithValidAccount(page);

  await page.goto('https://fptshop.com.vn/dien-thoai/apple-iphone-14-pro-max');

  // Click nút "Viết đánh giá"
  await page.click('.btn-write-review');

  // Điền thông tin đánh giá
  await page.fill('.review-form__title', 'Đây là đánh giá của tôi');
  await page.fill('.review-form__content', 'Sản phẩm tốt, đáng mua!');
  await page.click('.btn-submit-review');

  // Kiểm tra xem có thông báo "Đánh giá của bạn đã được gửi thành công" không
  await expect(page).toHaveText('Đánh giá của bạn đã được gửi thành công');
});

// Kiểm tra chức năng thêm sản phẩm vào giỏ hàng
test('add product to cart', async ({ page }) => {
  await page.goto('https://fptshop.com.vn/dien-thoai/apple-iphone-14-pro-max');

  // Click nút "Đặt mua"
  await page.click('.btn-buy');

  // Kiểm tra xem có thông báo "Sản phẩm đã được thêm vào giỏ hàng" không
  await expect(page).toHaveText('Sản phẩm đã được thêm vào giỏ hàng');
});

// Kiểm tra chức năng xem giỏ hàng
test('view cart', async ({ page }) => {
  await page.goto('https://fptshop.com.vn/gio-hang');

  // Kiểm tra xem có hiển thị sản phẩm đã thêm vào giỏ hàng không
  await expect(page).toHaveText('iPhone 14 Pro Max');
});

// Kiểm tra chức năng cập nhật số lượng sản phẩm trong giỏ hàng
test('update product quantity', async ({ page }) => {
  await page.goto('https://fptshop.com.vn/gio-hang');

  // Tăng số lượng sản phẩm lên 2
  await page.click('.cart-item__quantity-btn-plus');

  // Kiểm tra xem số lượng sản phẩm hiển thị đúng là 2
  await expect(page).toHaveText('2');
});

// Kiểm tra chức năng xóa sản phẩm khỏi giỏ hàng
test('remove product from cart', async ({ page }) => {
  await page.goto('https://fptshop.com.vn/gio-hang');

  // Click nút "Xóa" sản phẩm
  await page.click('.cart-item__remove-btn');

  // Kiểm tra xem sản phẩm đã bị xóa khỏi giỏ hàng
  await expect(page).not.toHaveText('iPhone 14 Pro Max');
});

