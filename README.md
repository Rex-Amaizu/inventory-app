# inventory-app

## Description

This Inventory Management App allows users to manage products, track inventory levels, and update stock information efficiently. The app provides a user-friendly interface for handling products, listing inventory, and generating reports.

## Features

- Add products
- Update Inventory
- Update and delete products
- Generate inventory reports
- Real-time stock alerts(Only a frontend design showing the app should receive notifications but the full notification functionality is not implemented yet)

## Installation

1. Clone the repository:

   git clone <https://github.com/Rex-Amaizu/inventory-app.git>

2. Navigate into the project directory:

3. Install dependencies:

   npm install

4. Set up environment variables:

   - Create a `.env.local` file with necessary environment variables such as `MONGODB_URI` for database connectivity.

5. Run the app:
   npm run dev

## Usage

- On the homepage, you can click on view Inventory to generate inventory report for each product
- To add a product, navigate to the 'Product' page and fill in the product details.
- You can edit or delete products from the 'Product' page.
- You can update inventory(reduce or increase stock) from the inventory page.

## API Endpoints

- **GET** `/api/products` - Fetch all products
- **GET** `/api/products/:id` - Fetch product by ID
- **POST** `/api/products/new` - Add a new product
- **PUT** `/api/products/update/:id` - Update a product by ID
- **DELETE** `/api/products/delete/:id` - Delete a product by ID
- **PUT** `/api/products/inventory/:id` - Update inventory by product ID

## Technologies Used

- Next.js (React Framework)
- TypeScript
- MongoDB (Database)
- Redux Toolkit (State Management)
- CSS Modules (Styling)

## License

This project currently does not have an official license. Without a license, all rights are reserved, and the use, modification, and distribution of this code are not permitted without explicit permission from the author.

If you wish to use this code, please contact <intanalegacy89@gmail.com> for permissions or licensing inquiries.

## Contact

For any inquiries, please reach out at <intanalegacy89@gmail.com>.
