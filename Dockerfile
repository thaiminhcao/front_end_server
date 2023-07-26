# Sử dụng image node:14-alpine làm image cơ sở
FROM node:14-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và yarn.lock vào thư mục làm việc
COPY package.json yarn.lock ./

# Cài đặt các dependency
RUN yarn install --frozen-lockfile

# Sao chép tất cả các file còn lại vào thư mục làm việc
COPY . .

# Khởi tạo cấu hình cho TailwindCSS
RUN npx tailwindcss init -p

# Build ứng dụng
RUN yarn build

# Cài đặt serve để phục vụ ứng dụng
RUN yarn global add serve

# Khai báo cổng mà ứng dụng sẽ sử dụng
EXPOSE 5000

# Chạy lệnh serve để phục vụ ứng dụng
CMD ["serve", "-s", "dist", "-l", "5000"]