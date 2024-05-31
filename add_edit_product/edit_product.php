<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['selected-product'])) {
        // Update logic
        $selectedProductName = $_POST['selected-product'];
        $name = $_POST['edit-name'];
        $price = $_POST['edit-price'];
        $details = $_POST['edit-details'];
        $color = $_POST['edit-color'];

        $jsonData = file_get_contents('products.json');
        $products = json_decode($jsonData, true);

        // Find the product in the array
        foreach ($products as &$product) {
            if ($product['name'] === $selectedProductName) {
                // Update details and color
                $product['name'] = $name;
                $product['price'] = $price;
                $product['details'] = $details;
                $product['color'] = $color;

                // Check if a new photo has been uploaded
                if (!empty($_FILES['edit-photo']['name'])) {
                    // Handle file upload if a new photo is selected
                    $targetDir = "uploads/";
                    $targetFile = $targetDir . basename($_FILES['edit-photo']['name']);
                    move_uploaded_file($_FILES['edit-photo']['tmp_name'], $targetFile);

                    // Delete the old photo file
                    if (file_exists($product['photo'])) {
                        unlink($product['photo']);
                    }

                    // Update photo path
                    $product['photo'] = $targetFile;
                }
                break;
            }
        }

        // Convert the data array to JSON
        $jsonData = json_encode($products, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);

        // Save the updated JSON data back to products.json
        file_put_contents('products.json', $jsonData);

        $response = array(
            'success' => true,
            'message' => 'Product data edited successfully.'
        );
        echo json_encode($response);
    } else {
        http_response_code(400); // Bad Request
    }
} else {
    http_response_code(405); // Method Not Allowed
}

?>
