<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $selectedProductName = $_POST['selected-product'];

    $jsonData = file_get_contents('products.json');
    $products = json_decode($jsonData, true);

    // Find the product in the array
    $indexToDelete = -1;
    foreach ($products as $index => $product) {
        if ($product['name'] === $selectedProductName) {
            // Delete the associated photo file
            if (file_exists($product['photo'])) {
                unlink($product['photo']);
            }

            // Remove the product from the array
            $indexToDelete = $index;
            break;
        }
    }

    if ($indexToDelete !== -1) {
        // Delete the product
        array_splice($products, $indexToDelete, 1);

        // Convert the data array to JSON
        $jsonData = json_encode($products, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);

        // Save the updated JSON data back to products.json
        file_put_contents('products.json', $jsonData);

        $response = array(
            'success' => true,
            'message' => 'Product deleted successfully.'
        );
        echo json_encode($response);
    } else {
        $response = array(
            'success' => false,
            'message' => 'Product not found for deletion.'
        );
        echo json_encode($response);
    }
} else {
    http_response_code(405); // Method Not Allowed
}

?>
